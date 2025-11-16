import React, { useState, useEffect } from "react";
import {
  Award,
  Calendar,
  Hash,
  Building2,
  GraduationCap,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaymentButton from "./Common/payment-button";
import AuthManager from "../../utils/authManager"; // IMPORT AUTH MANAGER

export default function CosmicProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getCurrentUser = async (userId) => {
    try {
      // ⭐ USE AUTHENTICATED FETCH
      const response = await AuthManager.authenticatedFetch(
        `https://avalanche.git.edu/api/user/profile`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch user (Status: ${response.status})`);
      }
      
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error("Error in getCurrentUser:", error);
      throw error;
    }
  };

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // ⭐ CHECK SESSION VALIDITY
      if (!AuthManager.isAuthenticated()) {
        throw new Error("Please login to access your profile");
      }

      const userId = localStorage.getItem("userId");
      
      if (!userId) {
        throw new Error("No user ID found. Please login.");
      }

      const userDetails = await getCurrentUser(userId);
      
      const hasPaid = userDetails.payment || false;

      setProfile({
        _id: userDetails.avalancheId || userId,
        name: userDetails.name || "Participant",
        email: userDetails.email || "—",
        institute: userDetails.schlclgName || "—",
        rollNumber: userDetails.rollno || "—",
        registeredEvents: userDetails.registeredEvents,
        hasPaid: hasPaid,
      });
    } catch (err) {
      console.error("Profile fetch error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  // Logout handler
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      AuthManager.clearAuth();
      navigate("/auth");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-cyan-400 text-xl">
        Loading your cosmic profile...
      </div>
    );

  if (error || !profile)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400 text-xl">
        <div className="text-center">
          <p className="mb-4">Unable to fetch profile.</p>
          {error && <p className="text-sm text-red-300 mb-4">{error}</p>}
          <button
            onClick={() => navigate("/auth")}
            className="mt-4 px-6 py-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-all"
          >
            Return to Login
          </button>
        </div>
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

      <div className="relative max-w-4xl pt-20 w-full z-10">
        <div
          className="relative bg-slate-900/90 backdrop-blur-sm p-8 md:p-12"
          style={{
            clipPath:
              "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))",
          }}
        >

          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 tracking-wider">
                {profile.name}
              </h1>
              <p className="text-cyan-300/60 text-sm font-mono">{profile.email}</p>
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
              value={profile._id}
            />
            <InfoCard
              icon={<GraduationCap className="w-5 h-5 text-cyan-400" />}
              label="ROLL NUMBER"
              value={profile.rollNumber}
            />
            <InfoCard
              icon={<Award className={`w-5 h-5 ${profile.hasPaid ? 'text-green-400' : 'text-red-400'}`} />}
              label="PAYMENT STATUS"
              value={profile.hasPaid ? 'PAID' : 'UNPAID'}
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
                    key={event.eventid || index}
                    className="relative bg-slate-900/50 border border-cyan-500/30 p-4 hover:bg-slate-900/70 hover:border-cyan-400/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <Award className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-white text-lg block">
                          {event.name || "Event"}
                        </span>
                      </div>
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
            <div className="relative bg-green-900/30 border border-green-500/40 p-6 mb-6">
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
            <div className="relative bg-red-900/30 border border-red-500/40 p-6 mb-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-400 tracking-wider">
                    PAYMENT PENDING
                  </h3>
                  <p className="text-red-300/80 text-sm font-mono mt-1">
                    Complete your payment to confirm event registrations.
                  </p>
                </div>
                <div className="justify-items-center">
                  <PaymentButton />
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-400 text-red-400 hover:text-red-300 px-6 py-3 rounded-lg transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-mono text-sm font-bold">LOGOUT</span>
            </button>
          </div>
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