import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes,Route } from 'react-router'
import LandingPage from './pages/LandingPage'
import AdminPage from './pages/AdminPage'
import LinksPage from './pages/LinksPage'
import './App.css'
import toast from 'react-hot-toast'
function App() {
  

  return (
  <div>
    <button onClick={()=>toast.success("congrats")}> Click me</button>
  <Routes>
    <Route/>
    <Route/>

  </Routes>
  </div>
  )
}

export default App
