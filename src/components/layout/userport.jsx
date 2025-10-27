import React, { useState, useEffect } from "react";
import {
  User,
  Award,
  Calendar,
  Hash,
  Building2,
  GraduationCap,
} from "lucide-react";
import NavigationBar from "./Common/Navbar";
import Footer from "../../components/layout/Common/footer";

export default function CosmicProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  useEffect(() => {
      const numStars = 140;
      const container = document.getElementById("star-container");
      if (!container) return;
      container.innerHTML = "";
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.top = Math.random() * 100 + "%";
        star.style.left = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 5 + "s";
        const size = Math.random() * 4 + 1;
        star.style.width = size + "px";
        star.style.height = size + "px";
        container.appendChild(star);
      }
    }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error.message);
    } finally {
      setLoading(false);
    }
  };

  function InfoCard({ icon, label, value }) {
    return (
      <div className="bg-slate-800/60 border border-cyan-500/30 rounded-xl p-5 shadow-md hover:border-cyan-400/50 transition-all">
        <div className="flex items-start gap-3">
          {icon}
          <div>
            <div className="text-cyan-400/60 text-xs font-mono mb-1">
              {label}
            </div>
            <div className="text-white text-lg break-words">{value}</div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const handlePayment = async () => {
    if (!profile?._id) {
      alert("Avalanche ID not found!");
      return;
    }

    setIsPaying(true);

    try {
      const payload = {
        merchant_id: "4138253",
        order_id: profile.user._id,
        currency: "INR",
        amount: 1,
        redirect_url: "https://avalanche.git.edu/ccavResponseHandler",
        cancel_url: "https://avalanche.git.edu/ccavResponseHandler",
        language: "EN",
        billing_name: profile.user.name || "",
        billing_country: "India",
        billing_email: profile.user.email || "",
      };

      const res = await fetch("http://127.0.0.1:3001/ccavRequestHandler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const htmlResponse = await res.text();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlResponse;
      document.body.appendChild(tempDiv);
      const form = tempDiv.querySelector("form");
      if (form) form.submit();
    } catch (error) {
      console.error("Payment submission error:", error);
      alert("Error initiating payment. Try again.");
    } finally {
      setIsPaying(false);
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
    <div cclassName="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}>

        <div id="star-container" className="stars absolute w-full h-full"></div>


        <div className="relative z-[60]">
            <NavigationBar />
        </div>
      {/* Content container */}
      <main className="flex-grow flex justify-center px-4 py-16 md:py-20">
        <div className="w-full backdrop-blur-lg max-w-4xl">
          <div className="p-6 sm:p-10 md:p-12 rounded-2xl border border-cyan-500/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-8">
              <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center bg-slate-800 border-2 border-cyan-500 rounded-full">
                <User className="w-14 h-14 text-cyan-400" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400 mb-1">
                  {profile.user.name || "Participant"}
                </h1>
              </div>
              <div className="flex flex-col items-center gap-1">
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

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mb-8" />

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              <InfoCard
                icon={<Building2 className="w-5 h-5 text-cyan-400" />}
                label="INSTITUTE"
                value={profile.user.institute || "—"}
              />
              <InfoCard
                icon={<Hash className="w-5 h-5 text-cyan-400" />}
                label="AVALANCHE ID"
                value={profile.user._id || "—"}
              />
              <InfoCard
                icon={<GraduationCap className="w-5 h-5 text-cyan-400" />}
                label="ROLL NUMBER"
                value={profile.user.rollNumber || "—"}
              />
            </div>

            {/* Registered Events */}
            <div className="bg-slate-800/40 border border-cyan-500/40 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-5">
                <Calendar className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-cyan-400">
                  REGISTERED EVENTS
                </h2>
              </div>
              <div className="space-y-4">
                {(profile.registeredEvents || []).length > 0 ? (
                  profile.registeredEvents.map((event, index) => (
                    <div
                      key={index}
                      className="bg-slate-900/60 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <Award className="w-5 h-5 text-cyan-400" />
                          <span className="text-white text-base break-words">
                            {event}
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

            {/* Payment */}
            <div className="flex justify-center">
              <button
                onClick={handlePayment}
                disabled={isPaying}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-bold transition-all disabled:opacity-60"
              >
                {isPaying ? "Processing..." : "Pay ₹1"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ✅ Fixed footer at bottom, always visible but not overlapping */}
      <Footer />
      <style>{`
        html, body {
          overflow-x: hidden !important;
          width: 100%;
          max-width: 100vw;
        }
        .stars .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 1;
          animation: twinkle 3s infinite alternate, drift 20s linear infinite;
        }
        @keyframes twinkle {
          from { opacity: 0.3; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1.2); }
        }
        @keyframes drift {
          from { transform: translate(0, 0); }
          to { transform: translate(20px, 20px); }
        }
        @keyframes slide {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
        .animate-slide {
          animation: slide 30s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          75% { transform: rotate(-2deg); }
        }
        .animate-wiggle {
          animation: wiggle 4s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 6px #3b82f6); }
          50% { filter: drop-shadow(0 0 16px #2563eb); }
        }
        .animate-glow {
          animation: glow 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
