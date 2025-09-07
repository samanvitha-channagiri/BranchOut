import { useEffect, useState } from 'react'
import { Routes,Route } from 'react-router'
import { useMatch } from 'react-router-dom'
import LandingPage2 from './pages/LandingPage2.jsx'
import AdminPage from './pages/AdminPage.jsx'
import LinksPage from './pages/LinksPage.jsx'
import UserProfile from './pages/UserProfile.jsx'
import NavBar from './components/LandingPage/NavBar.jsx'
import { Toaster } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { useAuthStore } from './store/useAuthStore.js'


function App() {
  const matchLinksPage=useMatch('/:username');
  const {authUser,isCheckingAuth,signup,isAuthenticated}=useAuthStore();
  useEffect(()=>{
    isAuthenticated();
  },[isAuthenticated])


 
  if(isCheckingAuth&&!authUser){
    return (<div className='flex items-center justify-items-center bg-darkgreen'>
      Be patient, page is being loaded.

    </div>)
  }
  

  return (
  <div>
   
  {!matchLinksPage&&<NavBar/>}
   
  <Routes>

    {/* Landing Page */}
    <Route path='/' element={<LandingPage2/>}/>

    {/* public routes */}
   <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to='/admin'/>}/>
    <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to='/admin'/>}/>
    <Route path='/:username' element={<LinksPage/>}/>
    <Route path='/admin' element={authUser?<AdminPage/>:<Navigate to='/signup'/>}/>
   

     {/* Protected routes */}
    <Route path='/admin' element={authUser?<AdminPage/>:<Navigate to='/signup'/>}/>
     <Route path='/profile' element={authUser?<UserProfile/>:<Navigate to={'/signup'}/>}/>


    

  </Routes>
  <Toaster/>
  </div>
  )
}

export default App
