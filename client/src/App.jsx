import React from 'react'
import {Routes ,  Route, Navigate } from 'react-router-dom'
import {GuestLayout, AuthLayout} from './pages/Layout'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import BuilderPage from './pages/BuilderPage'
import PreviewPage from './pages/PreviewPage'
import { Toaster } from 'react-hot-toast'
import PublishPage from './pages/PublishPage'

const App = () => {
  return (
    <>
    <Toaster />
   <Routes>
    {/* Login */}
    <Route element={<GuestLayout/>}>
      <Route path='/login' element={<AuthPage mode="login"/>} />
      <Route path='/register' element={<AuthPage mode="register"/>} />
    </Route>

     
    <Route path='/publish/:id' element={<PublishPage />} />
     {/* protected Routes */}
    <Route element={<AuthLayout/>}>
      <Route path='/' element={<HomePage/>} />
      <Route path='/builder/:id' element={<BuilderPage/>} />
      <Route path='/preview/:id' element={<PreviewPage/>} />
    </Route>
   </Routes>
   </>
  )
}

export default App