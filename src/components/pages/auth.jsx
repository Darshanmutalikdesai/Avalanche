import React from "react";
import NavigationBar from "../layout/Common/Navbar"; // adjust path if needed
import OAuthSignup from "../layout/login";   
const Auth = () => {
  return (
    <div className="flex flex-col items-start relative bg-white min-h-screen">
      {/* Navbar */}
      <div className="w-full z-20">
        <NavigationBar />
      </div>

      {/* Login Section */}
      <div className="flex flex-1 w-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            Sign in to Avalanche
          </h2>
          <OAuthSignup />
        </div>
      </div>
    </div>
  );
};

export default Auth;
