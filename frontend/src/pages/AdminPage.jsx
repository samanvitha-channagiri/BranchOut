import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'
import { axiosInstance } from '../lib/axios.js';
const AdminPage = () => {

  const [links,setAllLinks]=useState([]);
  const [user,setUser]=useState([]);
  useEffect(async ()=>{

    // const response=await axios.get('http://localhost5003/api/users/getLinks')
    // console.log(response)

  },[])
  return (
    <div>
      
    </div>
  )
}

export default AdminPage
