import React, { useState, useEffect } from "react";
import { useLinkStore } from "../store/useLinkStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import isValidURL from "../../../backend/src/utils/urlValidation.js";
import toast from "react-hot-toast";
import {Link} from 'react-router'
const AdminPage = () => {
  const {
    urls,
    isLinksLoading,
    getLinks,
    addNewUrl,
    deleteLink,
    updateLink
  } = useLinkStore();
  const { authUser } = useAuthStore();

  const [updateUrl, setUpdateUrl] = useState({ _id: "", url: "", title: "" });
  const [isUpdatingUrl, setIsUpdatingUrl] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    url: "",
    title: "",
  });
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    getLinks();
  }, [getLinks, addNewUrl, deleteLink, updateLink]);

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
      toast.error("Title cannot exceed 100 characters");
      return false;
    }
    return true;
  }

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
      setUpdateUrl({ _id: url._id, title: url.title, url: url.url });
      setIsUpdatingUrl(true);
    } catch (error) {
      toast.error("error while updating");
      console.log(error.message);
    }
  }

  function validateUpdateForm() {
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
      toast.error("Title cannot exceed 100 characters");
      return false;
    }
    return true;
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    try {
      const success = validateUpdateForm();
      if (success == true) {
        updateLink(updateUrl);
        setUpdateUrl({ _id: "", url: "", title: "" });
      }
    } catch (error) {
      console.error("Error in handleUpdateSubmit function", error.message);
    } finally {
      setIsUpdatingUrl(false);
    }
  }

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyPageUrl = async () => {
  try {
    const publicUrl = `${window.location.origin}/${authUser.username}`;
    await navigator.clipboard.writeText(publicUrl);
    setCopiedId('page');
    toast.success(`Link to your public page copied!`);
    setTimeout(() => setCopiedId(null), 1500);
  } catch (err) {
    console.error("Failed to copy page URL:", err);
    toast.error("Failed to copy link");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#b0bb9c]">
      <div className="bg-[#fffbe6] shadow-lg p-0 w-full max-w-2xl" style={{ borderRadius: 0 }}>
        {/* Top bar with tree icon and share icon */}
        <div className="w-full flex justify-between items-center px-6 py-4">
          <a href="/" className="flex items-center">
            <img src="/tree.svg" alt="Home" className="w-10 h-10" />
          </a>
          <button
            onClick={handleCopyPageUrl}
            className="p-2 hover:bg-[#b0bb9c]/40 transition"
            title="Copy page link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#678965]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {copiedId === 'page' && (
              <span className="ml-2 text-xs text-green-700">Copied!</span>
            )}
          </button>
        </div>
        
        {/* Profile Picture and Username */}
        <Link to={'/profile'}> 
        <div className="flex flex-col items-center mt-4 mb-8">
          {authUser?.profilePictureUrl ? (
            <img
              src={authUser.profilePictureUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-3"
              onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/96?text=+'; }}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 mb-3" />
          )}
          <h2 className="text-2xl font-bold text-gray-800 text-center">{authUser?.username}</h2>
        </div>
        </Link>
       

        {/* Add New Link Form */}
        <div className="px-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Add New Link</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter URL
              </label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
                style={{ borderRadius: 0 }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300"
                style={{ borderRadius: 0 }}
              />
            </div>
            
            <button 
              type="submit" 
              className="bg-[#678965] text-white font-medium py-2 px-4 mt-2"
              style={{ borderRadius: 0 }}
            >
              Add Link
            </button>
          </form>
        </div>

        {/* Links List */}
        <div className="px-6 pb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Your Links</h3>
          <div className="space-y-4">
            {isLinksLoading ? (
              <p className="text-gray-600">Loading...</p>
            ) : urls.length > 0 ? (
              urls.map((url) => (
                <div
                  key={url._id}
                  className="bg-[#678965] shadow"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex justify-between p-4">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-bold text-white uppercase">{url.title}</h4>
                        <button
                          onClick={() => handleUpdateClick(url)}
                          className="ml-2 text-white hover:text-green-200"
                          title="Edit link"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-white text-sm mt-1 truncate">{url.url}</p>
                    </div>
                    <div className="flex flex-col justify-center ml-4">
                      <button
                        onClick={() => handleCopy(url.url, url._id)}
                        className="p-1 text-white hover:text-green-200 mb-2"
                        title="Copy link"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {copiedId === url._id && (
                          <span className="text-xs text-green-200">Copied!</span>
                        )}
                      </button>
                      <button
                        onClick={() => deleteLink(url)}
                        className="p-1 text-white hover:text-red-300"
                        title="Delete link"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No links yet. Add your first link above!</p>
            )}
          </div>
        </div>

        {/* Update Link Modal */}
        {isUpdatingUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 shadow-lg max-w-md w-full" style={{ borderRadius: 0 }}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Update Link</h3>
              <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                  </label>
                  <input
                    type="text"
                    value={updateUrl.url}
                    onChange={(e) => setUpdateUrl({ ...updateUrl, url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300"
                    style={{ borderRadius: 0 }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={updateUrl.title}
                    onChange={(e) => setUpdateUrl({ ...updateUrl, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300"
                    style={{ borderRadius: 0 }}
                  />
                </div>
                
                <div className="flex gap-3 mt-2">
                  <button 
                    type="submit" 
                    className="bg-[#678965] text-white font-medium py-2 px-4 flex-1"
                    style={{ borderRadius: 0 }}
                  >
                    Update
                  </button>
                  <button 
                    type="button" 
                    className="bg-gray-300 text-gray-800 font-medium py-2 px-4 flex-1"
                    style={{ borderRadius: 0 }}
                    onClick={() => setIsUpdatingUrl(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;