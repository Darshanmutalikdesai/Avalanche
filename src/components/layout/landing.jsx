import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "../../assets/background.mp4";
import Logo from "../../assets/weblogo.svg"; // ✅ GIF import
import TransitionVideo from "../../assets/Rocket_V3.0 (online-video-cutter.com).mp4";
import HomePage from "../layout/home";

export default function LoadingVideoPage() {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [showHomePage, setShowHomePage] = useState(false);
  const transitionRef = useRef(null);

  // Loader increment
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setShowButton(true);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Set transition video speed
  useEffect(() => {
    if (showTransition && transitionRef.current) {
      transitionRef.current.playbackRate = 1.5; // 1.5x speed
    }
  }, [showTransition]);

  // Handle Start Mission button
  const handleStartMission = () => {
    setShowTransition(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      {!showHomePage && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover z-0 ${
            showTransition ? "hidden" : "block"
          }`}
        >
          <source src={Background} type="video/mp4" />
        </video>
      )}

      {/* Dark Overlay → ONLY show during loading, completely removed after loading */}
      {isLoading && !showTransition && !showHomePage && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10"></div>
      )}

      {/* Loader */}
      <AnimatePresence>
        {isLoading && !showHomePage && (
          <motion.div
            key="loader"
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background:
                    "conic-gradient(from 0deg, #00f6ff, #0066ff, #00f6ff)",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 8px), black 0)",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 8px), black 0)",
                }}
              ></div>

              <div className="absolute inset-3 rounded-full bg-black bg-opacity-80 flex items-center justify-center">
                <span className="text-white text-xl sm:text-2xl font-bold tracking-wider drop-shadow-lg">
                  {loadingPercent}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content (Logo + Button) - NO OVERLAY behind logo */}
      {!isLoading && !showTransition && !showHomePage && (
        <motion.div
          key="main-content"
          className="relative z-30 min-h-screen flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        >
          {/* ✅ Logo with clean background, no interference */}
          <img
            src={Logo}
            alt="Avalanche Logo"
            className="w-40 sm:w-56 md:w-72 lg:w-96 xl:w-[28rem] max-w-full drop-shadow-lg mb-8"
            style={{ position: "relative", zIndex: 35 }}
          />

          {showButton && (
            <motion.button
              className="px-6 py-3 bg-transparent border-2 border-blue-500 text-white font-bold rounded-lg shadow-lg text-lg hover:bg-blue-600 hover:border-blue-600 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.5 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartMission}
              style={{ position: "relative", zIndex: 35 }}
            >
              Start the Mission
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Transition Video */}
      {showTransition && !showHomePage && (
        <motion.video
          ref={transitionRef}
          key="transition-video"
          autoPlay
          muted
          playsInline
          onEnded={() => setShowHomePage(true)}
          className="absolute top-0 left-0 w-full h-full object-cover z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.8 } }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <source src={TransitionVideo} type="video/mp4" />
        </motion.video>
      )}

      {/* Render Home Page */}
      {showHomePage && <HomePage />}
    </div>
  );
}