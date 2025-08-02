import React from 'react'
import { useState } from 'react'
const userProfile = () => {
    const [imgUrl,setImgUrl]=useState('')
  const [userTitle,setUserTitle]=useState('')
  return (
    <div>

        <form action="submit">
           <label>Profile Url
           <input type="text" value={imgUrl} onChange={(e)=>{setImgUrl(e.target.value)}} />

           </label>
 <label>title
           <input type="text" value={userTitle} onChange={(e)=>{setUserTitle(e.target.value)}} />

           </label>
        </form>

      
    </div>
  )
}

export default userProfile
