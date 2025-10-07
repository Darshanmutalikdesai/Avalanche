import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";

const UserPortal = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Sample user data
  const userData = {
    name: "John Doe",
    avalancheId: "AVL2024001",
    college: "KLE Technological University",
    email: "john.doe@kletech.ac.in",
    phone: "+91 9876543210",
    image: "https://ui-avatars.com/api/?name=John+Doe&size=256&background=00f7ff&color=051320&bold=true&format=png"
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-y-auto bg-gradient-to-br from-[#0a1929] to-[#051320]"
      style={{ fontFamily: 'Nasalization, sans-serif' }}
    >
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #00f7ff 0px, transparent 1px, transparent 40px),
                              repeating-linear-gradient(90deg, #00f7ff 0px, transparent 1px, transparent 40px)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Logo/Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#00eaff] drop-shadow-[0_0_20px_rgba(0,234,255,0.8)] mb-2">
            AVALANCHE
          </h1>
          <p className="text-sm sm:text-base text-[#ffcc00] drop-shadow-[0_0_10px_rgba(255,204,0,0.6)]">
            USER PORTAL
          </p>
        </div>

        {/* Main Card */}
        <div
          className="relative w-full max-w-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`
              relative w-full
              bg-gradient-to-br from-[#0a1929] to-[#051320]
              border-2 border-[#00f7ff]
              rounded-2xl
              overflow-visible
              transition-all duration-500 ease-out
              ${isHovered ? 'shadow-[0_0_40px_rgba(0,247,255,0.7)] scale-[1.02]' : 'shadow-[0_0_20px_rgba(0,247,255,0.4)]'}
            `}
          >
            {/* Profile Section */}
            <div className="relative p-8 sm:p-10 lg:p-12">
              {/* Profile Image */}
              <div className="flex justify-center mb-8">
                <div
                  className={`
                    w-32 h-32 sm:w-40 sm:h-40 rounded-full
                    bg-cover bg-center
                    border-4 border-[#00f7ff]
                    shadow-[0_0_30px_rgba(0,247,255,0.7)]
                    transition-all duration-500
                    ${isHovered ? 'scale-110 shadow-[0_0_40px_rgba(0,247,255,1)]' : 'scale-100'}
                  `}
                  style={{ backgroundImage: `url(${userData.image})` }}
                />
              </div>

              {/* User Name */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#00f7ff] drop-shadow-[0_0_15px_rgba(0,247,255,0.9)] text-center mb-8">
                {userData.name}
              </h2>

              {/* Info Grid */}
              <div className="space-y-6">
                {/* Avalanche ID */}
                <div className="bg-[rgba(0,247,255,0.05)] border border-[#00f7ff] rounded-lg p-4 hover:bg-[rgba(0,247,255,0.1)] transition-all duration-300">
                  <label className="text-xs text-[#b0f7ff] uppercase tracking-wider mb-1 block">
                    Avalanche ID
                  </label>
                  <p className="text-lg sm:text-xl font-bold text-[#00f7ff] drop-shadow-[0_0_8px_rgba(0,247,255,0.6)]">
                    {userData.avalancheId}
                  </p>
                </div>

                {/* College Name */}
                <div className="bg-[rgba(255,204,0,0.05)] border border-[#ffcc00] rounded-lg p-4 hover:bg-[rgba(255,204,0,0.1)] transition-all duration-300">
                  <label className="text-xs text-[#ffcc00] uppercase tracking-wider mb-1 block">
                    College
                  </label>
                  <p className="text-base sm:text-lg font-semibold text-[#ffcc00] drop-shadow-[0_0_8px_rgba(255,204,0,0.6)]">
                    {userData.college}
                  </p>
                </div>

                {/* Email */}
                <div className="bg-[rgba(0,247,255,0.05)] border border-[#00f7ff] rounded-lg p-4 hover:bg-[rgba(0,247,255,0.1)] transition-all duration-300">
                  <label className="text-xs text-[#b0f7ff] uppercase tracking-wider mb-1 block">
                    Email
                  </label>
                  <p className="text-sm sm:text-base text-[#b0f7ff]">{userData.email}</p>
                </div>

                {/* Phone */}
                <div className="bg-[rgba(0,247,255,0.05)] border border-[#00f7ff] rounded-lg p-4 hover:bg-[rgba(0,247,255,0.1)] transition-all duration-300">
                  <label className="text-xs text-[#b0f7ff] uppercase tracking-wider mb-1 block">
                    Phone
                  </label>
                  <p className="text-sm sm:text-base text-[#b0f7ff]">{userData.phone}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="flex-1 bg-gradient-to-r from-[#00f7ff] to-[#0099ff] text-[#051320] font-bold py-3 px-6 rounded-lg hover:shadow-[0_0_20px_rgba(0,247,255,0.8)] transition-all duration-300 hover:scale-105">
                  Edit Profile
                </button>
                <button className="flex-1 bg-gradient-to-r from-[#ffcc00] to-[#ff9900] text-[#051320] font-bold py-3 px-6 rounded-lg hover:shadow-[0_0_20px_rgba(255,204,0,0.8)] transition-all duration-300 hover:scale-105">
                  View Events
                </button>
              </div>
            </div>

            {/* Diamond Cut Corners */}
            {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => {
              const positions = {
                "top-left": "top-0 left-0 rotate-[-45deg] origin-top-left",
                "top-right": "top-0 right-0 rotate-[45deg] origin-top-right",
                "bottom-left": "bottom-0 left-0 rotate-[45deg] origin-bottom-left",
                "bottom-right": "bottom-0 right-0 rotate-[-45deg] origin-bottom-right",
              };
              return (
                <div key={corner} className={`absolute ${positions[corner].split(" ")[0]} ${positions[corner].split(" ")[1]} w-8 h-8 overflow-hidden`}>
                  <div className={`absolute w-12 h-12 border-2 border-[#ffcc00] ${positions[corner].split(" ").slice(2).join(" ")}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8">
          <p className="text-xs sm:text-sm text-[#b0f7ff] opacity-60">
            Powered by AVALANCHE TECH TEAM
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPortal;
