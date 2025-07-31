import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
const SignUpPage = () => {
  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const { signup, isSigningUp } = useAuthStore();
  // const [username,setUsername]=useState('')
  // const [password,setPassword]=useState('')
  const [isLoading, setIsLoading] = useState();
  function validateFormData() {
    if (!formData.username.trim()) {
      toast.error("Name field cannot be empty");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email field cannot be empty");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!formData.password) {
      toast.error("Email field cannot be empty");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be atleast 6 characters");
      return false;
    }

    return true;
  }
//TODO: fix the design of handleSubmit, by moving it to the the form tag
  const handleSubmit = (e) => {
    e.preventDefault();
   
    try {
      const success = validateFormData();
      if (success == true) signup(formData);
    } catch (error) {
      console.error("Error while signing up");
      toast.error(
        "Failed creating a new account, try again with proper credentials"
      );
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-darkgreen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-red-200 p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                  }}
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lightgreen focus:border-lightgreen focus:z-10 sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lightgreen focus:border-lightgreen focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lightgreen focus:border-lightgreen focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-lightgreen hover:bg-lightgreen/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightgreen transition-colors duration-200"
                onClick={handleSubmit}
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-lightgreen hover:text-lightgreen/90"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
