import React, { useState, useEffect } from "react";
import {
  User,
  Award,
  Calendar,
  Hash,
  Building2,
  GraduationCap,
} from "lucide-react";

export default function CosmicProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  // 🔗 Fetch user profile from backend
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http/127.0.0.1:5000/api/users/profile", {
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

  useEffect(() => {
    fetchProfile();
  }, []);

  // 🔹 Handle payment button click
  const handlePayment = async () => {
    if (!profile?._id) {
      alert("Avalanche ID not found!");
      return;
    }

    setIsPaying(true);

    try {
      const payload = {
        merchant_id: "4138253",
        order_id: profile._id, // Avalanche ID as order_id
        currency: "INR",
        amount: 1, // Fixed ₹1
        redirect_url: "https://avalanche.git.edu/ccavResponseHandler",
        cancel_url: "https://avalanche.git.edu/ccavResponseHandler",
        language: "EN",
        billing_name: profile.name || "",
        billing_address: "",
        billing_city: "",
        billing_state: "",
        billing_zip: "",
        billing_country: "India",
        billing_tel: "",
        billing_email: profile.email || "",
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Grid background */}
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

      {/* Animated stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: "2px",
              height: "2px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ${
                Math.random() * 3
              }s`,
              boxShadow: "0 0 4px rgba(34, 211, 238, 0.8)",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
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
                style={{ boxShadow: "0 0 10px rgba(74, 222, 128, 0.8)", animation: "glow-pulse 2s infinite" }}
              />
              <span className="text-green-400 text-xs font-mono">ACTIVE</span>
            </div>
          </div>

          <div className="relative h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-8" />

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <InfoCard icon={<Building2 className="w-5 h-5 text-cyan-400" />} label="INSTITUTE" value={profile.institute || "—"} />
            <InfoCard icon={<Hash className="w-5 h-5 text-cyan-400" />} label="AVALANCHE ID" value={profile._id || "—"} />
            <InfoCard icon={<GraduationCap className="w-5 h-5 text-cyan-400" />} label="ROLL NUMBER" value={profile.rollNumber || "—"} />
          </div>

          {/* Registered events */}
          <div className="relative bg-slate-800/30 border border-cyan-500/40 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-cyan-400 tracking-wider">REGISTERED EVENTS</h2>
            </div>
            <div className="space-y-4">
              {(profile.registeredEvents || []).length > 0 ? (
                profile.registeredEvents.map((event, index) => (
                  <div key={index} className="relative bg-slate-900/50 border border-cyan-500/30 p-4 hover:bg-slate-900/70 hover:border-cyan-400/50 transition-all">
                    <div className="flex items-center gap-4">
                      <Award className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-white text-lg flex-1">{event}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 text-xs font-mono">CONFIRMED</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-cyan-300/60 text-sm font-mono">No events registered yet.</p>
              )}
            </div>
          </div>

          {/* Payment button */}
          <div className="mt-4 flex justify-center">
            <button
              className="bg-cyan-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-cyan-600 transition-all"
              onClick={handlePayment}
              disabled={isPaying}
            >
              {isPaying ? "Processing..." : "Pay ₹1"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔹 InfoCard component
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
