import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ title, description, image, path }) => {
  return (
    <div
      className="
        group relative text-center
        bg-gradient-to-b from-[#000a1f] via-[#001933] to-[#000a1f]
        border border-cyan-400/40
        rounded-2xl
        shadow-[0_0_20px_rgba(0,255,255,0.15),inset_0_0_20px_rgba(0,0,80,0.4)]
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:scale-[1.03]
        hover:shadow-[0_0_25px_#00f7ff,0_0_40px_#0077ff,inset_0_0_25px_#001a3f]
        px-3 pt-14 pb-5
        overflow-visible
        w-[200px] sm:w-[240px] md:w-[280px]
        font-nasal
      "
    >
      {/* Glowing blur behind planet */}
      <div
        className="
          absolute -top-12 left-1/2 -translate-x-1/2
          w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32
          rounded-full bg-cyan-400/20 blur-2xl animate-pulse
          group-hover:scale-110 group-hover:opacity-90
          transition-all duration-700
        "
      ></div>

      {/* Planet image */}
      <div
        className="
          absolute -top-10 left-1/2 -translate-x-1/2
          transition-all duration-700 ease-in-out
          group-hover:left-auto group-hover:right-3 group-hover:translate-x-0
        "
      >
        <img
          src={image}
          alt={title}
          className="
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
            rounded-full object-cover
            border border-cyan-300/40
            shadow-[0_0_20px_rgba(0,247,255,0.6)]
            transition-transform duration-700 ease-in-out
            group-hover:rotate-[10deg]
          "
        />
      </div>

      {/* Animated dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-6 left-6 w-1 h-1 bg-cyan-200 rounded-full animate-ping delay-100"></div>
        <div className="absolute bottom-8 right-10 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-10 right-4 w-1 h-1 bg-blue-300 rounded-full animate-ping delay-700"></div>
      </div>

      {/* Text */}
      <div className="mt-10 sm:mt-12 px-2">
        <h2
          className="
            text-lg sm:text-xl md:text-2xl
            font-semibold text-[#ffe680]
            mb-2 tracking-wide
            drop-shadow-[0_0_12px_#ffe680]
          "
        >
          {title}
        </h2>
        <p
          className="
            text-xs sm:text-sm md:text-base
            text-[#cdd9e5] mb-4 leading-snug
            min-h-[50px] font-Orbitron
          "
        >
          {description}
        </p>
        <Link
          to={path}
          className="
            inline-block
            px-3 sm:px-4 py-2
            border border-cyan-400/80
            rounded-md
            text-sm sm:text-base
            text-cyan-300 font-semibold tracking-wider
            transition-all duration-300 ease-in-out
            hover:bg-cyan-400 hover:text-black
            hover:shadow-[0_0_18px_#00f7ff,0_0_25px_#0077ff]
          "
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
