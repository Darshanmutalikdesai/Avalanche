import React, { useState } from "react";
import { Rocket } from "lucide-react";

export default function RocketButton({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    // ⏳ Wait for animation to finish before redirect
    setTimeout(() => {
      if (onClick) onClick();
      setIsClicked(false);
    }, 700); // match with rocket animation duration
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`
        relative px-6 py-3 text-white font-semibold
        bg-gradient-to-r from-blue-600 to-purple-600
        rounded-lg shadow-lg
        transform transition-all duration-300
        ${isHovered ? "scale-105 shadow-purple-500/50" : "scale-100"}
        ${isClicked ? "scale-95" : ""}
        overflow-hidden
      `}
    >
      <div className="flex items-center gap-2 relative z-10">
        <Rocket
          className={`transition-all duration-700 ${
            isHovered ? "rotate-45 -translate-y-1" : ""
          } ${isClicked ? "-translate-y-[200px] opacity-0" : ""}`}
          size={20}
        />
        <span>Launch space Mission</span>
      </div>
    </button>
  );
}
