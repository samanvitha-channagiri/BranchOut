import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage2 = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Header Section */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center bg-gray-50 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">LinkTreee</h1>
        <nav>
          <Link
            to="/login"
            className="text-gray-800 hover:text-lightgreen font-medium text-lg mr-6"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-lightgreen hover:bg-lightgreen/90 text-gray-800 font-semibold px-6 py-2 rounded-lg transition-colors duration-200 shadow-md"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="text-center mt-20">
        <h1 className="font-dancing-script text-6xl mb-6 text-gray-800 leading-tight">
          Manage Your Links <br /> Like Never Before
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Simplify your online presence by organizing all your important links in one place. 
          Whether you're a creator, business, or professional, we've got you covered.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-lightgreen hover:bg-lightgreen/90 
                     text-gray-800 font-semibold px-8 py-3 
                     rounded-lg transition-colors duration-200 
                     text-xl shadow-md"
        >
          Get Started
        </Link>
      </main>

      {/* Footer Section */}
      <footer className="absolute bottom-0 left-0 w-full p-4 bg-gray-50 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} LinkTreee. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage2;