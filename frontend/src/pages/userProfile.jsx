import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      {/* Profile Picture */}
      <div style={{ marginBottom: "20px" }}>
        <figure>
          <img
            src={userData.profilePictureUrl}
            alt="User Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </figure>
      </div>

      {/* User Details */}
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <h2 style={{ textAlign: "center" }}>User Profile</h2>
        <form onSubmit={handleUpdateProfile}>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Profile Picture URL:
              <input
                type="text"
                value={userData.profilePictureUrl}
                onChange={(e) =>
                  setUserData({ ...userData, profilePictureUrl: e.target.value })
                }
                style={{ marginLeft: "10px", width: "100%" }}
              />
            </label>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>
              Title:
              <input
                type="text"
                value={userData.title}
                onChange={(e) =>
                  setUserData({ ...userData, title: e.target.value })
                }
                style={{ marginLeft: "10px", width: "100%" }}
              />
            </label>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>
              Description:
              <textarea
                value={userData.description}
                onChange={(e) =>
                  setUserData({ ...userData, description: e.target.value })
                }
                style={{ marginLeft: "10px", width: "100%", height: "80px" }}
              />
            </label>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p>
              <strong>Username:</strong> {authUser.username}
            </p>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p>
              <strong>Email:</strong> {authUser.email}
            </p>
          </div>

          <button type="submit" style={{ marginTop: "10px", width: "100%" }}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;