import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes,Route, useMatch } from 'react-router'
import LandingPage from './pages/LandingPage'
import LandingPage2 from './pages/LandingPage2'
import AdminPage from './pages/AdminPage'
import LinksPage from './pages/LinksPage'
import './App.css'
import UserProfile from './pages/UserProfile'
import NavBar from './components/LandingPage/NavBar'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'
// import { useMatch } from 'react-router'

function App() {
  const matchLinksPage=useMatch('/:username');
  const {authUser,isCheckingAuth,signup,isAuthenticated}=useAuthStore();
  useEffect(()=>{
    isAuthenticated();
  },[isAuthenticated])

  //if there is nothitg in the authUser, and also it is being checked if the user is authenticated, then return this load div
 
  if(isCheckingAuth&&!authUser){
    return (<div className='flex items-center justify-items-center bg-darkgreen'>
      Be patient, page is being loaded.

    </div>)
  }
  

  return (
  <div>
    {/* <button onClick={()=>toast.success("congrats")}> Click me</button> */}
  { !matchLinksPage&& <NavBar/>}
   
  <Routes>

    {/* Landing Page */}
    <Route path='/' element={<LandingPage2/>}/>

    {/* public routes */}
   <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to='/admin'/>}/>
    <Route path='/login' element={authUser?<AdminPage/>:<LoginPage/>}/>
    <Route path='/:username' element={<LinksPage/>}/>
    <Route path='/admin' element={authUser?<AdminPage/>:<Navigate to='/signup'/>}/>
   

     {/* Protected routes */}
    <Route path='/admin' element={<AdminPage/>}/>
     <Route path='/profile' element={authUser?<UserProfile/>:<Navigate to={signup}/>}/>


    

  </Routes>
  <Toaster/>
  </div>
  )
}

export default App
