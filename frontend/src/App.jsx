import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes,Route } from 'react-router'
import LandingPage from './pages/LandingPage'
import LandingPage2 from './pages/LandingPage2'
import AdminPage from './pages/AdminPage'
import LinksPage from './pages/LinksPage'
import './App.css'
import NavBar from './components/LandingPage/NavBar'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'

import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
function App() {
  

  return (
  <div>
    {/* <button onClick={()=>toast.success("congrats")}> Click me</button> */}
   
  <Routes>
    <Route path='/' element={<LandingPage2/>}/>
   
    <Route path='/signup' element={<SignUpPage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/admin' element={<AdminPage/>}/>
    


    

  </Routes>
  <Toaster/>
  </div>
  )
}

export default App
