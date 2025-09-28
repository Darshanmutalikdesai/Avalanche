import React, { useEffect } from "react";
import BackgroundVideo from "../../assets/home.mp4";
import NavigationBar from "./Common/Navbar";

export default function HomePage() {
  // Dynamically load Titillium Web font
  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden font-sans"
      style={{ fontFamily: "'Titillium Web', sans-serif" }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={BackgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10"></div>

      {/* Navbar */}
      <div className="relative z-20">
        <NavigationBar />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 lg:px-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-4 sm:mb-6 md:mb-8">
          Welcome to Avalanche
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white drop-shadow-md mb-6 sm:mb-8 md:mb-10 max-w-3xl">
          Your mission starts here. Explore the experience.
        </p>
        <button className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-blue-500 text-white font-semibold rounded-lg shadow-lg text-base sm:text-lg md:text-xl hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
}
