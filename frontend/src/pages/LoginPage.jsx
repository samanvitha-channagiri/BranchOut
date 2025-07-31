import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore'
const LoginPage = () => {
  // const [email,setEmail]=useState('')
  // const [password,setPassword]=useState('')
  // const [isLoading,setIsLoading]=useState(false)
  const [formData, setFormData] = useState({
      username: "",
      password: "",
      email: "",
    });
  const {isLoggingIn,login}=useAuthStore();
   function validateFormData(){
    console.log("I am in validate form data")
    if(!formData.email.trim()){
      toast.error("Email field cannot be empty")
      return false

    }
     if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if(!formData.password){
      toast.error(" Password field cannot be empty")
      return false
    }
    return true
    
  }

   async function handleSubmit(e){
     console.log("Ive entered handle Submit")
    e.preventDefault()
    try{
      const success=validateFormData()
      if(success==true){
        console.log(success)
        login(formData)
      }
    }catch(error){
      console.error("Error while logging in");
      toast.error("Failed logging in,try again with proper credentials")
     
      
     

    }


  }
  return (

   <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-darkgreen">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
            
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lightgreen focus:border-lightgreen focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData,password:e.target.value})}
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lightgreen focus:border-lightgreen focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
  
            <div>
              <button
                type="submit"
            
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-lightgreen hover:bg-lightgreen/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightgreen transition-colors duration-200"
                
              >
                  Login
              </button>
            </div>
          </form>
          
          <div className="text-sm text-center text-gray-600">
            Don' have an account yet?{' '}
            <Link to="/signup" className="font-medium text-lightgreen hover:text-lightgreen/90">
              Sign up
            </Link>
          </div>
        </div>
      </div>
     
  )
}

export default LoginPage
