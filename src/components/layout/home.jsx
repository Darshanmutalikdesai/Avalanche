import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import BackgroundVideo from "../../assets/home.mp4";
import NavigationBar from "../layout/Common/Navbar";

export default function HomePage() {
  const overlayRef = useRef(null);
  const videoRef = useRef(null);

  // Dynamically load Titillium Web font
  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700&display=swap";
    fontLink.rel = "stylesheet";
    if (!document.querySelector(`link[href="${fontLink.href}"]`)) {
      document.head.appendChild(fontLink);
    }
  }, []);

  // Animate overlay brightness
  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.style.transition = "background-color 2s ease-in-out";
      overlayRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    }
  }, []);

  // Handle video loaded metadata to start from 7th second
  const handleVideoLoaded = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      videoRef.current.currentTime = 7; // start from 7 seconds
    }
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ fontFamily: "'Titillium Web', sans-serif" }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedMetadata={handleVideoLoaded}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={BackgroundVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{ backgroundColor: "rgba(0,0,0,0)" }}
      ></div>

      {/* Navbar */}
      <div className="relative z-20">
        <NavigationBar />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 lg:px-16">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg mb-4 sm:mb-6 md:mb-8"
          style={{ fontWeight: 700 }}
        >
          Welcome to Avalanche
        </h1>
        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white drop-shadow-md mb-6 sm:mb-8 md:mb-10 max-w-3xl"
          style={{ fontWeight: 400 }}
        >
          Your mission starts here. Explore the experience.
        </p>
        <Link
          href="/auth"
          className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-blue-500 text-white rounded-lg shadow-lg text-base sm:text-lg md:text-xl hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300 font-semibold"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
