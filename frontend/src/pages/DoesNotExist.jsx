import React from 'react'
import {Link} from 'react-router-dom'

const DoesNotExist = ({username}) => {
  return (
       <div className="min-h-screen  justify-center bg-[#b0bb9c] flex flex-col items-center">
       
          <a href="/" className="flex items-center mb-6">
            <img src="/tree.svg" alt="Home" className="w-16 h-16" />
          </a>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            The page you're looking for doesn't exist.
          </h2>
          
          <p className="text-gray-600 mb-6 text-center">
            Want this to be your username? <Link to="/signup" className="text-[#678965] font-semibold hover:underline">Create your Linktree now.</Link>
          </p>
          
        
       
      </div>
  )
}

export default DoesNotExist