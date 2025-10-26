// src/layout/RegisterEvents.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "./Common/Navbar";
import {
  Rocket,
  Star,
  Sparkles,
  Mail,
  User,
  Calendar,
  Users,
} from "lucide-react";

// ---------------- Reusable UI Components ----------------

// Input
const SpaceInput = ({
  icon: Icon,
  label,
  type = "text",
  value,
  onChange,
  name,
  required = false,
  readOnly = false,
}) => (
  <div className="relative group">
    <label className="block text-cyan-300 text-sm font-medium mb-2 tracking-wider">
      {label} {required && <span className="text-pink-400">*</span>}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 group-hover:text-pink-400 transition-colors duration-300">
        <Icon size={20} />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        className={`w-full bg-slate-900/50 border-2 border-cyan-500/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 
        focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 
        transition-all duration-300 backdrop-blur-sm hover:border-cyan-400/50 
        ${readOnly ? "cursor-not-allowed opacity-70" : ""}`}
        placeholder={!readOnly ? `Enter your ${label.toLowerCase()}` : ""}
      />
    </div>
  </div>
);

// Button
const SpaceButton = ({ children, type = "button", onClick, disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="relative w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 
    text-white font-bold py-4 px-8 rounded-lg overflow-hidden group 
    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 
    hover:shadow-lg hover:shadow-pink-500/50"
  >
    <span className="relative z-10 flex items-center justify-center gap-3 text-lg tracking-wider">
      {children}
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 
    opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </button>
);

// Stars BG
// ---------------- Main Component ----------------
const RegisterEvents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {}; // ✅ get event data from state

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    teamName: "",
    eventName: event?.title || "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.eventName) {
      console.log("Form submitted:", formData);

      // 👉 Send this to your backend API
      // fetch("/api/register", { method: "POST", body: JSON.stringify(formData) });

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        navigate("/"); // redirect to home or success page
      }, 3000);
    }
  };

  // ---------------- Success Screen ----------------
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <FloatingStars />
        <div className="relative z-10 text-center">
          <div className="inline-block animate-bounce mb-6">
            <Rocket size={80} className="text-cyan-400" />
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4">
            Registration Successful!
          </h2>
          <p className="text-cyan-300 text-xl">
            You’ve registered for {formData.eventName}! 🚀
          </p>
        </div>
      </div>
    );
  }
  useEffect(() => {
      const numStars = 79;
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

  // ---------------- Form Screen ----------------
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}>

        <div id="star-container" className="stars absolute w-full h-full"></div>


        <div className="relative z-[60]">
            <NavigationBar />
        </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mt-24 mb-12">
          <div className="inline-block relative mb-6">
            <Sparkles
              className="absolute -top-4 -left-4 text-yellow-400 animate-spin"
              style={{ animationDuration: "3s" }}
              size={20}
            />
            <Rocket
              size={56}
              className="text-cyan-400 animate-bounce mx-auto"
              style={{ animationDuration: "2s" }}
            />
            <Star
              className="absolute -bottom-2 -right-2 text-pink-400 animate-pulse"
              size={18}
            />
          </div>
          <h1 className="text-4xl font-bold text-transparent font-nasal bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 tracking-wider">
            Register for Event
          </h1>
          {event && (
            <p className="text-cyan-300 text-lg flex font-orbitron items-center justify-center gap-2">
              <Calendar size={20} />
              {event.title}
            </p>
          )}
        </div>

        {/* Registration Form */}
        {event ? (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-800/30 font-orbitron backdrop-blur-md rounded-2xl p-8 shadow-2xl border-2 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 space-y-6"
          >
            <SpaceInput
              icon={Star}
              label="Event"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              readOnly
            />

            <SpaceInput
              icon={User}
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <SpaceInput
              icon={Mail}
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <SpaceInput
              icon={Users}
              label="Team Name (optional)"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
            />

            <div className="pt-6">
              <SpaceButton type="submit">
                <Rocket size={24} />
                Launch Registration
              </SpaceButton>
            </div>
          </form>
        ) : (
          <p className="text-center text-gray-300">
            No event selected. Please go back and choose an event.
          </p>
        )}
      </div>
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
};

export default RegisterEvents;