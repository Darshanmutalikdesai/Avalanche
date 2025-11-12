import React, { useState } from "react";
import { Link } from "react-router-dom";

const EventCard = ({ title, description, image, path }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="
        relative w-full max-w-sm mx-auto
        aspect-[6/7] cursor-pointer select-none
        perspective-1000
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* === CARD FRAME === */}
      <div
        className={`
          relative w-full h-full rounded-xl overflow-hidden border
          bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#000]
          transition-all duration-700 ease-out transform-gpu
          ${isHovered
            ? "scale-[1.05] shadow-[0_0_40px_rgba(255,0,0,0.6)] border-red-500/80"
            : "scale-100 shadow-[0_0_25px_rgba(255,0,0,0.2)] border-red-700/30"}
        `}
      >
        {/* === MOTION LINES (F1 Speed Effect) === */}
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none ${
            isHovered ? "opacity-100" : ""
          }`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_95%,rgba(255,0,0,0.3)_100%)] bg-[length:6px_100%] animate-[raceLines_3s_linear_infinite]" />
          <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_95%,rgba(255,255,255,0.08)_100%)] bg-[length:100%_4px] animate-[raceLines_5s_linear_infinite]" />
        </div>

        {/* === TOP IMAGE (Poster / Car / Event Image) === */}
        <div
  className={`
    absolute top-0 left-0 w-full h-1/2 overflow-hidden
    transition-all duration-700 justify-items-center items-center flex flex-col pt-5
    ${isHovered ? "opacity-100 scale-105" : "opacity-90 scale-100"}
  `}
>
  <img
    src={image}
    alt={title}
    className="w-full h-full object-scale-down rounded-t-2xl"
  />
          {/* Overlay fade gradient */}
         <div className="absolute inset-0 overflow-hidden">
  {/* Dark fade overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black opacity-50" />

  

  {/* Neon light reflection sweep */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,60,60,0.3),transparent_50%)] mix-blend-screen animate-lightSweep" />

  
  
</div>
        </div>

        {/* === CONTENT === */}
        <div className="absolute bottom-0 w-full h-1/2 p-5 flex flex-col justify-center items-center text-center">
          <h2
            className={`
              text-2xl sm:text-2xl font-bold uppercase tracking-widest font-orbitron
              transition-all duration-700
              ${isHovered ? "text-red-500 drop-shadow-[0_0_10px_#ff0000]" : "text-white"}
            `}
          >
            {title}
          </h2>

          <p
            className={`
              text-xs sm:text-sm text-gray-300 font-rajdhani mt-3 leading-snug
              transition-all duration-500
              ${isHovered ? "text-gray-100" : ""}
            `}
          >
            {description}
          </p>

          <div className="mt-5">
            <Link
              to={path}
              className={`
                inline-block px-5 py-2 rounded-md border border-red-500/70
                font-orbitron text-red-400 tracking-widest uppercase text-sm
                transition-all duration-500
                hover:bg-red-500 hover:text-black hover:shadow-[0_0_15px_#ff0000]
              `}
            >
              Explore
            </Link>
          </div>
        </div>

        {/* === F1 RED CORNER LIGHTS === */}
        {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map(
          (pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-2 h-2 rounded-full bg-red-500 shadow-[0_0_12px_#ff0000] transition-all duration-700 ${
                isHovered
                  ? "scale-125 bg-yellow-400 shadow-[0_0_18px_#ffe680]"
                  : ""
              }`}
            />
          )
        )}
      </div>

      {/* === ANIMATIONS === */}
      <style>{`
        @keyframes raceLines {
          from { background-position: 0 0; }
          to { background-position: 100% 0; }
        }

        @media (max-width: 640px) {
          .scale-[1.05] { transform: none !important; }
        }

         @keyframes raceMotion {
    from { background-position: 0 0; }
    to { background-position: 100px 200px; }
  }

  @keyframes lightSweep {
    0% { opacity: 0; transform: translateX(-50%) rotate(10deg); }
    40% { opacity: 0.8; transform: translateX(0) rotate(10deg); }
    100% { opacity: 0; transform: translateX(80%) rotate(10deg); }
  }
      `}</style>
    </div>
  );
};

export default EventCard;