import React, { useEffect } from "react";
import Footer from "../layout/Common/footer";
import BackButton from "../layout/Common/BackButton";

const Maintenance = () => {
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
      const size = Math.random() * 4 + 1;
      star.style.width = size + "px";
      star.style.height = size + "px";
      container.appendChild(star);
    }
  }, []);

  return (
    <div
      className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}
    >
      <div id="star-container" className="stars absolute w-full h-full"></div>

      {/* Centered Coming Soon text */}
      <div className="relative z-50 flex flex-1 items-center justify-center text-center">
        <h1 className="text-white text-6xl sm:text-7xl md:text-8xl font-bold animate-glow drop-shadow-lg">
          Registrations Closed!! Please Try again next year!!
          Thank you for Expressing your interest.
        </h1>
      </div>

      <style>{`
        html, body {
          overflow-x: hidden !important;
          width: 100%;
          max-width: 100vw;
        }
        .stars .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 1;
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
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 8px #3b82f6); }
          50% { filter: drop-shadow(0 0 20px #60a5fa); }
        }
        .animate-glow {
          animation: glow 2.5s ease-in-out infinite;
        }
      `}</style>
        <div className="absolute bottom-[6rem] right-6 sm:right-10 z-[120]">
          <BackButton />
        </div>

      <Footer />
    </div>
  );
};

export default Maintenance;
