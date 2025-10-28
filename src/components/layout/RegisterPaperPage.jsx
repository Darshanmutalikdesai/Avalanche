import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../layout/Common/Navbar";

const RegisterPaperPage = () => {
  const location = useLocation();
  const eventNameFromState = location.state?.eventName || "Paper Presentation";

  const [formData, setFormData] = useState({
    eventName: eventNameFromState,
    department: "",
    mode: "",
    teamMember1: "",
    teamMember2: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Valid departments list
  const validDepartments = [
    "Aeronautical",
    "Architecture",
    "Physics",
    "Chemistry",
    "B. Sc. (PCM)",
    "Mathematics",
    "Civil Engineering",
    "Computer Science",
    "Electronics & Communications (EC)",
    "Information Science (IS)",
    "MBA",
    "MCA",
    "Mechanical Engineering",
    "AI-ML",
  ];

  // Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Create teamMembers array from individual inputs
      const teamMembers = [
        formData.teamMember1.trim(),
        formData.teamMember2.trim(),
      ].filter((id) => id !== ""); // Remove empty values

      if (teamMembers.length === 0) {
        throw new Error("Please provide at least one team member ID");
      }

      console.log("📤 Submitting registration:", {
        department: formData.department,
        teamMembers,
        mode: formData.mode,
      });

      const response = await fetch(
        "https://avalanche.git.edu/api/paper-presentation/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            department: formData.department,
            teamMembers: teamMembers,
            mode: formData.mode,
          }),
        }
      );

      const data = await response.json();
      console.log("📥 Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setMessage(`✅ ${data.message}`);
      console.log("✅ Registration successful:", data);

      // Reset form on success
      setFormData({
        eventName: eventNameFromState,
        department: "",
        mode: "",
        teamMember1: "",
        teamMember2: "",
      });
    } catch (error) {
      setMessage(`❌ ${error.message}`);
      console.error("❌ Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#00111f] to-black text-white font-orbitron"
      style={{ fontFamily: "Nasalization, sans-serif" }}
    >
      <NavigationBar />

      <div className="mt-32 bg-black/60 border border-cyan-400 rounded-2xl shadow-[0_0_20px_#00eaff] p-8 w-[90%] max-w-lg backdrop-blur-md">
        <h1 className="text-3xl font-bold text-cyan-300 text-center mb-6">
          {formData.eventName} Registration
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
              className="w-full bg-black/40 border border-cyan-400 rounded-md px-4 py-2 text-white opacity-70"
            />
          </div>

          {/* Department Selection */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Department <span className="text-red-400">*</span>
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full bg-black/40 border border-cyan-400 rounded-md px-4 py-2 text-white focus:outline-none focus:border-cyan-300"
              required
            >
              <option value="">Select Department</option>
              {validDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Mode Selection */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Mode <span className="text-red-400">*</span>
            </label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full bg-black/40 border border-cyan-400 rounded-md px-4 py-2 text-white focus:outline-none focus:border-cyan-300"
              required
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          {/* Team Member 1 */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Team Member 1 ID <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="teamMember1"
              placeholder="Enter User ID, Email, or Roll Number"
              value={formData.teamMember1}
              onChange={handleChange}
              className="w-full bg-black/40 border border-cyan-400 rounded-md px-4 py-2 text-white focus:outline-none focus:border-cyan-300"
              required
            />
            <p className="text-xs text-cyan-400/60 mt-1">
              You can use MongoDB ID, Email, Roll Number, or Avalanche ID
            </p>
          </div>

          {/* Team Member 2 */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Team Member 2 ID (Optional)
            </label>
            <input
              type="text"
              name="teamMember2"
              placeholder="Enter User ID, Email, or Roll Number"
              value={formData.teamMember2}
              onChange={handleChange}
              className="w-full bg-black/40 border border-cyan-400 rounded-md px-4 py-2 text-white focus:outline-none focus:border-cyan-300"
            />
            <p className="text-xs text-cyan-400/60 mt-1">
              You can use MongoDB ID, Email, Roll Number, or Avalanche ID
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-400 text-black font-bold py-3 rounded-md hover:bg-cyan-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Register Team"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`text-center mt-4 p-3 rounded-md ${
              message.startsWith("✅")
                ? "bg-green-900/30 border border-green-500/50 text-green-400"
                : "bg-red-900/30 border border-red-500/50 text-red-400"
            }`}
          >
            <p className="font-semibold">{message}</p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-md">
          <h3 className="text-sm font-bold text-cyan-300 mb-2">
            📌 Important Notes:
          </h3>
          <ul className="text-xs text-cyan-400/80 space-y-1">
            <li>• Both team members must be verified users</li>
            <li>• Both team members must have completed payment</li>
            <li>• You can use any unique identifier (ID, Email, Roll Number)</li>
            <li>• Each user can register only once per department</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegisterPaperPage;