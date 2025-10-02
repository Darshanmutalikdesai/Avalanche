import React, { useState, useEffect } from "react";
import BackgroundVideo from "../../assets/backround1.mp4"; // 🎥 your video file

const ArwesAuthPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateGlow, setAnimateGlow] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    clgName: "",
    usn: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    const glowInterval = setInterval(() => {
      setAnimateGlow((prev) => !prev);
    }, 2000);
    return () => clearInterval(glowInterval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Sign Up Data:", formData);
      alert("Sign Up Successful!");
    } else {
      console.log("Sign In Data:", {
        email: formData.email,
        password: formData.password,
      });
      alert("Sign In Successful!");
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: "",
      email: "",
      phone: "",
      clgName: "",
      usn: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="fixed inset-0 overflow-auto flex flex-col">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={BackgroundVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Auth Box */}
      <div className="min-h-screen flex items-center justify-center relative z-10 px-4">
        <div
          className={`
          max-w-sm w-full transform transition-all duration-1000 ease-out
          ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        `}
        >
          <div className="group relative text-center bg-[rgba(0,15,30,0.85)] border border-[#00f7ff] rounded-xl shadow-[0_0_15px_rgba(0,247,255,0.3)] transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_#00f7ff,0_0_30px_#00f7ff] px-4 pt-16 pb-6 overflow-visible">
            {/* 🚀 Icon */}
            <div
              className={`absolute -top-12 left-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out ${
                animateGlow ? "scale-110" : "scale-100"
              }`}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#00f7ff] to-[#0066cc] shadow-[0_0_20px_rgba(0,247,255,0.6)] border-2 border-[#00f7ff40] flex items-center justify-center transition-transform duration-600 ease-in-out group-hover:scale-[1.08]">
                <span className="text-2xl md:text-3xl">🚀</span>
              </div>
            </div>

            {/* Title */}
            <div className="mt-6 mb-6">
              <h1 className="text-xl md:text-2xl font-semibold text-[#ffcc00] mb-1 drop-shadow-[0_0_6px_#ffcc00]">
                AVALANCHE AUTH
              </h1>
              <p className="text-xs text-[#cfcfcf] mb-3 min-h-[18px]">
                {isSignUp ? "Create your account" : "Access your account"}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-3">
              {isSignUp && (
                <div className="input-box">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {isSignUp && (
                <>
                  <div className="input-box">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-box">
                    <input
                      type="text"
                      name="clgName"
                      placeholder="College Name"
                      value={formData.clgName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-box">
                    <input
                      type="text"
                      name="usn"
                      placeholder="USN"
                      value={formData.usn}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}

              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              {isSignUp && (
                <div className="input-box">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {/* Submit */}
              <div className="group/manual relative text-center bg-[rgba(255,204,0,0.1)] border border-[#ffcc00] rounded-lg shadow-[0_0_10px_rgba(255,204,0,0.3)] transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(255,204,0,0.5)] overflow-hidden mt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full p-3 text-sm text-[#ffcc00] font-semibold transition-all duration-300 hover:bg-[rgba(255,204,0,0.1)] transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                  <span className="text-lg">{isSignUp ? "🔐" : "⚡"}</span>
                  <span className="tracking-wide">
                    {isSignUp ? "INITIALIZE ACCOUNT" : "ACCESS SYSTEM"}
                  </span>
                </button>
              </div>
            </div>

            {/* Toggle */}
            <div className="mt-4 text-center">
              <button
                onClick={toggleMode}
                className="text-[#00f7ff] text-xs font-bold tracking-wide hover:text-[#ffcc00] transition-colors duration-300 underline"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>

            {/* Secure Connection */}
            <div className="mt-4 text-center">
              <p className="text-[#00f7ff] text-[10px] font-bold mb-2 tracking-widest">
                SECURE CONNECTION ACTIVE
              </p>
              <div className="flex justify-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-[#00ff00] rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 300}ms`,
                      boxShadow: "0 0 6px rgba(0,255,0,0.8)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Style */}
      <style>{`
        .input-box {
          background: rgba(0,15,30,0.9);
          border: 1px solid #00f7ff;
          border-radius: 0.4rem;
          box-shadow: 0 0 10px rgba(0,247,255,0.2);
          padding: 0.6rem;
        }
        .input-box input {
          width: 100%;
          background: transparent;
          color: #cfcfcf;
          font-size: 0.85rem;
          outline: none;
          letter-spacing: 0.02em;
        }
        .input-box input::placeholder {
          color: rgba(0,247,255,0.5);
        }
      `}</style>
    </div>
  );
};

export default ArwesAuthPage;
