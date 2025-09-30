import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react"; // ✅ Import Star icon
import BackgroundImage from "../../assets/back.jpg";
import NavigationBar from "../layout/Common/Navbar";
import Logo from "../../assets/weblogo.svg";

// ⭐ Star Button Component
const StarButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4
        text-sm sm:text-base md:text-lg lg:text-xl
        text-white font-semibold
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
    }, 1500);
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
      <div className="relative z-[10] flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 lg:px-16 pt-10 sm:pt-12 lg:pt-16">
        
        {/* Logo */}
        <motion.img
          src={Logo}
          alt="Avalanche Logo"
          className="w-28 sm:w-40 md:w-56 lg:w-72 xl:w-80 mb-2 sm:mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Title */}
        <motion.h1
          className="text-[clamp(2rem,6vw,6rem)] text-white drop-shadow-lg font-bold -mt-4 sm:-mt-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <b>AVALANCHE'25</b>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[clamp(1rem,2.5vw,2rem)] text-white drop-shadow-md mb-6 sm:mb-8 max-w-2xl font-normal -mt-1 sm:-mt-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <b>Discover the infinite</b>
        </motion.p>

        {/* ✨ StarButton */}
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
