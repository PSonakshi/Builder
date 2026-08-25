import React from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2Icon } from 'lucide-react'
import LoginLeft from '../components/LoginLeft';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext'
import { useState } from 'react';
const AuthPage = ({mode}) => {
  const navigate = useNavigate();
  const {login, register} = useAppContext()
  const[error,setError] = useState("")
  const[loading,setLoading] = useState(false)
  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[showPassword,setShowPassword] = useState(false);

  const isLogin = mode === "login";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className = "min-h-screen bg-white flex text-zinc-900 font-sans">
     {/* left side */}
     <LoginLeft />
     {/* right side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm mx-auto flex flex-col items-start text-left gap-6">
           <h1 className="text-3xl font-medium tracking-tight text-zinc-900 mb-1.5 font-sans">{isLogin ? "Login" : "Sign Up"}</h1>
           <p className="text-sm text-zinc-300 leading-7">{isLogin ? "Welcome back! Please enter your credentials to access your account." : "Create your account to get started."}</p>

           {error && (
             <div className="w-full rounded border border-red-200 bg-red-50 px-4 py-3 text-left text-xs text-red-700">
               {error}
             </div>
           )}

           <form className="w-full space-y-6" onSubmit={handleSubmit}>
             {!isLogin && (
               <div>
                 <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                   Full Name
                 </label>
                 <input
                   type="text"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   required
                   className="w-full border-b border-zinc-200 bg-transparent py-2 pl-2 text-sm text-zinc-900 placeholder-zinc-300 focus:border-zinc-950 focus:outline-none"
                   placeholder="John Doe"
                 />
               </div>
             )}

             <div>
               <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                 Email
               </label>
               <input
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                 className="w-full border-b border-zinc-200 bg-transparent py-2 pl-2 text-sm text-zinc-900 placeholder-zinc-300 focus:border-zinc-950 focus:outline-none"
                 placeholder="you@example.com"
               />
             </div>

             <div className="relative">
               <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                 Password
               </label>
               <input
                 type={showPassword ? "text" : "password"}
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
                 className="w-full border-b border-zinc-200 bg-transparent py-2 pl-2 pr-10 text-sm text-zinc-900 placeholder-zinc-300 focus:border-zinc-950 focus:outline-none"
                 placeholder="Enter your password"
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-0 top-8 inline-flex h-10 w-10 items-center justify-center text-zinc-500"
                 aria-label={showPassword ? "Hide password" : "Show password"}
               >
                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
               </button>
             </div>

             <button
               type="submit"
               className="w-full rounded-full bg-zinc-900 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-zinc-950 disabled:cursor-not-allowed disabled:bg-zinc-400"
               disabled={loading}
             >
               {loading && <Loader2Icon className=' animate-spin h-3.5 w-3.5 mr-2'></Loader2Icon>}
                {isLogin ? "Login" : "Sign Up"}
             </button>

             <p className="text-sm text-zinc-600">
               {isLogin ? (
                 <>
                   New to BUILDER?{' '}
                   <Link to="/register" className="text-zinc-900 font-medium hover:underline">
                     Create an account
                   </Link>
                 </>
               ) : (
                 <>
                   Already have an account?{' '}
                   <Link to="/login" className="text-zinc-900 font-medium hover:underline">
                     Sign in here!
                   </Link>
                 </>
               )}
             </p>
           </form>
       </div>
      </div>
    </div>
  )
}

export default AuthPage