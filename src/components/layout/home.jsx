import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BackgroundImage from "../../assets/back.jpg";
import NavigationBar from "../layout/Common/Navbar";

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
      <div className="relative z-[10] flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 lg:px-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-9xl text-white drop-shadow-lg mb-4 sm:mb-6 md:mb-8 font-bold">
          <b>AVALANCHE'25</b>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white drop-shadow-md mb-6 sm:mb-8 md:mb-10 max-w-3xl font-normal">
          <b>Discover the infinite</b>
        </p>
        <Link
          to="/auth"
          className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-blue-500 text-white rounded-lg shadow-lg text-base sm:text-lg md:text-xl hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300 font-semibold"
        >
          <b>Get Started</b>
        </Link>
      </div>
    </div>
  );
}
