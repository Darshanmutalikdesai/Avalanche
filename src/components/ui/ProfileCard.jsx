import React, { useState } from "react";

const ProfileCard = ({ name, Dept, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-80 h-96 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full bg-transparent overflow-visible
          transition-all duration-500 ease-out
          ${isHovered ? "scale-[1.02]" : "scale-100"}
        `}
      >
        {/* Card Border + Gradient Layer */}
        <span
          className={`absolute inset-0 pointer-events-none bg-gradient-to-br from-[#0a1929] to-[#051320] transition-all duration-300 ${
            isHovered ? "scale-105" : ""
          }`}
          style={{
            clipPath:
              "polygon(30px 0, calc(100% - 30px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0 calc(100% - 30px), 0 30px)",
            border: "1px solid #00f7ff",
            boxShadow: isHovered
              ? "0 0 30px rgba(0, 247, 255, 0.6)"
              : "0 0 15px rgba(0, 247, 255, 0.3)",
          }}
        ></span>

        {/* IMAGE SECTION — Top 2/3 */}
        <div className="h-2/3 overflow-hidden relative z-20">
          <div
            className={`
              pl-2 pt-2 w-60 h-60 bg-cover bg-center justify-center absolute top-5 left-10
              transition-all duration-500
              ${isHovered ? "scale-110 pl-5 pt-5" : "scale-100"}
            `}
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>

        {/* INFO SECTION — Bottom 1/3 */}
        <div className="h-1/3 p-1 space-y-3 relative z-10 text-center flex flex-col justify-center bg-transparent">
          <h3 className="text-2xl font-nasal font-bold text-[#00f7ff] drop-shadow-[0_0_10px_rgba(0,247,255,0.8)]">
            {name}
          </h3>
          <h4 className="text-xl font-orbitron text-yellow-400">
            {Dept}
          </h4>
        </div>
        {/* Flickering Corners */}
        {[
          { pos: "bottom-0 left-0", h_pos: "bottom-0 left-0", v_pos: "bottom-0 left-0" },
          { pos: "bottom-0 right-0", h_pos: "bottom-0 right-0", v_pos: "bottom-0 right-0" },
          { pos: "top-0 left-0", h_pos: "top-0 left-0", v_pos: "top-0 left-0" },
          { pos: "top-0 right-0", h_pos: "top-0 right-0", v_pos: "top-0 right-0" }
        ].map((corner, i) => (
          <div key={i} className={`absolute ${corner.pos} w-8 h-8 z-30 pointer-events-none`}>
            {[
              { pos: corner.h_pos, size: "w-full h-[3px]" },
              { pos: corner.v_pos, size: "h-full w-[3px]" }
            ].map((line, j) => (
              <div key={j} className={`absolute ${line.pos} ${line.size} bg-[#00f7ff] transition-all duration-700 ${isHovered ? "shadow-[0_0_10px_#e5ac0d] bg-[#fceb8c]" : ""}`} style={{ animation: isHovered ? "pulseGlow 2s infinite ease-in-out" : "none", }} />
            ))}
          </div>
        ))}
      </div>
      <style>
        {`
        @keyframes pulseGlow {
          25%, 100% { opacity: 0.8; filter: drop-shadow(0 0 6px #00f7ff); }
          50% { opacity: 0.4; filter: drop-shadow(0 0 12px #00f7ff); }
        }
        `}
      </style>
    </div>
  );
};

export default ProfileCard;
