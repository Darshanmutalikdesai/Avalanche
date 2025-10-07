import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom";


const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('');
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
    
    // Focus last filled input
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    // Simulate verification
    setSuccess(true);
    setTimeout(() => {
      alert(`OTP Verified: ${otpValue}`);
    }, 500);
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    setSuccess(false);
    inputRefs.current[0]?.focus();
    // Simulate resend
    alert('OTP has been resent!');
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#051320] via-[#0a1929] to-[#051320] flex items-center justify-center p-4"
      style={{ fontFamily: 'Nasalization, sans-serif' }}
    >
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00f7ff] rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
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
            relative w-full
            bg-gradient-to-br from-[#0a1929] to-[#051320]
            p-8 sm:p-10
            transition-all duration-500 ease-out
            ${isHovered ? 'shadow-[0_0_40px_rgba(0,247,255,0.6)]' : 'shadow-[0_0_20px_rgba(0,247,255,0.3)]'}
          `}
          style={{
            clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)'
          }}
        >
          {/* Logo Circle */}
          <div className="flex justify-center mb-8">
            <div
              className={`
                w-24 h-24 rounded-full
                bg-[#00f7ff]
                border-4 border-[#00f7ff]
                shadow-[0_0_20px_rgba(0,247,255,0.6)]
                flex items-center justify-center
                transition-all duration-500
                ${isHovered ? 'scale-110 shadow-[0_0_30px_rgba(0,247,255,0.9)]' : 'scale-100'}
              `}
            >
              <svg className="w-12 h-12 text-[#051320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#00f7ff] drop-shadow-[0_0_15px_rgba(0,247,255,0.8)] mb-2">
              VERIFY OTP
            </h1>
            <p className="text-sm text-[#b0f7ff] opacity-80">
              Enter the 6-digit code sent to your device
            </p>
          </div>

          {/* OTP Input Fields */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`
                  w-12 h-14 sm:w-14 sm:h-16
                  text-center text-2xl font-bold
                  bg-[rgba(0,247,255,0.05)]
                  border-2 ${success ? 'border-[#25D366]' : 'border-[#00f7ff]'}
                  rounded-lg
                  text-[#00f7ff]
                  focus:outline-none focus:border-[#ffcc00] focus:shadow-[0_0_15px_rgba(255,204,0,0.6)]
                  transition-all duration-300
                  ${success ? 'shadow-[0_0_15px_rgba(37,211,102,0.6)]' : ''}
                `}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center mb-4">
              <p className="text-red-400 text-sm drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                {error}
              </p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="text-center mb-4">
              <p className="text-[#25D366] text-sm drop-shadow-[0_0_8px_rgba(37,211,102,0.6)]">
                ✓ OTP Verified Successfully!
              </p>
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={success}
            className={`
              w-full py-3 mb-4
              bg-gradient-to-r from-[#00f7ff] to-[#00c4cc]
              text-[#051320] font-bold text-lg
              rounded-lg
              transition-all duration-300
              hover:shadow-[0_0_20px_rgba(0,247,255,0.8)]
              hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed
              ${success ? 'opacity-50' : ''}
            `}
          >
            {success ? 'VERIFIED' : 'VERIFY OTP'}
          </button>

          {/* Resend Link */}
          <div className="text-center">
            <button
              onClick={handleResend}
              className="text-[#ffcc00] text-sm font-semibold hover:text-[#ffd700] transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,204,0,0.6)]"
            >
              Didn't receive code? RESEND
            </button>
          </div>

          {/* Diamond Cut Border Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
              boxShadow: 'inset 0 0 0 2px #00f7ff'
            }}
          ></div>

          {/* Corner Accents */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ffcc00', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ff9900', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            
            {/* Top Left */}
            <line x1="0" y1="20" x2="20" y2="0" stroke="url(#goldGradient)" strokeWidth="3" />
            <line x1="0" y1="20" x2="0" y2="5" stroke="url(#goldGradient)" strokeWidth="2" />
            <line x1="20" y1="0" x2="5" y2="0" stroke="url(#goldGradient)" strokeWidth="2" />
            
            {/* Top Right */}
            <line x1="100%" y1="20" x2="calc(100% - 20px)" y2="0" stroke="url(#goldGradient)" strokeWidth="3" />
            <line x1="100%" y1="20" x2="100%" y2="5" stroke="url(#goldGradient)" strokeWidth="2" />
            <line x1="calc(100% - 20px)" y1="0" x2="calc(100% - 5px)" y2="0" stroke="url(#goldGradient)" strokeWidth="2" />
            
            {/* Bottom Left */}
            <line x1="0" y1="calc(100% - 20px)" x2="20" y2="100%" stroke="url(#goldGradient)" strokeWidth="3" />
            <line x1="0" y1="calc(100% - 20px)" x2="0" y2="calc(100% - 5px)" stroke="url(#goldGradient)" strokeWidth="2" />
            <line x1="20" y1="100%" x2="5" y2="100%" stroke="url(#goldGradient)" strokeWidth="2" />
            
            {/* Bottom Right */}
            <line x1="100%" y1="calc(100% - 20px)" x2="calc(100% - 20px)" y2="100%" stroke="url(#goldGradient)" strokeWidth="3" />
            <line x1="100%" y1="calc(100% - 20px)" x2="100%" y2="calc(100% - 5px)" stroke="url(#goldGradient)" strokeWidth="2" />
            <line x1="calc(100% - 20px)" y1="100%" x2="calc(100% - 5px)" y2="100%" stroke="url(#goldGradient)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;