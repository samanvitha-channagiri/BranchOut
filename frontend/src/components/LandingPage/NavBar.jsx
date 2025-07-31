import React from 'react'
import { Link } from 'react-router'
import { useAuthStore } from '../../store/useAuthStore'
const NavBar = () => {
  const {logout}=useAuthStore();
  return (
  <nav className='bg-midgreen py-2 flex flex-row justify-between'>

    <div className='pl-3 pt-1 font-dancing-script text-lg' >
         BranchOut
    </div>
    <div>
      <Link to='/signup' className= 'bg-lightgreen px-5 py-2 mr-3 rounded 0'>
      Signup
      
      
      </Link>
      <button className='bg-lightgreen px-5 py-2 mr-3 rounded 0' onClick={logout}> Logout </button>
          {/* <button  className='bg-lightgreen px-5 py-2 mr-3 rounded 0'>Signup</button> */}
    </div>
  
  </nav>
  )
}

export default NavBar
