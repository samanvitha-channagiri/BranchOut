import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'
import { axiosInstance } from '../lib/axios.js';
import { useLinkStore } from '../store/useLinkStore.js';
import isValidURL from '../../../backend/src/utils/urlValidation.js';
import toast from 'react-hot-toast';
// TODOS:
/*
1. User profile display, along with update, maybe make a new page, for user to update his information
2. when user clicks on update, maybe, take desing decision on how it should work!
*/
const AdminPage = () => {
  const {urls,isLinksLoading,getLinks,addNewUrl,deleteLink}=useLinkStore()
  const [formData,setFormData]=useState({
    url:'',
    title:''
  })
  useEffect(()=>{
    getLinks()
  },[getLinks,addNewUrl,deleteLink])
  
 
  function validateForm(){
    if(!formData.url){
      toast.error("Url field cannot be empty")
      return false
    }
    if(!isValidURL(formData.url)){
      toast.error("Enter a valid url")
      return false
    }
    if(!formData.title){
      toast.error("Title field cannot be empty")
      return false
    }
    if(formData.title.length>100){
      toast.error("Title  cannot exceed 100 characters")
      return false
    }
    return true
  }
  console.log(urls)
  async function handleSubmit(e){
    e.preventDefault()
    try{
          const success=validateForm()
          if(success===true){
             addNewUrl(formData)
          }
          setFormData({url:'',title:''})
         
    }catch(error){
      console.log("Error while adding a new url")

    }


  }

  // useEffect(async ()=>{

  //   // const response=await axios.get('http://localhost5003/api/users/getLinks')
  //   // console.log(response)

  // },[])

 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label > Enter URL
           <input type="text" value={formData.url} onChange={(e)=>setFormData({...formData,url:e.target.value})} />
        </label>
        <label >Enter title
  
        <input type="text" value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} />
        </label>
     
      <button type='submit'>Add Link</button>

      </form>
      <div>
           {
        urls.map((url)=>(

        

           
              <div>
                 {url.title + " "}
                 <button onClick={()=>deleteLink(url)} >delete</button>

            

              </div>
             


          
        
        
        ))
      }
      </div>
   
        

    
    </div>
  )
}

export default AdminPage
