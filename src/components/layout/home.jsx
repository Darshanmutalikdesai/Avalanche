import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import NavigationBar from "../layout/Common/Navbar";
import Logo from "../../assets/weblogo.svg";
import R2D2Image from "../../assets/R2D2.png";

// ⭐ Star Button Component
const StarButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative px-4 sm:px-6 py-2 sm:py-3 
        text-sm sm:text-base text-white font-semibold
        bg-gradient-to-r from-purple-600 to-pink-600
        rounded-lg shadow-lg
        transition-all duration-300 font-['Nasalization']
        ${isHovered ? "shadow-pink-500/60 shadow-2xl" : ""}
      `}
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

export default function HomePage() {
  const overlayRef = useRef(null);
  const navigate = useNavigate();
  const [launch, setLaunch] = useState(false);

  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  // Send message
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

  // Stars
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

  // Overlay
  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
      requestAnimationFrame(() => {
        overlayRef.current.style.transition = "background-color 2s ease-in-out";
        overlayRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
      });
    }
  }, []);

  // Launch
  const handleLaunch = () => {
    setLaunch(true);
    setTimeout(() => {
      navigate("/auth");
    }, 1500);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden font-['Nasalization']"
      style={{
        background: "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}
    >
      {/* Stars */}
      <div id="star-container" className="stars absolute w-full h-full"></div>

      {/* Overlay */}
      <div ref={overlayRef} className="absolute top-0 left-0 w-full h-full z-[5]" />

      {/* Navbar */}
      <div className="relative z-[60]">
        <NavigationBar />
      </div>

      {/* Hero Section */}
      <div
        className="
          relative z-[10] flex flex-col items-center 
          justify-start sm:justify-center md:justify-center lg:justify-center
          min-h-screen text-center 
          px-4 sm:px-6 md:px-8 lg:px-16
          pt-[25%] sm:pt-6 md:pt-0
        "
      >
        <motion.img
          src={Logo}
          alt="Avalanche Logo"
          className="w-40 xs:w-44 sm:w-40 md:w-56 lg:w-72 xl:w-80 mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.h1
          className="text-4xl xs:text-5xl sm:text-3xl md:text-5xl lg:text-9xl text-white drop-shadow-lg font-bold mt-2 sm:-mt-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <b>A V A L A N C H E '2 5</b>
        </motion.h1>
        <motion.p
          className="text-lg xs:text-xl sm:text-base md:text-lg lg:text-2xl text-white drop-shadow-md mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-2xl font-normal"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <b>DISCOVER THE INFINITE</b>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        >
          <StarButton onClick={handleLaunch} />
        </motion.div>
      </div>

      {/* R2-D2 */}
      <div className="absolute inset-x-0 bottom-[20%] sm:bottom-10 md:bottom-8 flex justify-center z-20">
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

      {/* Chatbot */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
                R2
              </div>
              <span className="font-semibold">R2-D2 Assistant</span>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white hover:text-gray-200 text-xl font-bold"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ Animations + Font Face */}
      <style jsx>{`
        @font-face {
          font-family: 'Nasalization';
          src: url('/src/assets/fonts/NASALIZA.TTF') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

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
          0% { transform: translateX(-150px); }
          100% { transform: translateX(100vw); }
        }
        .animate-slide { animation: slide 30s linear infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          75% { transform: rotate(-2deg); }
        }
        .animate-wiggle { animation: wiggle 4s ease-in-out infinite; }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 6px #3b82f6); }
          50% { filter: drop-shadow(0 0 16px #2563eb); }
        }
        .animate-glow { animation: glow 2.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
