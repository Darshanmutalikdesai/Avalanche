import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import NavigationBar from "../layout/Common/Navbar";
import Logo from "../../assets/weblogo.svg";
import R2D2Image from "../../assets/R2D2.png";
import MegaEventVideo from "../../assets/megaevent_bg.mp4";

// Star Button Component
const StarButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative px-4 sm:px-6 py-2 sm:py-3 
        text-sm sm:text-base text-white font-semibold
        bg-gradient-to-r from-purple-600 to-pink-600
        rounded-lg shadow-lg
        transition-all duration-300 font-['Nasalization']
        ${isHovered ? "shadow-pink-500/60 shadow-2xl" : ""}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-700 ${
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
        <span>Explore</span>
      </div>
    </button>
  );
};

// HomePage Component
export default function HomePage() {
  const overlayRef = useRef(null);
  const navigate = useNavigate();
  const [launch, setLaunch] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal state

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

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

      {/* Hero Section */}
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

        {/* R2-D2 */}
        <div className="absolute inset-x-0 bottom-[15%] flex justify-center z-20">
          <div className="animate-slide">
            <img
              src={R2D2Image}
              alt="R2-D2"
              className="h-32 sm:h-40 w-auto drop-shadow-lg cursor-pointer 
                         hover:scale-110 transition-transform 
                         animate-float animate-wiggle animate-glow"
              onClick={() => setChatOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Mega Event Section */}
      <section
  id="mega-event"
  className="relative z-20 flex flex-col justify-between items-center w-full overflow-hidden h-[60vh] sm:h-[70vh] md:h-[90vh]"
>
  {/* Responsive Video */}
  <video
    className="absolute top-1/2 left-1/2 w-auto h-full min-w-full min-h-full transform -translate-x-1/2 -translate-y-1/2 object-contain"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src={MegaEventVideo} type="video/mp4" />
  </video>

  {/* Top Text */}
  <div className="relative z-10 flex flex-col items-center text-center mt-16 sm:mt-4 md:mt-4 space-y-4 px-4">
    <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold font-nasal drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
      MEGA EVENT
    </h2>
  </div>

  {/* Bottom Button */}
  <div className="relative z-10 mb-10 sm:mb-12 md:mb-16">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="
        px-8 py-4 sm:px-10 sm:py-5
        text-lg sm:text-xl font-semibold
        bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
        rounded-full shadow-lg shadow-pink-500/50
        text-white tracking-wide
        transition-all duration-300 hover:shadow-pink-400/70 hover:shadow-2xl
      "
      onClick={() => setShowModal(true)}
    >
      Register Now
    </motion.button>
  </div>
</section>



      {/* Modal */}
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
                onClick={() => navigate("/events/register-paper", { state: { eventName: "Mega Event" }})}
              >
                Register
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* About Section */}
      <section
        id="about"
        className="relative z-20 py-24 px-6 sm:px-12 md:px-24 lg:px-32 text-center bg-black/60 backdrop-blur-md border-t border-white/10"
      >
        <h2 className="text-4xl md:text-5xl text-white font-bold mb-6">
          About Avalanche
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl font-orbitron mx-auto leading-relaxed">
          Avalanche is a tech and cultural fest celebrating innovation,
          creativity, and collaboration. Each year, thousands of brilliant minds
          gather to showcase their ideas and ignite the spark of the future.
          From robotics to art, from AI to design — Avalanche unites them all.
        </p>
      </section>

      
      {/* Glances Section */}
      <section
        id="glances"
        className="relative z-20 py-24 px-6 sm:px-12 md:px-24 lg:px-32 text-center bg-gradient-to-b from-gray-900 to-black border-t border-white/10"
      >
        <h2 className="text-4xl md:text-5xl text-white font-bold mb-10">
          Avalanche '24 Glances
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Hackathon Highlights",
            "Robowars Showdown",
            "Gaming Arena",
            "Cultural Extravaganza",
            "Tech Talks & Panels",
            "Award Ceremony",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg hover:shadow-pink-500/40 transition-all"
            >
              <h3 className="text-xl font-semibold font-orbitron mb-2">{item}</h3>
              <p className="text-gray-300 text-sm">
                A glimpse into one of the most exciting events of Avalanche ‘24.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/70 border-t border-white/10 text-center py-6 text-gray-400 text-sm">
        <p>
          © {new Date().getFullYear()} Avalanche. All rights reserved | Tech team of KLS GIT
        </p>
      </footer>

      {/* CSS Animations */}
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
}
