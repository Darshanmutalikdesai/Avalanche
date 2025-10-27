import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get email passed from register page
  const email = location.state?.email;

  useEffect(() => {
    // Check if email exists
    if (!email) {
      alert("❌ Email not found. Please register again.");
      navigate("/auth");
      return;
    }
    console.log("📧 Email from registration:", email);
    inputRefs.current[0]?.focus();
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    const newOtp = pastedData.split("");
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  // ✅ FIXED - Verify OTP with extensive debugging
  const handleVerify = async () => {
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    if (!email) {
      setError("Email not found. Please register again.");
      return;
    }

    setLoading(true);
    setError("");
    
    // Normalize email exactly like registration does
    const normalizedEmail = email.trim().toLowerCase();
    
    console.log("=== OTP VERIFICATION DEBUG ===");
    console.log("📧 Original email from state:", email);
    console.log("📧 Normalized email:", normalizedEmail);
    console.log("🔢 OTP entered:", otpValue);
    console.log("📤 Sending payload:", JSON.stringify({ email: normalizedEmail, otp: otpValue }));

    try {
      const response = await fetch("http://localhost:5000/api/users/verify-otp", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          email: normalizedEmail, 
          otp: otpValue 
        }),
      });

      const data = await response.json();
      console.log("📥 Response status:", response.status);
      console.log("📥 Response data:", data);

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          alert("✅ Account verified successfully! You can now login.");
          navigate("/auth");
        }, 800);
      } else {
        console.error("❌ VERIFICATION FAILED");
        console.error("Error:", data.message);
        
        if (data.message === "User not found.") {
          console.error("\n🔍 DEBUGGING STEPS:");
          console.error("1. Check MongoDB - does user exist with email:", normalizedEmail);
          console.error("2. Open MongoDB Compass or use: db.users.findOne({ email: '" + normalizedEmail + "' })");
          console.error("3. Check if registration actually saved the user");
          console.error("4. Verify backend verifyOTPService is querying correctly");
          
          setError(`User not found with email: ${normalizedEmail}. Please register again.`);
        } else if (data.message.includes("expired")) {
          setError("OTP has expired. Please request a new one.");
        } else if (data.message.includes("Invalid")) {
          setError("Invalid OTP. Please check and try again.");
        } else {
          setError(data.message || "Verification failed.");
        }
      }
    } catch (err) {
      console.error("🔴 Network error:", err);
      setError("Cannot connect to server. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      alert("❌ Email not found. Please register again.");
      return;
    }

    setOtp(["", "", "", "", "", ""]);
    setError("");
    setSuccess(false);
    inputRefs.current[0]?.focus();

    const normalizedEmail = email.trim().toLowerCase();
    console.log("📤 Resending OTP to:", normalizedEmail);

    try {
      const response = await fetch("http://localhost:5000/api/users/resend-otp", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await response.json();
      console.log("📥 Resend response:", data);

      if (response.ok) {
        alert("📩 " + (data.message || "New OTP sent to your email!"));
      } else {
        alert("❌ " + (data.message || "Failed to resend OTP."));
      }
    } catch (error) {
      console.error("Resend error:", error);
      alert("⚠️ Server error. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#051320] via-[#0a1929] to-[#051320] flex items-center justify-center p-4"
      style={{ fontFamily: "Nasalization, sans-serif" }}
    >
      {/* Background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00f7ff] rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      <div
        className="relative w-full max-w-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`
            relative w-full bg-gradient-to-br from-[#0a1929] to-[#051320]
            p-8 sm:p-10 transition-all duration-500 ease-out
            ${isHovered ? "shadow-[0_0_40px_rgba(0,247,255,0.6)]" : "shadow-[0_0_20px_rgba(0,247,255,0.3)]"}
          `}
          style={{
            clipPath:
              "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)",
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div
              className={`
                w-24 h-24 rounded-full bg-[#00f7ff] border-4 border-[#00f7ff]
                shadow-[0_0_20px_rgba(0,247,255,0.6)] flex items-center justify-center
                transition-all duration-500
                ${isHovered ? "scale-110 shadow-[0_0_30px_rgba(0,247,255,0.9)]" : "scale-100"}
              `}
            >
              <svg
                className="w-12 h-12 text-[#051320]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#00f7ff] mb-2">VERIFY OTP</h1>
            <p className="text-sm text-[#b0f7ff] opacity-80">
              Enter the 6-digit code sent to
            </p>
            <p className="text-xs text-[#ffcc00] mt-1 font-semibold break-all px-4">{email}</p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`
                  w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold
                  bg-[rgba(0,247,255,0.05)] border-2
                  ${success ? "border-[#25D366]" : "border-[#00f7ff]"}
                  rounded-lg text-[#00f7ff] focus:outline-none focus:border-[#ffcc00]
                  focus:shadow-[0_0_15px_rgba(255,204,0,0.6)]
                  transition-all duration-300
                  ${success ? "shadow-[0_0_15px_rgba(37,211,102,0.6)]" : ""}
                `}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-xs sm:text-sm break-words">❌ {error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="text-center mb-4 p-3 bg-green-900/20 border border-green-500/50 rounded-lg">
              <p className="text-[#25D366] text-sm">✓ OTP Verified Successfully!</p>
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading || success}
            className={`
              w-full py-3 mb-4 bg-gradient-to-r from-[#00f7ff] to-[#00c4cc]
              text-[#051320] font-bold text-lg rounded-lg transition-all duration-300
              hover:shadow-[0_0_20px_rgba(0,247,255,0.8)] hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {loading ? "VERIFYING..." : success ? "VERIFIED ✓" : "VERIFY OTP"}
          </button>

          {/* Resend Link */}
          <div className="text-center">
            <button
              onClick={handleResend}
              disabled={loading || success}
              className="text-[#ffcc00] text-sm font-semibold hover:text-[#ffd700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Didn't receive code? <span className="underline">RESEND</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;