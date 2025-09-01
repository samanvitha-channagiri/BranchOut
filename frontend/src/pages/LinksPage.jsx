import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import DoesNotExist from "./DoesNotExist";
const LinksPage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState({
    username: "",
    title: "",
    description: "",
    profilePictureUrl: "",
    links: [],
  });
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const navigate = useNavigate();
  async function sendRequest() {
    try {
      setIsFetchingData(true);
      const res = await axios.get(
        `http://localhost:5003/api/links/${username}`
      );
      console.log(res)
      const user = res.data.data.user;
      const links = res.data.data.links;
      setUserData({
        username: user.username,
        title: user.title,
        description: user.description,
        profilePictureUrl: user.profilePictureUrl,
        links: [...links],
      });
      setUserNotFound(false);
    } catch (error) {
           setUserNotFound(true);
      console.log("Error while fetching user data", error.message);
 
      // handle error
    } finally {
      setIsFetchingData(false);
    }
  }
  useEffect(() => {
    sendRequest();
  }, [username]);
  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (error) {
      console.log("Error in handle copy function",error.message)
    }
  };
  // Copy current page URL
  const handleCopyPageUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedId("page");
      setTimeout(() => setCopiedId(null), 1500);
    } catch (err) {}
  };

  if(userNotFound){
    return(<DoesNotExist/>);

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#b0bb9c]">
      <div
        className="bg-[#fffbe6] shadow-lg p-0 w-full max-w-md flex flex-col items-center"
        style={{ borderRadius: 0 }}
      >
        {/* Top bar with tree icon and share icon */}
        <div className="w-full flex justify-between items-center px-6 py-4">
          <a href="/" className="flex items-center">
            <img src="/tree.svg" alt="Home" className="w-10 h-10" />
          </a>
          <button
            onClick={handleCopyPageUrl}
            className="p-2 hover:bg-[#b0bb9c]/40 transition rounded"
            title="Copy page link"
          >
            {/* Share/Copy icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#678965]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 8a3 3 0 00-6 0v8a3 3 0 006 0V8z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 8v8a7 7 0 01-14 0V8"
              />
            </svg>
            {copiedId === "page" && (
              <span className="ml-2 text-xs text-green-700">Copied!</span>
            )}
          </button>
        </div>
        {/* Profile Picture */}
        {userData.profilePictureUrl ? (
          <img
            src={userData.profilePictureUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-2 border-4 border-[#b0bb9c]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/96?text=+";
            }}
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-2" />
        )}
        {/* Username */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center w-full">
          {userData.username}
        </h2>
        {/* Title/Description */}
        <p className="text-gray-600 mb-6 text-center w-full">
          {userData.title || userData.description}
        </p>

        {/* Links */}
        <div className="w-full flex flex-col gap-4 px-6 pb-8">
          {userData.links.map((url) => (
            <div
              key={url._id}
              className="flex items-center justify-between bg-[#678965] px-4 py-3 shadow transition cursor-pointer"
              style={{
                borderRadius: 0,
                boxShadow: "0 1px 4px 0 rgba(104,137,101,0.10)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 0 3px #b0bb9c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 1px 4px 0 rgba(104,137,101,0.10)")
              }
            >
              <a
                href={url.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-just-another-hand font-semibold hover:underline truncate max-w-[70%] uppercase"
                title={url.url}
                style={{ flex: 1 }}
              >
                {url.title}
              </a>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(url.url, url._id);
                }}
                className="ml-3 p-2 rounded hover:bg-[#b0bb9c]/40 transition"
                title="Copy link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 17v1a3 3 0 003 3h6a3 3 0 003-3v-6a3 3 0 00-3-3h-1M16 7V6a3 3 0 00-3-3H7a3 3 0 00-3 3v6a3 3 0 003 3h1"
                  />
                </svg>
                {copiedId === url._id && (
                  <span className="ml-2 text-xs text-green-200">Copied!</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinksPage;

// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router'
// import axios from 'axios'
// //TODO: route based on username, and then if something come here ig,
// const LinksPage = () => {
//   const {username}=useParams();
//   // const [linkData,setLinkData]=useState([])
//   const [userData,setUserData]=useState({username:" ",title:" ",description:" ",profilePictureUrl:" ",links:[]})
//   const[isFetchingData,setIsFetchingData]=useState(false)
//    const [copiedId, setCopiedId] = useState(null);

//   async function sendRequest(){
//     try{
//       setIsFetchingData(true)
//       const res=await axios.get(`http://localhost:5003/api/links/${username}`)
//       const user=res.data.data.user
//       const links=res.data.data.links
//       setUserData({username:user.username,title:user.title,description:user.description,profilePictureUrl:user.profilePictureUrl,links:[...links]})

//     }catch(error){

//     }  finally{
//       setIsFetchingData(false)

//       }

//   }
//     const handleCopy = async (url, id) => {
//     try {
//       await navigator.clipboard.writeText(url);
//       setCopiedId(id);
//       setTimeout(() => setCopiedId(null), 1500);
//     } catch (err) {
//       // handle copy error
//     }
//   };

//   useEffect(()=>{
//   sendRequest()
//   },[username])
// //   useEffect(() => {
// // }, [userData]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50" >
//      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
//         {/* Profile Picture */}
//         <img
//           src={userData.profilePictureUrl}
//           alt="Profile"
//           className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-lightgreen"
//         />
//         {/* Username */}
//         <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">{userData.username}</h2>
//         {/* Title */}
//         <p className="text-gray-600 mb-6 text-center">{userData.title}</p>

//            <div className="w-full flex flex-col gap-4">
//           {userData.links.map((url) => (
//             <div
//               key={url._id}
//               className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3 shadow hover:shadow-md transition"
//             >
//               <a
//                 href={url.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-lightgreen font-semibold hover:underline truncate max-w-[70%]"
//                 title={url.url}
//               >
//                 {url.title}
//               </a>
//               <button
//                 onClick={() => handleCopy(url.url, url._id)}
//                 className="ml-3 p-2 rounded-full hover:bg-gray-200 transition"
//                 title="Copy link"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-gray-500"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17v1a3 3 0 003 3h6a3 3 0 003-3v-6a3 3 0 00-3-3h-1M16 7V6a3 3 0 00-3-3H7a3 3 0 00-3 3v6a3 3 0 003 3h1" />
//                 </svg>
//                 {copiedId === url._id && (
//                   <span className="ml-2 text-xs text-green-500">Copied!</span>
//                 )}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   )
// }

// export default LinksPage
