import React, { useState, useEffect } from "react";
import {
  User,
  Award,
  Calendar,
  Hash,
  Building2,
  GraduationCap,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CosmicProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔗 Fetch user profile
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login.");

      const res = await fetch("https://avalanche.git.edu/api/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized. Please login.");
        throw new Error("Failed to fetch profile");
      }

      const data = await res.json();
      const user = data.user;

      setProfile({
        _id: user._id || user.id,
        name: user.name,
        email: user.email,
        institute: user.institute || "—",
        rollNumber: user.rollNumber || "—",
        registeredEvents: user.registeredEvents || [],
        hasPaid: user.hasPaid || false,
      });
    } catch (err) {
      console.error("Profile fetch error:", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 🔗 Redirect to backend payment page
  // const handlePaymentRedirect = () => {
  //   if (!profile?._id) {
  //     alert("User ID not found!");
  //     return;
  //   }
  //   window.location.href = `https://backendavalanche.git.edu`;
  // };

  // 🚪 Logout handler
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear token from localStorage
      localStorage.removeItem("token");
      
      // Navigate to login page
      navigate("/auth");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-cyan-400 text-xl">
        Loading your cosmic profile...
      </div>
    );

  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400 text-xl">
        Unable to fetch profile.
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: "2px",
              height: "2px",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 3}s`,
              boxShadow: "0 0 4px rgba(34, 211, 238, 0.8)",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes twinkle {0%,100% {opacity:0.2;} 50% {opacity:1;}}
        @keyframes glow-pulse {0%,100% {opacity:0.5;} 50% {opacity:1;}}
      `}</style>

      <div className="relative max-w-4xl w-full z-10">
        <div
          className="relative bg-slate-900/90 backdrop-blur-sm p-8 md:p-12"
          style={{
            clipPath:
              "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))",
          }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="relative flex-shrink-0 w-32 h-32 bg-slate-800 border-2 border-cyan-500 flex items-center justify-center">
              <User className="w-16 h-16 text-cyan-400" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 tracking-wider">
                {profile.name || "Participant"}
              </h1>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div
                className="w-3 h-3 bg-green-400 rounded-full"
                style={{
                  boxShadow: "0 0 10px rgba(74, 222, 128, 0.8)",
                  animation: "glow-pulse 2s infinite",
                }}
              />
              <span className="text-green-400 text-xs font-mono">ACTIVE</span>
            </div>
          </div>

          <div className="relative h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-8" />

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <InfoCard
              icon={<Building2 className="w-5 h-5 text-cyan-400" />}
              label="INSTITUTE"
              value={profile.institute}
            />
            <InfoCard
              icon={<Hash className="w-5 h-5 text-cyan-400" />}
              label="AVALANCHE ID"
              value={profile._id || "Not found"}
            />
            <InfoCard
              icon={<GraduationCap className="w-5 h-5 text-cyan-400" />}
              label="ROLL NUMBER"
              value={profile.rollNumber}
            />
          </div>

          {/* Registered events */}
          <div className="relative bg-slate-800/30 border border-cyan-500/40 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-400 tracking-wider">
                REGISTERED EVENTS
              </h2>
            </div>
            <div className="space-y-4">
              {profile.registeredEvents.length > 0 ? (
                profile.registeredEvents.map((event, index) => (
                  <div
                    key={index}
                    className="relative bg-slate-900/50 border border-cyan-500/30 p-4 hover:bg-slate-900/70 hover:border-cyan-400/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <Award className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-white text-lg flex-1">
                        {event}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 text-xs font-mono">
                          CONFIRMED
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-cyan-300/60 text-sm font-mono">
                  No events registered yet.
                </p>
              )}
            </div>
          </div>

          {/* Payment Section */}
          {profile.hasPaid ? (
            <div className="relative bg-green-900/30 border border-green-500/40 p-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-400 tracking-wider">
                    PAYMENT SUCCESSFUL
                  </h3>
                  <p className="text-green-300/80 text-sm font-mono mt-1">
                    Your registration is complete!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex justify-center gap-4">
              {/* <button
                className="bg-cyan-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-cyan-600 transition-all"
                onClick={handlePaymentRedirect}
              >
                Pay ₹1
              </button> */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-400 text-red-400 hover:text-red-300 px-6 py-3 rounded-lg transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-mono text-sm font-bold">LOGOUT</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="relative bg-slate-800/50 border border-cyan-500/30 p-5">
      <div className="flex items-start gap-3">
        {icon}
        <div>
          <div className="text-cyan-400/60 text-xs font-mono mb-1">{label}</div>
          <div className="text-white text-lg">{value}</div>
        </div>
      </div>
    </div>
  );
}