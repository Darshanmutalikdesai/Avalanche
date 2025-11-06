import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../layout/Common/Navbar";

const MegaEventGuidelines = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* ✅ Navbar stays on top */}
      <div className="relative z-[60]">
        <NavigationBar />
      </div>

      {/* ✅ Animated Background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(0,170,255,0.18),transparent_70%)] pointer-events-none"></div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse pointer-events-none"></div>

    {/* ✅ F1 Speed Lines */}
<div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://i.ibb.co/Jz2hVrq/speed-lines.png')] bg-cover animate-speedMotion"></div>


      {/* ✅ Responsive Container */}
      <div className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto">

        {/* ✅ Header */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider 
            bg-gradient-to-r from-[#f56729e4] via-[#925101] to-[#ffe600] bg-clip-text text-transparent 
            drop-shadow-[0_0_30px_rgba(0,150,255,0.8)] animate-pulse">
            F1 SYNC
          </h1>

          <p className="text-gray-300 mt-3 sm:mt-4 text-base sm:text-lg md:text-xl italic tracking-wide">
            High-Performance Engineering • Aerodynamics • Precision Racing
          </p>
        </motion.div>

        {/* ✅ Responsive Content Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-10 sm:space-y-12"
        >

          {/* ✅ Event Overview */}
          <div className="bg-gray-900/50 border border-cyan-500/30 backdrop-blur-xl p-6 sm:p-8 
                          rounded-3xl shadow-[0_0_25px_rgba(0,200,255,0.3)] 
                          transition-all duration-300 
                          hover:shadow-[0_0_45px_rgba(0,200,255,0.6)] 
                          hover:border-cyan-300/50">

            <h2 className="text-3xl sm:text-4xl font-bold mb-4 
                           bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent 
                           drop-shadow-[0_0_10px_rgba(0,200,255,0.7)]">
              Event Overview
            </h2>

            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              <strong className="text-cyan-200">F1 SYNC</strong> is a dynamic and challenging multi-round competition
              designed to test technical, design, and racing capabilities. Teams design,
              fabricate, and present a scaled-down vehicle under strict dimensions.
            </p>
          </div>

          {/* ✅ Vehicle Specifications */}
          <div className="bg-gray-900/50 border border-yellow-500/30 backdrop-blur-xl p-6 sm:p-8 
                          rounded-3xl shadow-[0_0_25px_rgba(255,200,0,0.25)]
                          hover:shadow-[0_0_45px_rgba(255,200,0,0.6)] hover:border-yellow-300/50 
                          transition-all duration-300">

            <h2 className="text-3xl sm:text-4xl font-bold mb-4 
                           bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent 
                           drop-shadow-[0_0_10px_rgba(255,200,0,0.7)]">
              Vehicle Specifications
            </h2>

            <ul className="space-y-2 sm:space-y-3 text-gray-300 text-base sm:text-lg">
              <li>✅ <strong>Max Width:</strong> 25 cm</li>
              <li>✅ <strong>Max Length:</strong> 35 cm <span>(Wheelbase)</span></li>
              <li>✅ <strong>Chassis Extension:</strong> 45 cm</li>
              <li>✅ <strong>Height Limit:</strong> 40% of length</li>
              <li>✅ Unlimited electronics & motors allowed</li>
            </ul>
          </div>

          {/* ✅ Competition Rounds */}
          <div className="bg-gray-900/50 border border-pink-500/30 backdrop-blur-xl p-6 sm:p-8 
                          rounded-3xl shadow-[0_0_25px_rgba(255,0,150,0.35)] 
                          hover:shadow-[0_0_45px_rgba(255,0,150,0.7)] hover:border-pink-400/50 
                          transition-all duration-300">

            <h2 className="text-3xl sm:text-4xl font-bold mb-6 
                           bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent 
                           drop-shadow-[0_0_10px_rgba(255,0,150,0.7)]">
              Competition Rounds
            </h2>

            {/* ROUND 1 */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl text-yellow-300 font-semibold mb-2">
                🔵 Round 1 — Model Submission (Day 1)
              </h3>
              <p className="text-gray-300 text-base sm:text-lg">
                Submit full design package including CAD, engineering analysis & report.
              </p>
            </div>

            {/* ROUND 2 */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl text-green-300 font-semibold mb-2">
                🟠 Round 2 — Time Trials (Day 2)
              </h3>
              <p className="text-gray-300 text-base sm:text-lg">
                Manual lap trial + optional autonomous trial for bonus.
              </p>
            </div>

            {/* ROUND 3 */}
            <div>
              <h3 className="text-2xl sm:text-3xl text-red-400 font-semibold mb-2">
                🔴 Round 3 — Final Race (Day 3)
              </h3>
              <p className="text-gray-300 text-base sm:text-lg">
                Top 10 teams race in a seed-based final showdown.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ✅ CTA BUTTONS — Fully Responsive */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">

          {/* CLOSE BUTTON */}
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(255,80,80,0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 
                       text-base sm:text-lg md:text-xl
                       rounded-full font-bold tracking-wide
                       bg-gradient-to-r from-red-600 to-red-800
                       shadow-[0_0_20px_rgba(255,0,0,0.6)]
                       border border-red-400/40
                       hover:shadow-[0_0_40px_rgba(255,0,0,1)]
                       transition-all"
          >
            CLOSE ✖
          </motion.button>

          {/* REGISTER BUTTON */}
          <motion.button
            whileHover={{ scale: 1.12, boxShadow: "0 0 25px rgba(255,230,0,0.9)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              navigate("/events/register", { state: { eventName: "F1 Sync" } })
            }
            className="w-full sm:w-auto px-10 sm:px-14 py-3 sm:py-4
                       text-lg sm:text-xl md:text-2xl
                       rounded-full font-extrabold tracking-widest
                       bg-gradient-to-r from-[#f56729e4] via-[#925101] to-[#ffe600]
                       border-4 border-[#ffff00]
                       shadow-[0_0_25px_rgba(255,200,0,0.7)]
                       hover:shadow-[0_0_50px_rgba(255,230,0,1)]
                       transition-all flex items-center justify-center gap-2"
          >
            🏁 REGISTER NOW
          </motion.button>

        </div>

      </div>
    </div>
  );
};

export default MegaEventGuidelines;
