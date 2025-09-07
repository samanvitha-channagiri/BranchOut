import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

const UserProfile = () => {
  const { authUser, updateProfile } = useAuthStore();

  const [userData, setUserData] = useState({
    profilePictureUrl: authUser.profilePictureUrl || "",
    title: authUser.title || "",
    description: authUser.description || "",
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(userData);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#b0bb9c] px-2">
      <div
        className="bg-[#fffbe6] shadow-lg w-full max-w-2xl p-8 flex flex-col items-center"
        style={{ borderRadius: 0 }}
      >
        {/* Profile Picture */}
        <div className="mb-4">
          <img
            src={
              userData.profilePictureUrl ||
              "https://via.placeholder.com/150?text=+"
            }
            alt="User Profile"
            className="w-28 h-28 object-cover mb-2"
            style={{ borderRadius: "50%" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150?text=+";
            }}
          />
        </div>
        {/* Username */}
        <h2 className="text-2xl font-bold italic text-center text-gray-800 mb-1 break-all">
          {authUser.username}
        </h2>
        {/* Email */}
        <p className="text-gray-600 mb-6 text-center break-all">
          {authUser.email}
        </p>
        {/* Form */}
        <form
          onSubmit={handleUpdateProfile}
          className="w-full flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture URL
            </label>
            <input
              type="text"
              value={userData.profilePictureUrl}
              onChange={(e) =>
                
                setUserData({ ...userData, profilePictureUrl: e.target.value })
              }

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
              value={userData.title}
              onChange={(e) =>
                setUserData({ ...userData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300"
              style={{ borderRadius: 0 }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={userData.description}
              onChange={(e) =>
                setUserData({ ...userData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300"
              style={{ borderRadius: 0, minHeight: "80px" }}
            />
          </div>
          <button
            type="submit"
            className="bg-[#678965] text-white font-bold py-2 mt-2 w-full"
            style={{ borderRadius: 0 }}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;