import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "../../assets/background.mp4";
import Logo from "../../assets/weblogo.svg";
import HomePage from "../layout/home";
import RocketButton from "../layout/Common/RocketButton"; // ✅ Rocket button

export default function LoadingVideoPage() {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [showHomePage, setShowHomePage] = useState(false);
  const canvasRef = useRef(null);

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

  // Lightspeed canvas animation
  useEffect(() => {
    if (!showTransition || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const n = 512;
    let x = w / 2;
    let y = h / 2;
    const z = (w + h) / 2;
    const starRatio = 256;
    let starSpeed = 8;
    let stars = [];
    let lightspeedActive = false;
    let whiteoutActive = false;
    let whiteoutOpacity = 0;
    let animationStarted = false;
    let startTime = null;

    // Initialize stars
    const initStars = () => {
      stars = [];
      for (let i = 0; i < n; i++) {
        stars.push([
          Math.random() * w * 2 - x * 2,
          Math.random() * h * 2 - y * 2,
          Math.random() * z,
          0,
          0,
        ]);
      }
    };

    initStars();

    const animate = () => {
      if (!animationStarted) {
        animationStarted = true;
        startTime = Date.now();
      }

      const elapsed = (Date.now() - startTime) / 1000;

      // Timeline for cinematic effects
      if (elapsed >= 3) lightspeedActive = true;
      if (elapsed >= 4 && starSpeed > 3) starSpeed = 3;
      if (elapsed >= 4.5) {
        whiteoutActive = true;
        whiteoutOpacity += 0.02;
        if (whiteoutOpacity >= 1) {
          whiteoutOpacity = 1;
          // End animation after whiteout
          setTimeout(() => {
            whiteoutOpacity = 0;
            whiteoutActive = false;
            lightspeedActive = false;
            starSpeed = 8;
            animationStarted = false;
            setShowHomePage(true); // go to homepage
          }, 150);
        }
      }

      // Clear canvas with trail effect
      ctx.fillStyle =
        lightspeedActive && !whiteoutActive
          ? `rgba(0,0,0,0.1)`
          : "rgb(0,0,0)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < n; i++) {
        const prevX = stars[i][3];
        const prevY = stars[i][4];

        stars[i][2] -= starSpeed;

        // Wrap stars around edges
        if (stars[i][0] > x * 2) stars[i][0] -= w * 2;
        if (stars[i][0] < -x * 2) stars[i][0] += w * 2;
        if (stars[i][1] > y * 2) stars[i][1] -= h * 2;
        if (stars[i][1] < -y * 2) stars[i][1] += h * 2;
        if (stars[i][2] > z) stars[i][2] -= z;
        if (stars[i][2] < 0) stars[i][2] += z;

        stars[i][3] = x + (stars[i][0] / stars[i][2]) * starRatio;
        stars[i][4] = y + (stars[i][1] / stars[i][2]) * starRatio;

        if (prevX > 0 && prevX < w && prevY > 0 && prevY < h) {
          ctx.lineWidth = (1 - stars[i][2] / z) * 3.5;
          ctx.strokeStyle = "rgb(180,210,240)";
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(stars[i][3], stars[i][4]);
          ctx.stroke();
          ctx.closePath();
        }
      }

      // Whiteout flash overlay
      if (whiteoutActive) {
        ctx.fillStyle = `rgba(255,255,255,${whiteoutOpacity})`;
        ctx.fillRect(0, 0, w, h);
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      x = w / 2;
      y = h / 2;
      initStars();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showTransition]);

  // Start Mission
  const handleStartMission = () => {
    setShowTransition(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-orbitron">
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

      {/* Dark Overlay */}
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
                <span className="text-white text-xl sm:text-2xl font-bold font-nasal tracking-wider drop-shadow-lg">
                  {loadingPercent}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && !showTransition && !showHomePage && (
        <motion.div
          key="main-content"
          className="absolute inset-0 z-30 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        >
          <img
            src={Logo}
            alt="Avalanche Logo"
            className="w-40 sm:w-56 md:w-72 lg:w-96 xl:w-[28rem] max-w-full drop-shadow-lg mb-8"
          />
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.5 },
              }}
            >
              <RocketButton onClick={handleStartMission} />
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Lightspeed Canvas */}
      {showTransition && !showHomePage && (
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-30"
        />
      )}

      {/* Render Home Page */}
      {showHomePage && <HomePage />}
    </div>
  );
}
