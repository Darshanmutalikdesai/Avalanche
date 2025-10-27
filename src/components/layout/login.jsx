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

  // ✅ FIXED Register API - Matches backend exactly!
  const registerUser = async () => {
    setLoading(true);
    try {
      // Validate inputs
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("⚠️ Please enter a valid email address!");
        setLoading(false);
        return;
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        alert("⚠️ Please enter a valid 10-digit phone number!");
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        alert("⚠️ Password must be at least 6 characters long!");
        setLoading(false);
        return;
      }

      // ✅ CORRECTED PAYLOAD - Matches your backend schema
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        pNumber: formData.phone.trim(),                    // ✅ Backend expects 'pNumber'
        institute: formData.clgName,                       // ✅ Backend expects 'institute'
        rollNumber: formData.usn.trim().toUpperCase(),     // ✅ Backend expects 'rollNumber'
      };

      console.log("📤 Sending registration data:", payload);

      const response = await fetch(`http://localhost:5000/api/users/register`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("📥 Backend response:", data);
      
      if (response.ok) {
        alert("✅ Registration successful! Please check your email for OTP.");
        navigate("/otp", { state: { email: formData.email } });
      } else {
        alert(`❌ ${data.message || "Registration failed"}`);
        console.error("Registration error:", data);
      }
    } catch (error) {
      console.error("🔴 Network Error:", error);
      alert("⚠️ Cannot connect to server. Make sure backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login API
  const loginUser = async () => {
    setLoading(true);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("⚠️ Please enter a valid email address!");
        setLoading(false);
        return;
      }

      if (!formData.password) {
        alert("⚠️ Please enter your password!");
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:5000/api/users/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("payment", data.payment);
        alert("✅ Login successful!");
        navigate("/home");
      } else {
        alert(`❌ ${data.message || "Login failed"}`);
        console.error("Login error:", data);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("⚠️ Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (isSignUp) {
      if (
        !formData.name?.trim() ||
        !formData.email?.trim() ||
        !formData.password ||
        !formData.usn?.trim() ||
        !formData.clgName ||
        !formData.phone?.trim()
      ) {
        alert("⚠️ Please fill all required fields!");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("⚠️ Passwords do not match!");
        return;
      }
      registerUser();
    } else {
      if (!formData.email?.trim() || !formData.password) {
        alert("⚠️ Please enter both email and password!");
        return;
      }
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
                {isSignUp ? "REGISTER" : "LOGIN"}
              </h1>
              <p className="text-xs text-[#cfcfcf] mb-3 tracking-widest">
                {isSignUp ? "Create your Avalanche account" : "Access your account"}
              </p>
            </div>

            <div className="space-y-3">
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-box"
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleInputChange}
                className="input-box"
                required
              />

              {isSignUp && (
                <>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (10 digits) *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    maxLength="10"
                    pattern="[0-9]{10}"
                    className="input-box"
                    required
                  />
                  <select
                    name="clgName"
                    value={formData.clgName}
                    onChange={handleInputChange}
                    className="input-box"
                    required
                  >
                    <option value="">Select College *</option>
                    {colleges.map((college, idx) => (
                      <option key={idx} value={college}>
                        {college}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="usn"
                    placeholder="USN (Roll Number) *"
                    value={formData.usn}
                    onChange={handleInputChange}
                    className="input-box"
                    required
                  />
                </>
              )}

              <input
                type="password"
                name="password"
                placeholder={`Password ${isSignUp ? '(min 6 chars) *' : '*'}`}
                value={formData.password}
                onChange={handleInputChange}
                minLength={isSignUp ? "6" : undefined}
                className="input-box"
                required
              />

              {isSignUp && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password *"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input-box"
                  required
                />
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full p-3 mt-4 font-semibold rounded-lg transition-all duration-300 ${
                  loading 
                    ? "bg-gray-500 cursor-not-allowed" 
                    : "bg-[#ffcc00] hover:bg-[#ffd700] text-black"
                }`}
              >
                {loading ? "Processing..." : isSignUp ? "Register" : "Login"}
              </button>

              <button
                onClick={toggleMode}
                disabled={loading}
                className="mt-2 text-xs text-[#00f7ff] hover:text-[#ffcc00] underline transition-colors"
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
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          border: 1px solid #00f7ff;
          border-radius: 0.5rem;
          background: rgba(0,15,30,0.9);
          color: #cfcfcf;
          outline: none;
          transition: all 0.3s ease;
        }
        .input-box:focus {
          border-color: #ffcc00;
          box-shadow: 0 0 10px rgba(255, 204, 0, 0.3);
        }
        .input-box::placeholder { 
          color: rgba(0,247,255,0.5);
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;