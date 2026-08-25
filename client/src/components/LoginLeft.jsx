import React from 'react'

const LoginLeft = () => {
  return (
    <div className="hidden lg:flex lg:w-2/5 bg-[url('/bg-img.png')] bg-cover bg-center bg-no-repeat flex-col justify-between p-12 shirnk-0 select-none">
        <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" className="size-9.5" />
            <span className="text-4xl font-bold text-white">BUILDER</span>
        </div>
        <div>
           <h2 className="text-3xl font-bold text-white font-medium leading-snug mb-3">Where creativity meets intelligence. Design sophisticated, high-performing websites through the power of AI-driven innovation.</h2>
           <p className= "text-zinc-300">Empower your online presence with intelligent website creation. Our AI platform streamlines design, content, and deployment, enabling you to launch exceptional websites with confidence and speed.</p>
           <p className="text-zinc-300 text-sm mt-12">Copyright {new Date().getFullYear()} BUILDER. All rights reserved.</p>
        
        </div>
    </div>
  )
}

export default LoginLeft