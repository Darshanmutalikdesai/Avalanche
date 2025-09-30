import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import BackgroundImage from "../../assets/back.jpg";
import NavigationBar from "../layout/Common/Navbar";
import Logo from "../../assets/weblogo.svg"; // <-- Add your logo here

export default function HomePage() {
  const overlayRef = useRef(null);

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
      <div className="relative z-[10] flex flex-col items-center justify-start min-h-screen text-center px-4 sm:px-6 md:px-8 lg:px-16 pt-6 sm:pt-8 md:pt-10">
        
        {/* Logo with Framer Motion animation */}
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
          className="text-3xl sm:text-4xl md:text-5xl lg:text-9xl text-white drop-shadow-lg mb-0 font-bold -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <b>AVALANCHE'25</b>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white drop-shadow-md mb-8 sm:mb-10 md:mb-12 max-w-3xl font-normal -mt-1 sm:-mt-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <b>Discover the infinite</b>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        >
          <Link
            to="/auth"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-blue-500 text-white rounded-lg shadow-lg text-base sm:text-lg md:text-xl hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300 font-semibold"
          >
            <b>Get Started</b>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}