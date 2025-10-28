// src/components/pages/HomePage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import NavigationBar from "../layout/Common/Navbar";
import Logo from "../../assets/weblogo.svg";
import MegaEventVideo from "../../assets/megaevent_bg.mp4";
import Footer from "../layout/Common/footer";
import NotifyPopup from "./Common/NotifyPopup";
import chemshow from "../../assets/ChemicalShowdown.PNG";
import hackathon from "../../assets/Hackathon.PNG";
import robowars from "../../assets/RoboWars.PNG";


// ⭐ Star Button Component
const StarButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
    <button
      onClick={() => setShowPopup(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative px-4 sm:px-6 py-2 sm:py-3 
        text-sm sm:text-base text-white font-semibold
        bg-gradient-to-r from-purple-600 to-pink-600
        rounded-lg shadow-lg
        transition-all duration-300 font-['Nasalization']
        ${isHovered ? "shadow-pink-800/60 shadow-2xl" : ""}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent opacity-0 transition-opacity duration-700 ${
          isHovered ? "opacity-20" : ""
        }`}
        style={{
          transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          transition: "transform 0.7s, opacity 0.7s",
        }}
      />
      <div className="flex items-center gap-2 relative z-10">
        <Star
          className={`transition-all duration-500 ${
            isHovered ? "rotate-180 scale-110 fill-white" : ""
          }`}
          size={18}
        />
        <span>Notify Me</span>
      </div>
    </button>

    <NotifyPopup show={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
};

// 🏠 HomePage Component
export default function HomePage() {
  const overlayRef = useRef(null);
  const navigate = useNavigate();
  const [launch, setLaunch] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // 💬 Chat handling
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages([...messages, { sender: "user", text: inputMessage }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Beep boop! R2-D2 at your service 🤖" },
      ]);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  // 🌟 Star background
  useEffect(() => {
    const numStars = 120;
    const container = document.getElementById("star-container");
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";
      star.style.animationDelay = Math.random() * 5 + "s";
      const size = Math.random() * 2 + 1;
      star.style.width = size + "px";
      star.style.height = size + "px";
      container.appendChild(star);
    }
  }, []);

  // 🌌 Overlay fade-in effect
  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
      requestAnimationFrame(() => {
        overlayRef.current.style.transition = "background-color 2s ease-in-out";
        overlayRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
      });
    }
  }, []);

  const handleLaunch = () => {
    setLaunch(true);
    setTimeout(() => {
      navigate("/auth");
    }, 1500);
  };

  return (
    <div
      className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}
    >
      <div id="star-container" className="stars absolute w-full h-full"></div>
      <div ref={overlayRef} className="absolute top-0 left-0 w-full h-full z-[5]" />
      <div className="relative z-[60]">
        <NavigationBar />
      </div>

      {/* 🚀 Hero Section */}
      <div className="relative z-[10] flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20">
        <motion.img
          src={Logo}
          alt="Avalanche Logo"
          className="w-40 sm:w-56 lg:w-72 mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.h1
          className="text-5xl md:text-8xl text-white drop-shadow-lg font-nasal font-bold"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          A V A L A N C H E '25
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-white drop-shadow-md mb-6 font-orbitron"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          DISCOVER THE INFINITE
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <StarButton onClick={handleLaunch} />
        </motion.div>
      </div>

      {/* 🎬 Mega Event Section */}
      <section
        id="mega-event"
        className="relative z-20 flex flex-col justify-between items-center w-full overflow-hidden h-[60vh] sm:h-[70vh] md:h-[90vh]"
      >
        <video
          className="absolute top-1/2 left-1/2 w-auto h-full min-w-full min-h-full transform -translate-x-1/2 -translate-y-1/2 object-contain"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={MegaEventVideo} type="video/mp4" />
        </video>

        <div className="relative z-10 flex flex-col items-center text-center mt-16 sm:mt-4 md:mt-4 space-y-4 px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold font-nasal drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
            MEGA EVENT
          </h2>
        </div>

        {/* ⚡ F1 Turbo Flame Button with Sparks */}
<div className="relative z-10 mb-10 sm:mb-12 md:mb-16 flex justify-center">
  <motion.button
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setShowModal(false)}
    className="relative overflow-hidden
      px-14 py-3 rounded-full
      text-white font-extrabold text-2xl tracking-widest uppercase
      bg-gradient-to-r from-[#f56729e4] via-[#925101] to-[#ffe600]
      border-4  border-[#ffff00]
      shadow-[0_0_40px_rgba(255,120,0,0.9)]
      transition-all duration-300"
  >
    <span className="relative z-20">🏁 Coming Soon...</span>

    {/* 🔥 Neon Blue Flames */}
    <span className="absolute inset-x-0 bottom-0 h-[160%] opacity-80 blur-[10px]
                     bg-[radial-gradient(ellipse_at_bottom,_rgba(0,255,255,0.8),_transparent_70%)]
                     animate-flameUp"></span>

    <span className="absolute inset-x-0 bottom-0 h-[180%] opacity-60 blur-[12px]
                     bg-[radial-gradient(ellipse_at_bottom,_rgba(0,180,255,0.7),_transparent_75%)]
                     animate-flameFlicker"></span>

    <span className="absolute inset-x-0 bottom-0 h-[200%] opacity-50 blur-[16px]
                     bg-[radial-gradient(ellipse_at_bottom,_rgba(0,140,255,0.6),_transparent_80%)]
                     animate-flameWave"></span>

    {/* 💥 Sparks Layer */}
    <span className="absolute bottom-0 left-1/2 w-full h-full pointer-events-none animate-sparks">
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="absolute w-[3px] h-[3px] rounded-full bg-cyan-400 opacity-80"
          style={{
            left: `${50 + (Math.random() * 80 - 40)}%`,
            bottom: "0%",
            animationDelay: `${i * 0.3}s`,
          }}
        ></span>
      ))}
    </span>

    {/* 🔵 Outer Glow */}
    <span className="absolute inset-0 rounded-full
                     bg-[radial-gradient(circle,_rgba(0,255,255,0.15),_transparent_60%)]
                     animate-turboPulse"></span>

    {/* Internal Styles */}
    <style jsx>{`
      /* 🔥 Flame animations */
      @keyframes flameUp {
        0% { transform: translateY(10%) scaleY(0.8); opacity: 0.7; }
        50% { transform: translateY(-5%) scaleY(1.1); opacity: 1; }
        100% { transform: translateY(10%) scaleY(0.8); opacity: 0.7; }
      }

      @keyframes flameFlicker {
        0%, 100% { opacity: 0.6; transform: translateY(0px); }
        25% { opacity: 0.9; transform: translateY(-3px); }
        50% { opacity: 0.7; transform: translateY(-1px); }
        75% { opacity: 1; transform: translateY(-2px); }
      }

      @keyframes flameWave {
        0% { transform: skewX(5deg) scaleY(1); opacity: 0.6; }
        25% { transform: skewX(-5deg) scaleY(1.05); opacity: 0.8; }
        50% { transform: skewX(4deg) scaleY(0.95); opacity: 0.7; }
        75% { transform: skewX(-4deg) scaleY(1.1); opacity: 0.9; }
        100% { transform: skewX(5deg) scaleY(1); opacity: 0.6; }
      }

      @keyframes turboPulse {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(1.05); }
      }

      /* 💥 Spark animations */
      @keyframes sparks {
        0% {
          transform: translateY(0) scale(1);
          opacity: 1;
          filter: blur(0px);
        }
        80% {
          transform: translateY(-120px) scale(0.5);
          opacity: 0.8;
          filter: blur(1px);
        }
        100% {
          transform: translateY(-140px) scale(0);
          opacity: 0;
          filter: blur(2px);
        }
      }

      .animate-flameUp { animation: flameUp 2.2s ease-in-out infinite; }
      .animate-flameFlicker { animation: flameFlicker 1.1s ease-in-out infinite; }
      .animate-flameWave { animation: flameWave 3s ease-in-out infinite; }
      .animate-turboPulse { animation: turboPulse 2.5s ease-in-out infinite; }

      /* 🔹 Spark movement — only visible on hover */
      .animate-sparks span {
        animation: sparks 1.8s ease-out infinite;
        opacity: 0;
      }

      .group:hover .animate-sparks span {
        opacity: 1;
      }
    `}</style>
  </motion.button>
</div>

      </section>

      {/* 📜 Modal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 text-white rounded-2xl p-8 w-11/12 max-w-xl relative"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
          >
            <h3 className="text-2xl font-bold mb-4">Event Guidelines</h3>
            <p className="mb-6 text-gray-300 leading-relaxed">
              1. Follow the schedule strictly.<br />
              2. Maintain decorum and discipline.<br />
              3. Bring your ID and registration proof.<br />
              4. Respect other participants and staff.<br />
              5. Enjoy and explore all events!
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg shadow-lg text-white transition hover:scale-105"
                onClick={() =>
                  navigate("/events/register-paper", {
                    state: { eventName: "Mega Event" },
                  })
                }
              >
                Register
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ℹ️ About Section */}
      <section
        id="about"
        className="relative z-20 py-24 px-6 sm:px-12 md:px-24 lg:px-32 text-center bg-black/60 backdrop-blur-md border-t border-white/10 overflow-hidden"
      >
        {/* Snowfall Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 text-white opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                animation: `fall ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${10 + Math.random() * 10}px`,
              }}
            >
              ❄
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes fall {
            0% {
              transform: translateY(-10vh) rotate(0deg);
            }
            100% {
              transform: translateY(110vh) rotate(360deg);
            }
          }
        `}</style>

        <h2 className="text-5xl md:text-6xl text-white font-bold mb-6">
          About Avalanche
        </h2>
        <p className="text-gray-300 text-xl max-w-8xl font-orbitron mx-auto leading-relaxed">
          Avalanche is a tech and cultural fest celebrating innovation,
          creativity, and collaboration. Each year, thousands of brilliant minds
          gather to showcase their ideas and ignite the spark of the future.
          From robotics to art, from AI to design — Avalanche unites them all.
        </p>
      </section>

      {/* 🎥 Glances Section */}
      <section
        id="glances"
        className="relative z-20 py-24 px-6 sm:px-12 md:px-24 lg:px-32 text-center bg-gradient-to-b from-gray-900 to-black border-t border-white/10"
      >
        <h2 className="text-4xl md:text-5xl text-white font-bold mb-10">
          Avalanche '24 Glances
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            ["Hackathon", hackathon],
            ["Robowars Showdown", robowars],
            ["Chemical Showdown", chemshow],
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg hover:shadow-pink-500/40 transition-all"
            >
              <img
                src={item[1]}
                alt={item[0]}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold font-orbitron mb-2">
                {item[0]}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🧩 Footer */}
      <Footer />

      {/* 🌟 Starfield Animation */}
      <style>{`
        .stars .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
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
          @keyframes slide { 0% { transform: translateX(-200px); } 100% { transform: translateX(calc(100vw + 200px)); } } .animate-slide { animation: slide 30s linear infinite; } @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } } .animate-float { animation: float 3s ease-in-out infinite; } @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(2deg); } 75% { transform: rotate(-2deg); } } .animate-wiggle { animation: wiggle 4s ease-in-out infinite; } @keyframes glow { 0%, 100% { filter: drop-shadow(0 0 6px #3b82f6); } 50% { filter: drop-shadow(0 0 16px #2563eb); } } .animate-glow { animation: glow 2.5s ease-in-out infinite; } }
      `}</style>
    </div>
  );
}
