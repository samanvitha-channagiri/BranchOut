import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage2 = () => {
  return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="font-dancing-script text-6xl mb-8 text-gray-800">
          Manage Your Links like never before
        </h1>
        <Link 
          to="/signup" 
          className="inline-block bg-lightgreen hover:bg-lightgreen/90 
                     text-gray-800 font-semibold px-8 py-3 
                     rounded-lg transition-colors duration-200 
                     text-xl shadow-md"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default LandingPage2
