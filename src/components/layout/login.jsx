import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Common/Navbar";
import Footer from "./Common/footer";
import BackButton from "./Common/BackButton";
import AuthManager from "../../utils/authManager"; // IMPORT AUTH MANAGER

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = "333524285370-93g4b8ruu24q4q0l3jm3no14h9a8h9la.apps.googleusercontent.com";
const API_URL = "https://avalanche.git.edu";

const RegisterPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [googleToken, setGoogleToken] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    phone: "",
    clgName: "",
    usn: "",
  });

  const colleges = [
  "Alva's Pre-University College",
  "Angadi Institute of Technology and Management (AITM), Belagavi",
  "Angadi International School (English medium, Savagaon Road)",
  "Bandopanth Kulkarni Model High School (Camp)",
  "Bandopanth Kulkarni Model UPS Section (Camp)",
  "B B Hanji International School (English medium, Yamakanmardi)",
  "Bensons International Academy (English medium, Benakanhalli, Sangaon Road)",
  "Beynonsmith Kannada Lower Primary School (Camp)",
  "Bharatesh Central School (English medium, Halaga)",
  "Bharatesh Institute of Technology, Belagavi",
  "Bright Land English Medium School (Raibag Rural, Bekkeri Road)",
  "Brilliant Primary School (Kollagutti Hill, Nidasoshi Road, Ankale)",
  "C.T.E. Society’s International Public School (N.M. Road, Chikodi)",
  "Cantonment Board English HS (Camp)",
  "Cantonment Board English Medium School (Khanpur Road, Near Fish Market Camp)",
  "Cantonment Marathi High School (Camp)",
  "Dhanapal P. Khemalapure Central School (Bellad Bagewadi, Station Road)",
  "Dr. B.D. Jati Pre-University College",
  "Dr. N.A. Magadum Central Public School (Ankali, Tal Chikodi)",
  "Expert Science and Commerce PU College",
  "Gogte Pre-University College of Commerce",
  "Good Shepherd Central English Higher Primary School (Camp)",
  "Hirasugar Institute of Technology (HSIT), Belagavi",
  "Indus Altum International School (Belagavi)",
  "Islamiya Composite Junior College (Camp)",
  "Islamiya Girls High School (Aided) (Camp)",
  "Islamiya PU College (Camp)",
  "Islamiya Urdu High School (Camp)",
  "Jain College of Engineering (JCE), Belagavi",
  "Jain College of Engineering and Research (JCER), Udyambag, Belagavi",
  "Jyoti PU College (Club Road, Camp)",
  "Kalpavruksha Model School (Belagavi)",
  "Kannada High Primary School Mutenatti (Belagavi)",
  "Kannada High Primary School No.6 Konwal Galli (Camp)",
  "Kannada Higher Primary Girls School No.2 Maruti Galli (Camp)",
  "Kannada Higher Primary School Chandgad (Belagavi)",
  "Kannada Higher Primary School Gojage (Belagavi)",
  "Kannada Higher Primary School Kalkhamb (Belagavi)",
  "Kannada Higher Primary School No.12 Camp (Camp)",
  "Kannada Higher Primary School No.9 Kelkarbag (Camp)",
  "Kannada Higher Primary School Sulge (U) (Belagavi)",
  "Kannada Lower Primary School Devagynattii Dhamane (S) (Belagavi)",
  "Kannada Lower Primary School Hulenur Kalkhamb (Belagavi)",
  "Kannada Lower Primary School No.11 Mali Galli (Belagavi)",
  "Kendriya Vidyalaya No.2 (Camp)",
  "KLE Dr. M.S. Sheshgiri College of Engineering and Technology, Belagavi",
  "K.L.E. Society’s B. Kore Arts, Science & Commerce Pre-University College",
  "K.L.E. Society’s G.A. Composite Pre-University College",
  "K.L.E. Society’s Raja Lakhamagouda Pre-University Science College",
  "K.L.E. Society’s Shri S.M.S. Arts, Commerce & Science Pre-University College",
  "KLS Gogte Institute of Technology, Belagavi",
  "Mahaveer Jain Pre-University College",
  "Maratha Mandal Engineering College, Belagavi",
  "Marathi Higher Primary Cantonment School (Camp)",
  "Marathi Higher Primary School Malenatti (Belagavi)",
  "Marathi Higher Primary School No.28 Konwal Galli (Camp)",
  "Marathi Higher Primary School Vaghwade (Belagavi)",
  "Methodisy Jonvesli PU College (Fort Road)",
  "Model English High School B K Model Campus (Camp)",
  "Model English High School Fort (Camp)",
  "N S Pai Memorial Pre Primary & Primary School (Camp)",
  "Podar International School (Belagavi)",
  "Rastriya Military School (Camp)",
  "Ravi Shankar Vidya Mandir (Camp)",
  "S.G. Balekundri Institute of Technology (SGBIT), Belagavi",
  "Samata Kannada Lower Primary School Mahanetsh Nagar (Belagavi)",
  "Sangolli Rayanna Sainik School (Sangolli, Bhilhongala, Belagavi)",
  "S.D.M. Arts and Science Pre-University College",
  "S.R.N. Composite Pre-University College",
  "Shaikh College of Engineering and Technology (SCET), Belagavi",
  "Shri Annappa Swamy Pre-University College",
  "Shri Annasaheb Chudaman Pre-University College",
  "Shri Basavakalyan Pre-University College",
  "Shri Basaveshwar Pre-University College",
  "Shri Channabasaveshwar Pre-University College",
  "Shri Ganesh Pre-University College",
  "Shri Hanagal Kumaraswamy Pre-University College",
  "Shri Keshav Rao Pre-University College",
  "Shri Mahaveer Residential English Medium School (Raibag)",
  "Shri Raja Lakhamagouda Science Institute (PU Section)",
  "Shri Sai Pre-University College",
  "Shri Sharadchandra Pre-University College",
  "Shri Sharana Basaveshwar Pre-University College",
  "Shri Shivaji Pre-University College",
  "Shri Shivaji Pre-University College (K.T. Colony)",
  "Shri Shivayogi Pre-University College",
  "Shri Shivayogi Siddheshwar Pre-University College",
  "Shri Siddharth College of Arts & Science (PU Section)",
  "Shri Siddhalingeshwar Pre-University College",
  "Shri Siddheshwar Pre-University College",
  "Shri Tulsi Pre-University College",
  "Shri Vadiraj Pre-University College",
  "Shri Venkateshwara Pre-University College",
  "Shri Vittal Rao Desai Pre-University College",
  "St Anthony Kannada Higher Primary School (Fish Market)",
  "St. Anthony Kannada High School (Fish Market)",
  "St. Joseph Convent High School (Camp)",
  "St Joseph Girls English High School (Camp)",
  "St Joseph Girls English Higher Primary School (Camp)",
  "St Joseph Kannada Higher Primary School (Camp)",
  "St Josheph PU College Camp (Camp)",
  "St Mary High School (Camp)",
  "St. Marys Primary School (Camp)",
  "St Pauls English Upper Primary Boys School (Camp)",
  "St Pauls High School (Camp)",
  "St. Pauls Primary (Unaided) (Camp)",
  "St Xeviour PU College (Camp)",
  "Urdu High School Cantonment (Camp)",
  "Urdu Lower Primary School Doordarshan Nagar TV Centre (Belagavi)",
  "Urdu Lower Primary School No.4 Mujwar Galli (Belagavi)",
  "V.S.M. Institute of Technology, Nipani Tal - Chikodi",
  "Visvesvaraya Technological University, Belagavi",
  ];

  const spaceObjects = [
    { type: "planet", emoji: "🪐", size: 80, x: 15, y: 10 },
    { type: "planet", emoji: "🌍", size: 60, x: 85, y: 20 },
    { type: "moon", emoji: "🌙", size: 40, x: 10, y: 80 },
    { type: "satellite", emoji: "🛸", size: 50, x: 90, y: 70 },
    { type: "comet", emoji: "☄", size: 35, x: 50, y: 5 },
    { type: "asteroid", emoji: "🌑", size: 30, x: 20, y: 50 },
    { type: "star", emoji: "⭐", size: 25, x: 80, y: 85 },
    { type: "rocket", emoji: "🚀", size: 45, x: 60, y: 90 },
  ];

  // Check if user is already logged in
  useEffect(() => {
    // Check if session is still valid
    if (AuthManager.isAuthenticated()) {
      const userId = localStorage.getItem('userId');
      const avalancheId = localStorage.getItem('avalancheId');
      
      if (userId && avalancheId) {
        navigate("/user-portal");
      }
    } else {
      // Clear any stale data if session expired
      AuthManager.clearAuth();
    }
  }, [navigate]);

  // Animations Setup (keeping your existing code)
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);

    const newStars = Array.from({ length: 200 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 1,
    }));
    setStars(newStars);

    const shootingStarInterval = setInterval(() => {
      setShootingStars((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100,
          top: Math.random() * 50,
        },
      ]);
      setTimeout(() => {
        setShootingStars((prev) => prev.slice(1));
      }, 2000);
    }, 3000);

    return () => clearInterval(shootingStarInterval);
  }, []);

  // Floating parallax (keeping your existing code)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const floatingElements = document.querySelectorAll(".floating-object");
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      floatingElements.forEach((el, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (isOtherSelected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOtherSelected]);

  useEffect(() => {
    const handleClickOutside = () => setIsDropdownOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Input Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleManualInput = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, clgName: value }));
  };

  const handleSelect = (college) => {
    if (college === "Others") {
      setIsOtherSelected(true);
      setFormData({ ...formData, clgName: "" });
    } else {
      setIsOtherSelected(false);
      setFormData({ ...formData, clgName: college });
    }
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  // Handle Google OAuth Success
  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('🔐 Google Sign-In Success');
    setLoading(true);
    const token = credentialResponse.credential;
    
    try {
      const response = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      const data = await response.json();

      if (data.isNewUser) {
        // New user - show registration form
        setShowRegistrationForm(true);
        setUserEmail(data.email);
        setUserName(data.name);
        setGoogleToken(token);
        
        // ⭐ STORE TOKEN WITH EXPIRY
        AuthManager.setToken(token);
      } else {
        // Existing user - login successful
        // ⭐ STORE TOKEN WITH EXPIRY
        AuthManager.setToken(token);
        
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('avalancheId', data.avalancheId);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('payment', data.user.payment);

        window.dispatchEvent(new Event('authStateChanged'));
        
        alert(`✅ Welcome back! Your Avalanche ID: ${data.avalancheId}`);
        navigate("/user-portal");
      }
    } catch (error) {
      console.error('❌ Authentication error:', error);
      alert('⚠️ Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Complete Registration
  const completeRegistration = async () => {
    setLoading(true);
      const phoneRegex = /^[0-9]{10}$/;

      if (!phoneRegex.test(formData.phone)) {
        alert("⚠️ Please enter a valid 10-digit phone number!");
        setLoading(false);
        return;
      }

      if (!formData.clgName.trim()) {
        alert("⚠️ Please select or enter your college/school name!");
        setLoading(false);
        return;
      }

      if (!formData.usn.trim()) {
        alert("⚠️ Please enter your roll number!");
        setLoading(false);
        return;
      }

      {/*const response = await fetch(`${API_URL}/api/auth/register/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: googleToken,
          phone: formData.phone.trim(),
          schlclgName: formData.clgName.trim(),
          rollno: formData.usn.trim().toUpperCase()
        })
      });*/}

        
        alert(`Registrations CLosed!!`);

  };
return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>

      
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-slate-900 to-blue-950">

        <div className="relative z-[60]">
                <NavigationBar />
              </div>
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          
          @keyframes shootingStar {
            0% { transform: translateX(0) translateY(0); opacity: 1; }
            100% { transform: translateX(300px) translateY(300px); opacity: 0; }
          }
          
          @keyframes float {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
            50% { transform: translate(-50%, -50%) translateY(-20px); }
          }
          
          @keyframes rotate360 {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.5)); }
            50% { filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.8)); }
          }
          
          .animate-shimmer {
            animation: shimmer 3s infinite;
          }
          
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }

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

        

        {/* Enhanced star field */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animation: `twinkle ${star.duration}s ease-in-out infinite`,
                animationDelay: `${star.delay}s`,
                boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
              }}
            />
          ))}
        </div>

        {/* Shooting stars */}
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animation: 'shootingStar 2s ease-out forwards',
              boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
            }}
          />
        ))}

        {/* Nebula clouds */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDuration: '8s'}} />
          <div className="absolute top-40 right-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}} />
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDuration: '12s', animationDelay: '4s'}} />
          <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDuration: '9s', animationDelay: '1s'}} />
        </div>

        {/* Floating space objects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {spaceObjects.map((obj, idx) => (
            <div
              key={idx}
              className="floating-object absolute transition-transform duration-200 ease-out"
              style={{
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                fontSize: `${obj.size}px`,
                animation: `float ${15 + idx * 3}s ease-in-out infinite, rotate360 ${20 + idx * 5}s linear infinite`,
                animationDelay: `${idx * 0.5}s`,
                filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))',
              }}
            >
              {obj.emoji}
            </div>
          ))}
        </div>

        {/* Orbiting rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="absolute w-[800px] h-[800px] border border-cyan-500/10 rounded-full animate-spin-slow" style={{animationDuration: '60s'}} />
          <div className="absolute w-[1000px] h-[1000px] border border-purple-500/10 rounded-full animate-spin-slow" style={{animationDuration: '80s', animationDirection: 'reverse'}} />
          <div className="absolute w-[1200px] h-[1200px] border border-pink-500/10 rounded-full animate-spin-slow" style={{animationDuration: '100s'}} />
        </div>

        {/* Glowing planets */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#f56729e4] via-[#015f92] to-[#ffe600] opacity-30 blur-2xl animate-pulse" style={{animationDuration: '6s'}} />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 opacity-30 blur-2xl animate-pulse" style={{animationDuration: '8s', animationDelay: '1s'}} />
        <div className="absolute top-1/3 right-20 w-28 h-28 rounded-full bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 opacity-20 blur-2xl animate-pulse" style={{animationDuration: '7s', animationDelay: '2s'}} />

        {/* Main container */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-8 pb-10">
          <div
            className={`w-full max-w-md transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
            }`}
          >
            <div className="relative">
              {/* Animated glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#29aaf5c9] via-[#015f92] to-[#00e5ffb4] rounded-2xl blur-lg opacity-40 animate-pulse" />
              
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-slate-900/98 via-blue-950/98 to-slate-900/98 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden">
                
                {/* Top accent */}
                <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
                </div>
                
                {/* Header */}
                <div className="relative px-6 py-8 sm:pb-10 md:px-8 md:py-10">
                  {/* Rocket icon */}
                  <div className="flex justify-center mb-6 relative">
                    <div className="absolute w-32 h-32 border-2 border-cyan-500/20 rounded-full animate-spin-slow" style={{animationDuration: '10s'}} />
                    <div className="absolute w-40 h-40 border border-purple-500/20 rounded-full animate-spin-slow" style={{animationDuration: '15s', animationDirection: 'reverse'}} />
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#f56729e4] via-[#015f92] to-[#ffe600] border-4 border-[#ffff00] rounded-full blur-2xl opacity-60 animate-pulse" />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-[#f56729e4] via-[#015f92] to-[#ffe600] border-[#ffff00] rounded-full flex items-center justify-center border-2 border-cyan-300/50 shadow-2xl animate-bounce" style={{animationDuration: '3s'}}>
                        <span className="text-4xl">🚀</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-center mb-8 font-['Nasalization']">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#29e4f5] via-[#05d5d9] to-[#006aff] bg-clip-text text-transparent mb-2 tracking-wider">
                      {showRegistrationForm ? "COMPLETE PROFILE" : "AVALANCHE 2025"}
                    </h1>
                    <p className="text-cyan-300/80 text-sm tracking-widest font-light">
                      {showRegistrationForm ? "FINALIZE REGISTRATION" : "MISSION CONTROL CENTER"}
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" style={{animationDelay: '0.2s'}} />
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" style={{animationDelay: '0.4s'}} />
                    </div>
                    
                    {/* Decorative lines */}
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500" />
                      <div className="text-cyan-500">✦</div>
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500" />
                    </div>
                  </div>

                  {/* Content */}
                  {!showRegistrationForm ? (
                    // Google Sign In
                    <div className="space-y-6">
                      <p className="text-center text-cyan-300/70 text-sm tracking-wide">
                        Sign in with Google to access Avalanche 2025
                      </p>
                      
                      <div className="flex justify-center">
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={() => {
                            console.log('Login Failed');
                            alert('⚠️ Google Sign-In failed. Please try again.');
                          }}
                          theme="filled_blue"
                          size="large"
                          text="signin_with"
                          shape="rectangular"
                          width="300"
                        />
                      </div>
                    </div>
                  ) : (
                    // Registration Form
                    <div className="space-y-4">
                      {/* User Info Display */}
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-5">
                        <p className="text-cyan-300 text-sm mb-1">
                          <span className="text-cyan-500">Name:</span> {userName}
                        </p>
                        <p className="text-cyan-300 text-sm">
                          <span className="text-cyan-500">Email:</span> {userEmail}
                        </p>
                      </div>

                      {/* Phone Number */}
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-0 group-focus-within:opacity-40 blur transition duration-300" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="◉ PHONE NUMBER"
                          value={formData.phone}
                          onChange={handleInputChange}
                          maxLength="10"
                          className="input-box relative w-full px-4 py-3.5 bg-slate-950/90 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-500/50 focus:outline-none focus:border-cyan-400 focus:bg-slate-950 transition-all duration-300 text-sm tracking-wide"
                        />
                      </div>

                      {/* College Dropdown with Search */}
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-0 group-focus-within:opacity-40 blur transition duration-300" />
                        
                        {/* Display selected college or search input */}
                        {!isDropdownOpen ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsDropdownOpen(true);
                              setSearchQuery("");
                            }}
                            className="relative w-full px-4 py-3.5 bg-slate-950/90 border border-cyan-500/30 rounded-lg text-cyan-100 text-sm tracking-wide focus:outline-none focus:border-cyan-400 focus:bg-slate-950 transition-all duration-300 flex justify-between items-center"
                          >
                            {formData.clgName && !isOtherSelected
                              ? formData.clgName
                              : "◉ SELECT COLLEGE/SCHOOL"}
                            <span className="text-cyan-400 text-xs">▼</span>
                          </button>
                        ) : (
                          <input
                            type="text"
                            placeholder="🔍 Search college/school..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                            className="relative w-full px-4 py-3.5 bg-slate-950/90 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-500/50 focus:outline-none focus:border-cyan-400 focus:bg-slate-950 transition-all duration-300 text-sm tracking-wide"
                          />
                        )}

                        {/* Dropdown list with filtered results */}
                        {isDropdownOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-slate-950 border border-cyan-500/30 rounded-lg shadow-lg max-h-60 overflow-y-auto text-sm">
                            {/* Filtered college list */}
                            {colleges
                              .filter((college) =>
                                college.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .map((college, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => handleSelect(college)}
                                  className="px-4 py-2 text-cyan-100 hover:bg-cyan-500/20 cursor-pointer transition-colors"
                                >
                                  {college}
                                </div>
                              ))}

                            {/* Always visible "Others" option */}
                            <div
                              onClick={() => handleSelect("Others")}
                              className="px-4 py-2 text-cyan-100 hover:bg-cyan-500/20 cursor-pointer transition-colors border-t border-cyan-500/10"
                            >
                              Others
                            </div>

                            {/* Show "No results" message only when nothing matches */}
                            {colleges.filter((college) =>
                              college.toLowerCase().includes(searchQuery.toLowerCase())
                            ).length === 0 && (
                              <div className="px-4 py-3 text-cyan-300/50 text-center">
                                No colleges found. You can select "Others" to enter manually.
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Manual input - ONLY when Others is selected */}
                      {isOtherSelected && (
                        <div className="relative group mt-2">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-0 group-focus-within:opacity-40 blur transition duration-300" />
                          <input
                            ref={inputRef}
                            type="text"
                            placeholder="◉ ENTER YOUR COLLEGE/SCHOOL NAME"
                            value={formData.clgName}
                            onChange={handleManualInput}
                            className="relative w-full px-4 py-3.5 bg-slate-950/90 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-500/50 focus:outline-none focus:border-cyan-400 focus:bg-slate-950 transition-all duration-300 text-sm tracking-wide"
                          />
                        </div>
                      )}

                      {/* Roll Number */}
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-0 group-focus-within:opacity-40 blur transition duration-300" />
                        <input
                          type="text"
                          name="usn"
                          placeholder="◉ ROLL NO"
                          value={formData.usn}
                          onChange={handleInputChange}
                          className="input-box relative w-full px-4 py-3.5 bg-slate-950/90 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-cyan-500/50 focus:outline-none focus:border-cyan-400 focus:bg-slate-950 transition-all duration-300 text-sm tracking-wide"
                        />
                      </div>

                      {/* Submit button */}
                      <button
                        onClick={completeRegistration}
                        disabled={loading}
                        className={`relative w-full mt-6 py-4 rounded-lg font-bold text-sm tracking-widest overflow-hidden group font-['Nasalization'] ${
                          loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#f56729e4] via-[#015f92] to-[#ffe600] border-4 border-[#ffff00] transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#f56729e4] via-[#015f92] to-[#ffe600] border-4 border-[#ffff00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <span className="relative text-white drop-shadow-lg flex items-center justify-center gap-2">
                          {loading ? (
                            <>
                              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              PROCESSING...
                            </>
                          ) : (
                            <>
                              <span>🚀</span>
                              COMPLETE REGISTRATION
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Status */}
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm">
                      <div className="relative">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                        <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                      </div>
                      <span className="text-green-400 text-xs tracking-widest font-semibold">SECURE CONNECTION</span>
                    </div>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="absolute bottom-[0.3rem] right-6 sm:right-8 z-[120]">
        <BackButton />
      </div>
      </div>

      <Footer />

    </GoogleOAuthProvider>
    
  );
};

export default RegisterPage;
