import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react"; // ✅ Import Star icon
import BackgroundImage from "../../assets/back.jpg";
import NavigationBar from "../layout/Common/Navbar";
import Logo from "../../assets/weblogo.svg";
import RocketGif from "../../assets/growth.gif"; 

// ⭐ Star Button Component
const StarButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative px-6 py-3 text-white font-semibold
        bg-gradient-to-r from-purple-600 to-pink-600
        rounded-lg shadow-lg
        transition-all duration-300
        ${isHovered ? "shadow-pink-500/60 shadow-2xl" : ""}
      `}
    >
      {/* Shimmer effect */}
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
          size={20}
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

  // Animate overlay brightness
  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
      requestAnimationFrame(() => {
        overlayRef.current.style.transition = "background-color 2s ease-in-out";
        overlayRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
      });
    }
  }, []);

  // Handle rocket launch and redirect
  const handleLaunch = () => {
    setLaunch(true);
    setTimeout(() => {
      navigate("/auth");
    }, 1500); // redirect after animation
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden font-['Sweet_Rosetia_Sans']"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 w-full h-full z-[5]"
      ></div>

      {/* Navbar */}
      <div className="relative z-[60]">
        <NavigationBar />
      </div>

      {/* Hero Content */}
      <div className="relative z-[10] flex flex-col items-center justify-start min-h-screen text-center px-4 sm:px-6 md:px-8 lg:px-16 pt-6">
        
        {/* Logo */}
        <motion.img
          src={Logo}
          alt="Avalanche Logo"
          className="w-40 sm:w-56 md:w-72 lg:w-80 xl:w-96 mb-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-9xl text-white drop-shadow-lg font-bold -mt-6" 
          // ⬆️ moved higher (-mt-6 instead of -mt-2)
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <b>AVALANCHE'25</b>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white drop-shadow-md mb-8 max-w-3xl font-normal -mt-2"
          // ⬆️ pulled closer to title (-mt-2 instead of -mt-1)
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <b>Discover the infinite</b>
        </motion.p>

        {/* ✨ StarButton instead of Get Started */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        >
          <StarButton onClick={handleLaunch} />
        </motion.div>
      </div>
    </div>
  );
}
