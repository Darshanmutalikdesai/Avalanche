// src/layout/RegisterEvents.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
const FloatingStars = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white animate-pulse"
        style={{
          width: Math.random() * 3 + 1 + "px",
          height: Math.random() * 3 + 1 + "px",
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          animationDelay: Math.random() * 3 + "s",
          animationDuration: Math.random() * 3 + 2 + "s",
        }}
      />
    ))}
  </div>
);

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

  // ---------------- Form Screen ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 relative overflow-hidden">
      <FloatingStars />

      {/* Orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="fixed bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block relative mb-6">
            <Sparkles
              className="absolute -top-4 -left-4 text-yellow-400 animate-spin"
              style={{ animationDuration: "3s" }}
              size={24}
            />
            <Rocket
              size={64}
              className="text-cyan-400 animate-bounce mx-auto"
              style={{ animationDuration: "2s" }}
            />
            <Star
              className="absolute -bottom-2 -right-2 text-pink-400 animate-pulse"
              size={20}
            />
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 tracking-wider">
            Register for Event
          </h1>
          {event && (
            <p className="text-cyan-300 text-lg flex items-center justify-center gap-2">
              <Calendar size={20} />
              {event.title}
            </p>
          )}
        </div>

        {/* Registration Form */}
        {event ? (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-2 border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 space-y-6"
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
    </div>
  );
};

export default RegisterEvents;
