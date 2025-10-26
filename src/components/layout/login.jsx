import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Common/Navbar";

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

  // ✅ Register User API
  const registerUser = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          recaptchaToken: "dummyToken", // Replace with real token if needed
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/otp", { state: { email: formData.email } }); // Navigate to OTP page
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      alert("Server error: " + error.message);
    }
    setLoading(false);
  };

  // ✅ Login User API
  const loginUser = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/login", {
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
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful!");
        navigate("/home"); // ✅ Navigate to home page after login
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
    <div className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}>

        <div id="star-container" className="stars absolute w-full h-full"></div>


        <div className="relative z-[60]">
            <NavigationBar />
        </div>
      <div className="min-h-screen flex items-center justify-center relative z-10 px-4">
        <div className={`max-w-sm w-full transform transition-all duration-1000 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="group relative text-center bg-[rgba(0,15,30,0.85)] border border-[#00f7ff] rounded-xl shadow-[0_0_15px_rgba(0,247,255,0.3)] transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_#00f7ff,0_0_30px_#00f7ff] px-4 pt-16 pb-6 overflow-visible">
            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out ${animateGlow ? "scale-110" : "scale-100"}`}>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#00f7ff] to-[#0066cc] shadow-[0_0_20px_rgba(0,247,255,0.6)] border-2 border-[#00f7ff40] flex items-center justify-center">
                <span className="text-2xl md:text-3xl">🚀</span>
              </div>
            </div>

            <div className="mt-6 mb-6">
              <h1 className="text-xl md:text-2xl font-semibold text-[#ffcc00] mb-1 drop-shadow-[0_0_6px_#ffcc00] uppercase tracking-wide">AVALANCHE AUTH</h1>
              <p className="text-xs text-[#cfcfcf] mb-3 min-h-[18px] tracking-widest">{isSignUp ? "Create your account" : "Access your account"}</p>
            </div>

            <div className="space-y-3">
              {isSignUp && (
                <div className="input-box">
                  <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} />
                </div>
              )}

              <div className="input-box">
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
              </div>

              {isSignUp && (
                <>
                  <div className="input-box">
                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div className="input-box">
                    <select name="clgName" value={formData.clgName} onChange={handleInputChange} className="w-full bg-transparent text-[#cfcfcf] outline-none text-sm">
                      <option value="" className="bg-black text-gray-500">Select College</option>
                      {colleges.map((college, index) => (
                        <option key={index} value={college} className="bg-[#00121f] text-white">{college}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-box">
                    <input type="text" name="usn" placeholder="USN" value={formData.usn} onChange={handleInputChange} />
                  </div>
                </>
              )}

              <div className="input-box">
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
              </div>

              {isSignUp && (
                <div className="input-box">
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} />
                </div>
              )}

              <div className="group/manual relative text-center bg-[rgba(255,204,0,0.1)] border border-[#ffcc00] rounded-lg shadow-[0_0_10px_rgba(255,204,0,0.3)] hover:shadow-[0_0_15px_rgba(255,204,0,0.5)] mt-4">
                <button onClick={handleSubmit} disabled={loading} className="w-full p-3 text-sm text-[#ffcc00] font-semibold hover:bg-[rgba(255,204,0,0.1)] transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 uppercase tracking-wide">
                  <span className="text-lg">{isSignUp ? "🔐" : "⚡"}</span>
                  <span>{loading ? "Processing..." : isSignUp ? "Initialize Account" : "Access System"}</span>
                </button>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button onClick={toggleMode} className="text-[#00f7ff] text-xs font-bold tracking-wide hover:text-[#ffcc00] transition-colors duration-300 underline uppercase">
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-[#00f7ff] text-[10px] font-bold mb-2 tracking-widest">SECURE CONNECTION ACTIVE</p>
              <div className="flex justify-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-[#00ff00] rounded-full animate-pulse" style={{ animationDelay: `${i * 300}ms`, boxShadow: "0 0 6px rgba(0,255,0,0.8)" }} />
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
          background: rgba(0,15,30,0.9);
          border: 1px solid #00f7ff;
          border-radius: 0.4rem;
          box-shadow: 0 0 10px rgba(0,247,255,0.2);
          padding: 0.6rem;
        }
        .input-box input,
        .input-box select {
          width: 100%;
          background: transparent;
          color: #cfcfcf;
          font-size: 0.85rem;
          outline: none;
          letter-spacing: 0.05em;
        }
        .input-box input::placeholder {
          color: rgba(0,247,255,0.5);
        }
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

export default RegisterPage;
