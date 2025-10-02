import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ title, description, image, path }) => {
  return (
    <div
      className="
        group relative text-center
        bg-[rgba(0,15,30,0.85)]
        border border-[#00f7ffb7]
        rounded-lg
        shadow-[0_0_15px_rgba(0,247,255,0.25)]
        transition-all duration-300 ease-in-out
        hover:-translate-y-1.5 hover:scale-[1.01]
        hover:shadow-[0_0_20px_#00f7ffb7,0_0_30px_#00f7ffb7]
        px-3 pt-16 pb-6
        overflow-visible
        w-full max-w-[220px]
        sm:max-w-[240px]
        md:max-w-[260px]
        lg:max-w-[280px]
        font-['Titillium_Web']
      "
    >
      {/* Planet Image */}
      <div
        className="
          absolute -top-14 left-1/2 -translate-x-1/2
          transition-all duration-700 ease-in-out
          group-hover:left-auto group-hover:right-3 group-hover:translate-x-0
        "
      >
        <img
          src={image}
          alt={title}
          className="
            w-28 h-26
            rounded-full object-cover
            shadow-[0_0_18px_rgba(0,247,255,0.5)]
            border border-[#00f7ff40]
            transition-transform duration-600 ease-in-out
          "
        />
      </div>

      {/* Card Content */}
      <div className="mt-14 px-2">
        <h2
          className="
            text-lg sm:text-xl
            font-semibold text-[#ffcc00] mb-2
            drop-shadow-[0_0_8px_#ffcc00]
          "
        >
          {title}
        </h2>
        <p
          className="
            text-xs sm:text-sm
            text-[#cfcfcf] mb-3
            min-h-[50px]
          "
        >
          {description}
        </p>
        <Link
          to={path}
          className="
            inline-block
            px-3 py-1.5
            sm:px-4 sm:py-2
            border border-[#00f7ff]
            rounded-md
            text-xs sm:text-sm
            text-[#00f7ff] font-bold
            transition-all duration-300 ease-in-out
            hover:bg-[#00f7ff] hover:text-black
            hover:shadow-[0_0_12px_#00f7ff]
          "
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default EventCard;