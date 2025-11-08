import React, {useState,useEffect} from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "../layout/Common/Navbar";
import crowd from "../../assets/crowd-silouette.png";
import specsImg from "../../assets/f1-specs-diagram.png";
import F1SyncLogo from "../../assets/F1synclogo.png"
import race from "../../assets/bg_megaevent.png"

import {
  CpuChipIcon,
  FlagIcon,
  MapIcon,
  WrenchScrewdriverIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const MegaEventGuidelines = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  useEffect(() => {
        const checkAuth = () => {
          // Check for userId and user data to ensure user is logged in
          const userId = localStorage.getItem("userId");
          const userData = localStorage.getItem("user");
          const newLoginState = !!(userId && userData);
          
          if (newLoginState !== isLoggedIn) {
            setIsLoggedIn(newLoginState);
          }
        };
    
        checkAuth();
      }, [location, isLoggedIn]);

  return (
    <div className="relative min-h-screen text-white bg-black overflow-hidden font-['Orbitron']">
      {/* Navbar */}
      <div className="relative z-[60]">
        <NavigationBar />
      </div>

      {/* Background Image (race track) */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-black opacity-100"
        style={{
          backgroundImage: `url(${race})`,
          backgroundSize: "cover", // try "contain" if your image is smaller than screen
          imageRendering: "crisp-edges", // keeps it pixel-sharp
          backgroundAttachment: "fixed", // parallax feel
        }}
      />

      {/* Gradient overlay for contrast (instead of opacity blur) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-[1]" />

      {/* Subtle racing lane lines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_2px,transparent_2px,transparent_100px)] opacity-10 z-[2]" />

      {/* Crowd silhouettes (clearly visible) */}
      <div
        className="absolute bottom-0 left-0 w-full h-[18vh] bg-bottom bg-repeat-x opacity-80 z-[3]"
        style={{
          backgroundImage: `url(${crowd})`,
          backgroundSize: "contain",
        }}
      ></div>

      {/* Faint moving speed lines (kept subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12] overflow-hidden z-[4]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.25)_50%,transparent_100%)] bg-[length:200%_3px] animate-[slide_3s_linear_infinite]" />
      </div>

      {/* Finish Line Glow (soft and precise) */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-[#ff0000] via-[#fff] to-[#00ff00] opacity-80 blur-[0.5px] z-[5]" />


      {/* Main Content */}
      <div className="relative z-30 py-16 sm:py-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-20"
        >
          <motion.h2
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-xl sm:text-4xl lg:text-6xl font-extrabold font-nasal tracking-[0.3em] text-cyan-400 uppercase mb-3"
          >
            AVALANCHE'25
          </motion.h2>
                    
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center mb-4"
          >
            <img
              src={F1SyncLogo}
              alt="F1 Sync Logo"
              className="w-[400px] sm:w-[600px] md:w-[800px] lg:w-[1000px] drop-shadow-[0_0_25px_rgba(255,100,0,0.6)] hover:drop-shadow-[0_0_40px_rgba(255,150,0,0.9)] transition-all duration-500"
            />
          </motion.div>


          <p className="text-gray-200 text-lg sm:text-2xl lg:text-4xl md:text-xl italic font-nasal tracking-wide font-light">
            “ALGORITHM MEETS WHEELS”
          </p>

          <div className="mt-6 flex justify-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 ${i % 2 === 0 ? "bg-white" : "bg-gray-800"}`}
              ></div>
            ))}
          </div>
        </motion.div>

        {/* === Event Overview === */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative bg-gradient-to-br from-gray-900/80 via-cyan-900/10 to-gray-900/80 border-2 border-cyan-500/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-[0_0_30px_rgba(0,200,255,0.25)] mb-12"
        >
          <h2 className="flex items-center text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            <EyeIcon className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-cyan-400" />
            Event Overview
          </h2>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            <strong className="text-cyan-200">F1 SYNC</strong> is a multi-round competition
            testing your team’s technical, design, and racing skills. You will
            design, build, and present a scaled-down vehicle evaluated for
            innovation, efficiency, and on-track performance.
          </p>
        </motion.div>

        {/* === Vehicle Specifications === */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative bg-gradient-to-br from-gray-900/80 via-orange-900/10 to-gray-900/80 border-2 border-yellow-500/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-[0_0_30px_rgba(255,200,0,0.3)] mb-12 overflow-hidden"
        >
          {/* Decorative faint blueprint grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,0,0.05),transparent_60%)] opacity-30 pointer-events-none"></div>

          <h2 className="flex items-center text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent relative z-10">
            <WrenchScrewdriverIcon className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-yellow-400" />
            Vehicle Specifications
          </h2>

          <ul className="space-y-3 text-gray-300 text-base sm:text-lg mb-8 relative z-10">
            <li><span className="text-yellow-400">▸</span> <strong className="text-yellow-200">Max Width:</strong> 25 cm</li>
            <li><span className="text-yellow-400">▸</span> <strong className="text-yellow-200">Max Length:</strong> 35 cm</li>
            <li><span className="text-yellow-400">▸</span> <strong className="text-yellow-200">Chassis Extension:</strong> 45 cm</li>
            <li><span className="text-yellow-400">▸</span> <strong className="text-yellow-200">Max Height:</strong> 40% of vehicle length</li>
          </ul>

          <p className="text-gray-300 italic mb-6 relative z-10">
            No restrictions on motors, batteries, or other components.
          </p>

          {/* Vehicle blueprint / image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center mt-6 relative z-10"
          >
            <img
              src={specsImg}
              alt="Vehicle Specifications"
              className="w-full max-w-2xl object-contain rounded-lg border border-yellow-500/40 shadow-[0_0_25px_rgba(255,200,0,0.4)] hover:shadow-[0_0_60px_rgba(255,200,0,0.6)] transition-all duration-500"
            />
          </motion.div>
        </motion.div>

        {/* === Competition Rounds === */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative bg-gradient-to-br from-gray-900/80 via-purple-900/10 to-gray-900/80 border-2 border-pink-500/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-[0_0_30px_rgba(255,0,150,0.3)] mb-12"
        >
          <h2 className="flex items-center text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            <FlagIcon className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-pink-400" />
            Competition Rounds
          </h2>

          <div className="text-gray-300 space-y-6">
            <div>
              <h3 className="text-blue-300 text-2xl font-semibold">Round 1: Model Submission</h3>
              <p>Submit your vehicle design and technical report — show your creativity and precision.</p>
            </div>
            <div>
              <h3 className="text-green-300 text-2xl font-semibold">Round 2: Time Trials</h3>
              <p>Test your speed in both manual and autonomous laps. The Top 10 teams advance.</p>
            </div>
            <div>
              <h3 className="text-red-400 text-2xl font-semibold">Round 3: Final Race</h3>
              <p>The best teams battle head-to-head in the ultimate race to claim the F1 Sync title.</p>
            </div>
            <div>
              <p>Note: Please refer the RuleBook for more details.</p>
            </div>
          </div>
        </motion.div>

        {/* === Buttons === */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(255,80,80,0.9)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg md:text-xl rounded-full font-bold tracking-wide bg-gradient-to-r from-red-600 to-red-800 shadow-[0_0_25px_rgba(255,0,0,0.6)] border-2 border-red-400/40 hover:shadow-[0_0_50px_rgba(255,0,0,1)] transition-all"
          >
            CLOSE ✖
          </motion.button>

          <motion.a
  href="https://drive.google.com/uc?export=download&id=1aD07yhJQqLehTFkmbaQMzBPKcI7QPPtp"
  download
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.1, boxShadow: "0 0 35px rgba(0,200,255,0.9)" }}
  whileTap={{ scale: 0.95 }}
  className="w-full sm:w-auto px-10 sm:px-14 py-3 sm:py-4 text-base sm:text-lg md:text-2xl rounded-full font-extrabold tracking-wider bg-gradient-to-r from-[#00c6ff] to-[#0072ff] border-4 border-cyan-300 shadow-[0_0_25px_rgba(0,180,255,0.7)] hover:shadow-[0_0_60px_rgba(0,220,255,1)] transition-all flex justify-center gap-2"
>
  📘 DOWNLOAD RULEBOOK
</motion.a>

          <motion.button
            whileHover={{ scale: 1.12, boxShadow: "0 0 40px rgba(255,230,0,1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              navigate(isLoggedIn? "/events/register"
                  : "/auth", {
                state: { event: { eventId: "f1_sync", eventName: "F1 Sync" } },
              })
            }
            className="w-full sm:w-auto px-10 sm:px-14 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl rounded-full font-extrabold tracking-widest bg-gradient-to-r from-[#ff6b35] via-[#f7931e] to-[#ffd700] border-4 border-[#ffff00] shadow-[0_0_35px_rgba(255,200,0,0.8)] hover:shadow-[0_0_70px_rgba(255,230,0,1.2)] transition-all flex items-center justify-center gap-2"
          >
            🏁 REGISTER NOW
          </motion.button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
      `}</style>
    </div>
  );
};

export default MegaEventGuidelines;
