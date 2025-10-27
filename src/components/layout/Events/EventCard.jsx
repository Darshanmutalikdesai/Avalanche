import React, { useState } from "react";
import { Link } from "react-router-dom";

const EventCard = ({ title, description, image, path }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-80 h-96 cursor-pointer select-none perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* === CARD FRAME === */}
      <div
        className={`
          relative w-full h-full rounded-xl overflow-hidden
          transition-all duration-700 ease-out transform-gpu
          ${isHovered ? "rotate-x-6 scale-[1.04] shadow-[0_0_50px_rgba(0,255,255,0.6)] border-cyan-400" : "rotate-x-0 scale-100 shadow-[0_0_25px_rgba(0,255,255,0.2)] border-cyan-400/30 "}
          bg-gradient-to-br from-[#00111f] via-[#001a33] to-[#00070f]
          border 
        `}
      >
        {/* === HOLOGRAPHIC LINES === */}
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-700 ${
            isHovered ? "opacity-100" : ""
          }`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_97%,rgba(0,255,255,0.2)_100%)] bg-[length:4px_100%] animate-[moveLines_3s_linear_infinite]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_97%,rgba(255,255,0,0.25)_100%)] bg-[length:100%_4px] animate-[moveLines_6s_linear_infinite]" />
        </div>

        {/* === POSTER === */}
        <div
          className={`
            absolute top-0 left-0 w-full h-1/2
            overflow-hidden transition-all duration-700
            ${isHovered ? "opacity-100 scale-105" : "opacity-90 scale-100"}
          `}
        >
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full opacity-90 rounded-t-xl"
          />
        </div>

        {/* === CONTENT === */}
        <div className="absolute bottom-0 w-full h-1/2 p-5 text-center flex flex-col justify-center items-center">
          <h2
            className={`
              text-2xl font-nasal font-bold text-cyan-300 tracking-wider uppercase
              transition-all duration-700
            `}
          >
            {title}
          </h2>
          <p
            className={`
              text-sm text-gray-200 font-orbitron mt-3 px-3 leading-snug
              transition-all duration-500
            `}
          >
            {description}
          </p>

          <div className="mt-5">
            <Link
              to={path}
              className={`
                relative inline-block px-5 py-2 rounded-md border border-cyan-300/60
                font-orbitron text-cyan-200 tracking-wide text-sm uppercase
                transition-all duration-500
                hover:bg-cyan-300 hover:text-black
              `}
            >
              Explore
            </Link>
          </div>
        </div>

        {/* === CYBER CORNER LIGHTS === */}
        {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map(
          (pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-2 h-2 bg-[#00f7ff] rounded-full shadow-[0_0_10px_#00f7ff] transition-all duration-700 ${
                isHovered ? "scale-150 bg-yellow-500 shadow-[0_0_20px_#ffe680]" : ""
              }`}
            />
          )
        )}
      </div>

      <style>
        {`
          @keyframes moveLines {
            from { background-position: 0 0; }
            to { background-position: 100% 0; }
          }
        `}
      </style>
    </div>
  );
};

export default EventCard;
