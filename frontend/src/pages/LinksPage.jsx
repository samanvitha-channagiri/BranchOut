import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
//TODO: route based on username, and then if something come here ig, 
const LinksPage = () => {
  const {username}=useParams();
  // const [linkData,setLinkData]=useState([])
  const [userData,setUserData]=useState({username:" ",title:" ",description:" ",profilePictureUrl:" ",links:[]})
  const[isFetchingData,setIsFetchingData]=useState(false)
   const [copiedId, setCopiedId] = useState(null);

  async function sendRequest(){
    try{
      setIsFetchingData(true)
      const res=await axios.get(`http://localhost:5003/api/links/${username}`)
      const user=res.data.data.user
      const links=res.data.data.links
      setUserData({username:user.username,title:user.title,description:user.description,profilePictureUrl:user.profilePictureUrl,links:[...links]})
  


    }catch(error){

    
    }  finally{
      setIsFetchingData(false)

      }

  }
    const handleCopy = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (err) {
      // handle copy error
    }
  };


  useEffect(()=>{
  sendRequest()
  },[username])
//   useEffect(() => {
//   console.log(userData);
// }, [userData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" >
     <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
        {/* Profile Picture */}
        <img
          src={userData.profilePictureUrl}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-lightgreen"
        />
        {/* Username */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">{userData.username}</h2>
        {/* Title */}
        <p className="text-gray-600 mb-6 text-center">{userData.title}</p>


           <div className="w-full flex flex-col gap-4">
          {userData.links.map((url) => (
            <div
              key={url._id}
              className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3 shadow hover:shadow-md transition"
            >
              <a
                href={url.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lightgreen font-semibold hover:underline truncate max-w-[70%]"
                title={url.url}
              >
                {url.title}
              </a>
              <button
                onClick={() => handleCopy(url.url, url._id)}
                className="ml-3 p-2 rounded-full hover:bg-gray-200 transition"
                title="Copy link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17v1a3 3 0 003 3h6a3 3 0 003-3v-6a3 3 0 00-3-3h-1M16 7V6a3 3 0 00-3-3H7a3 3 0 00-3 3v6a3 3 0 003 3h1" />
                </svg>
                {copiedId === url._id && (
                  <span className="ml-2 text-xs text-green-500">Copied!</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default LinksPage
