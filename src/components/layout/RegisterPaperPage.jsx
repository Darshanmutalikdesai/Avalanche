import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "../layout/Common/Navbar";

const RegisterPaperPage = () => {
  const location = useLocation();
  const event = location.state?.event || {};
  const [formData, setFormData] = useState({
    eventName: event.title || "Paper Presentation",
    mode: "",
    department: "",
    teamMembers: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Registration successful!");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#00111f] to-black text-white font-orbitron"
      style={{ fontFamily: "Nasalization, sans-serif" }}
    >
      <NavigationBar />
      <div className="mt-32 bg-black/60 border border-cyan-400 rounded-2xl shadow-[0_0_20px_#00eaff] p-8 w-[90%] max-w-lg backdrop-blur-md">
        <h1 className="text-3xl font-bold text-cyan-300 text-center mb-6">
          Paper Presentation Registration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Event Name
            </label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              disabled
              className="w-full bg-black/40 border border-cyan-400 rounded-md px-4 py-2 text-white"
            />
          </div>

          {/* Mode Dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-2">Mode</label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full bg-black/40 border border-cyan-400 rounded-md px-4 py-2 text-white"
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          {/* Department Dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full bg-black/40 border border-cyan-400 rounded-md px-4 py-2 text-white"
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics</option>
              <option value="MECH">Mechanical</option>
              <option value="CIVIL">Civil</option>
              <option value="AI-ML">AI & ML</option>
            </select>
          </div>

          {/* Team Members */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Team Members ID
            </label>
            <input
              type="text"
              name="teamMembers"
              placeholder="Enter IDs separated by commas"
              value={formData.teamMembers}
              onChange={handleChange}
              className="w-full bg-black/40 border border-cyan-400 rounded-md px-4 py-2 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-400 text-black font-bold py-2 rounded-md hover:bg-cyan-300 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPaperPage;
