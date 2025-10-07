import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

const UserPortal = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🌐 Backend base URL (adjust if deployed)
  const API_BASE = "http://localhost:5000/api/users";

  // 🔒 Fetch logged-in user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/auth");
          return;
        }

        const res = await axios.get(`${API_BASE}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data.user);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // 🚪 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#051320] text-[#00f7ff] text-lg">
        Loading your portal...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#051320] text-[#00f7ff]">
        <p>Session expired or user not found.</p>
        <button
          onClick={() => navigate("/auth")}
          className="mt-4 bg-[#00f7ff] text-[#051320] px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-y-auto bg-gradient-to-br from-[#0a1929] to-[#051320]"
      style={{ fontFamily: "Nasalization, sans-serif" }}
    >
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #00f7ff 0px, transparent 1px, transparent 40px),
                              repeating-linear-gradient(90deg, #00f7ff 0px, transparent 1px, transparent 40px)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#00eaff] drop-shadow-[0_0_20px_rgba(0,234,255,0.8)] mb-2">
            AVALANCHE
          </h1>
          <p className="text-[#ffcc00]">USER PORTAL</p>
        </div>

        {/* Card */}
        <div
          className="relative w-full max-w-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`relative w-full bg-gradient-to-br from-[#0a1929] to-[#051320]
              border-2 border-[#00f7ff] rounded-2xl overflow-visible transition-all duration-500 ease-out
              ${isHovered ? "shadow-[0_0_40px_rgba(0,247,255,0.7)] scale-[1.02]" : "shadow-[0_0_20px_rgba(0,247,255,0.4)]"}
            `}
          >
            <div className="p-10">
              {/* Avatar */}
              <div className="flex justify-center mb-8">
                <div
                  className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-cover bg-center border-4 border-[#00f7ff] shadow-[0_0_30px_rgba(0,247,255,0.7)] transition-all ${
                    isHovered ? "scale-110" : "scale-100"
                  }`}
                  style={{
                    backgroundImage: `url(https://ui-avatars.com/api/?name=${userData.name
                      .replace(" ", "+")
                      .trim()}&size=256&background=00f7ff&color=051320&bold=true&format=png)`,
                  }}
                />
              </div>

              {/* User Info */}
              <h2 className="text-3xl font-bold text-[#00f7ff] text-center mb-6">
                {userData.name}
              </h2>

              <div className="space-y-6">
                <InfoBlock label="Avalanche ID" value={userData.avalancheId || "AVL2024"} color="#00f7ff" />
                <InfoBlock label="College" value={userData.college || "N/A"} color="#ffcc00" />
                <InfoBlock label="Email" value={userData.email} color="#00f7ff" />
                <InfoBlock label="Phone" value={userData.phone || "Not Provided"} color="#00f7ff" />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  className="flex-1 bg-gradient-to-r from-[#00f7ff] to-[#0099ff] text-[#051320] font-bold py-3 px-6 rounded-lg hover:scale-105 transition-all"
                  onClick={() => navigate("/edit-profile")}
                >
                  Edit Profile
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-[#ffcc00] to-[#ff9900] text-[#051320] font-bold py-3 px-6 rounded-lg hover:scale-105 transition-all"
                  onClick={() => navigate("/events")}
                >
                  View Events
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="mt-6 text-sm text-[#b0f7ff] underline hover:text-[#00f7ff] transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-[#b0f7ff] opacity-60">
            Powered by AVALANCHE TECH TEAM
          </p>
        </div>
      </div>
    </div>
  );
};

// Info card component
const InfoBlock = ({ label, value, color }) => (
  <div
    className="rounded-lg p-4 border transition-all duration-300"
    style={{
      borderColor: color,
      backgroundColor: "rgba(0,247,255,0.05)",
    }}
  >
    <label
      className="text-xs uppercase tracking-wider mb-1 block"
      style={{ color }}
    >
      {label}
    </label>
    <p
      className="text-lg font-semibold"
      style={{ color }}
    >
      {value}
    </p>
  </div>
);

export default UserPortal;
