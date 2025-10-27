import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateGlow, setAnimateGlow] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    clgName: "",
    usn: "",
    password: "",
    confirmPassword: "",
  });

  const colleges = [
    "KLS Gogte Institute of Technology, Belagavi",
    "KLE Dr. M.S. Sheshgiri College of Engineering and Technology, Belagavi",
    "Jain College of Engineering (JCE), Belagavi",
    "S.G. Balekundri Institute of Technology (SGBIT), Belagavi",
    "Hirasugar Institute of Technology (HSIT), Belagavi",
    "Angadi Institute of Technology and Management (AITM), Belagavi",
    "Bharatesh Institute of Technology, Belagavi",
    "V.S.M. Institute of Technology, Nipani Tal - Chikodi",
    "Maratha Mandal Engineering College, Belagavi",
    "Shaikh College of Engineering and Technology (SCET), Belagavi",
    "Visvesvaraya Technological University, Belagavi",
  ];

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    const glowInterval = setInterval(() => {
      setAnimateGlow((prev) => !prev);
    }, 2000);
    return () => clearInterval(glowInterval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerUser = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://avalanche.git.edu/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          pNumber: formData.phone,
          rollNumber: formData.usn,
          institute: formData.clgName,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/otp", { state: { email: formData.email } });
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      alert("Server error: " + error.message);
    }
    setLoading(false);
  };

  const loginUser = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://avalanche.git.edu/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("payment", data.payment);
        alert("Login successful!");
        navigate("/home");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      alert("Server error: " + error.message);
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      registerUser();
    } else {
      loginUser();
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
    <div className="fixed inset-0 overflow-auto flex flex-col font-['Nasalization'] text-white">
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="min-h-screen flex items-center justify-center relative z-10 px-4">
        <div
          className={`max-w-sm w-full transform transition-all duration-1000 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="group relative text-center bg-[rgba(0,15,30,0.85)] border border-[#00f7ff] rounded-xl shadow-[0_0_15px_rgba(0,247,255,0.3)] transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_#00f7ff,0_0_30px_#00f7ff] px-4 pt-16 pb-6 overflow-visible">
            {/* Glow Rocket */}
            <div
              className={`absolute -top-12 left-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out ${
                animateGlow ? "scale-110" : "scale-100"
              }`}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#00f7ff] to-[#0066cc] shadow-[0_0_20px_rgba(0,247,255,0.6)] border-2 border-[#00f7ff40] flex items-center justify-center">
                <span className="text-2xl md:text-3xl">🚀</span>
              </div>
            </div>

            <div className="mt-6 mb-6">
              <h1 className="text-xl md:text-2xl font-semibold text-[#ffcc00] mb-1 drop-shadow-[0_0_6px_#ffcc00] uppercase tracking-wide">
                AVALANCHE AUTH
              </h1>
              <p className="text-xs text-[#cfcfcf] mb-3 min-h-[18px] tracking-widest">
                {isSignUp ? "Create your account" : "Access your account"}
              </p>
            </div>

            <div className="space-y-3">
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-box"
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="input-box"
              />

              {isSignUp && (
                <>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-box"
                  />
                  <select
                    name="clgName"
                    value={formData.clgName}
                    onChange={handleInputChange}
                    className="input-box"
                  >
                    <option value="">Select College</option>
                    {colleges.map((college, idx) => (
                      <option key={idx} value={college}>
                        {college}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="usn"
                    placeholder="USN"
                    value={formData.usn}
                    onChange={handleInputChange}
                    className="input-box"
                  />
                </>
              )}

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-box"
              />

              {isSignUp && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input-box"
                />
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full p-3 mt-4 bg-[#ffcc00] text-black font-semibold rounded-lg"
              >
                {loading ? "Processing..." : isSignUp ? "Register" : "Login"}
              </button>

              <button
                onClick={toggleMode}
                className="mt-2 text-xs text-[#00f7ff] hover:text-[#ffcc00] underline"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>

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

      <style>{`
        @font-face {
          font-family: 'Nasalization';
          src: url('/src/assets/fonts/NASALIZA.TTF') format('truetype');
        }
        .input-box {
          width: 100%;
          padding: 0.6rem;
          margin-bottom: 0.5rem;
          border: 1px solid #00f7ff;
          border-radius: 0.4rem;
          background: rgba(0,15,30,0.9);
          color: #cfcfcf;
          outline: none;
        }
        .input-box::placeholder { color: rgba(0,247,255,0.5); }
      `}</style>
    </div>
  );
};

export default RegisterPage;
