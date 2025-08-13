import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "../lib/axios.js";
import { useLinkStore } from "../store/useLinkStore.js";
import isValidURL from "../../../backend/src/utils/urlValidation.js";
import toast from "react-hot-toast";
// TODOS:
/*
1. User profile display, along with update, maybe make a new page, for user to update his information
2. when user clicks on update, maybe, take desing decision on how it should work!
*/
const AdminPage = () => {
  const {
    urls,
    isLinksLoading,
    getLinks,
    addNewUrl,
    deleteLink,
    updateLink
  
  } = useLinkStore();
  
  const [updateUrl, setUpdateUrl] = useState({ _id: "", url: "", title: "" });
   const [isUpdatingUrl,setIsUpdatingUrl]=useState(false)
  const [formData, setFormData] = useState({
    _id:"",
    url: "",
    title: "",
  });
  useEffect(() => {
    getLinks();
  }, [getLinks, addNewUrl, deleteLink,updateLink]);

  function validateForm() {
    if (!formData.url) {
      toast.error("Url field cannot be empty");
      return false;
    }
    if (!isValidURL(formData.url)) {
      toast.error("Enter a valid url");
      return false;
    }
    if (!formData.title) {
      toast.error("Title field cannot be empty");
      return false;
    }
    if (formData.title.length > 100) {
      toast.error("Title  cannot exceed 100 characters");
      return false;
    }
    return true;
  }
  console.log(urls);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const success = validateForm();
      if (success === true) {
        addNewUrl(formData);
      }
      setFormData({ url: "", title: "" });
    } catch (error) {
      console.log("Error while adding a new url");
    }
  }
  async function handleUpdateClick(url) {
    try {
     
      setUpdateUrl({_id:url._id,title:url.title,url:url.url})
      setIsUpdatingUrl(true)
     
    } catch (error) {
      toast.error("error while updating");
      console.log(error.message)
    }
  }
  function validateUpdateForm(){
     if (!updateUrl.url) {
      toast.error("Url field cannot be empty");
      return false;
    }
    if (!isValidURL(updateUrl.url)) {
      toast.error("Enter a valid url");
      return false;
    }
    if (!updateUrl.title) {
      toast.error("Title field cannot be empty");
      return false;
    }
    if (updateUrl.title.length > 100) {
      toast.error("Title  cannot exceed 100 characters");
      return false;
    }
    return true;
  }
  async function handleUpdateSubmit(e) {
    e.preventDefault()
    try {
      const success=validateUpdateForm();
      if(success==true){
        updateLink(updateUrl)
        setUpdateUrl({_id:"",url:"",title:""})

      }
    } catch (error) {
    console.error("Error in handleUpdateSubmit function",error.message)
    } finally {
     setIsUpdatingUrl(false)
    
    }
  }

  // useEffect(async ()=>{

  //   // const response=await axios.get('http://localhost5003/api/users/getLinks')
  //   // console.log(response)

  // },[])

  return (
    <div>
      {/* User profile */}

      <img src="" />

      <div> </div>

      {/* Input form to add new urls */}
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            {" "}
            Enter URL
            <input
              type="text"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
            />
          </label>

          <label>
            Enter title
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </label>

          <button type="submit">Add Link</button>
        </form>
        <div>
          {urls.map((url) => (
            <div>
              {url.title + " "+url.url+" "}
              <button className="bg-slate-500" onClick={() => deleteLink(url)}>delete</button>{" "}
              <button className="bg-slate-500" onClick={() => handleUpdateClick(url)}>update</button>
            </div>
          ))}
        </div>
        <div>
          {/* if user clicks update button, input for new values should be given and initially it should be filled with, the previous values??, oh yeah */}
          {isUpdatingUrl && (
            <div>
              <form onSubmit={handleUpdateSubmit}>
                <label htmlFor="">
                  url
                  <input
                    type="text"
                    value={updateUrl.url}
                    onChange={(e) =>
                      setUpdateUrl({ ...updateUrl, url: e.target.value })
                    }
                  />
                </label>
                {" "}
                <label>
                  <input
                    type="text"
                    value={updateUrl.title}
                    onChange={(e) => {
                      setUpdateUrl({ ...updateUrl, title: e.target.value });
                    }}
                  />
                </label>
                <button type="submit"> Update the url</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
