import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ title, description, image, path }) => {
  return (
    <div
      className="
        group relative text-center
        bg-[rgba(0,15,30,0.85)]
        border border-[#00f7ff]
        rounded-xl
        shadow-[0_0_20px_rgba(0,247,255,0.3)]
        transition-all duration-300 ease-in-out
        hover:-translate-y-2 hover:scale-[1.02]
        hover:shadow-[0_0_25px_#00f7ff,0_0_40px_#00f7ff]
        px-4 pt-24 pb-8  /* ⬅ more padding top & bottom */
        overflow-visible
        w-full max-w-[280px]
        sm:max-w-[320px]
        md:max-w-[340px]
        lg:max-w-[360px]
        xl:max-w-[380px]
        font-['Titillium_Web'] /* ⬅ enforce font on everything */
      "
    >
      {/* Planet Image */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out group-hover:left-0 group-hover:translate-x-4">
        <img
          src={image}
          alt={title}
          className="
            w-40 h-40
            rounded-full object-cover
            shadow-[0_0_25px_rgba(0,247,255,0.6)]
            border-2 border-[#00f7ff40]
            transition-transform duration-600 ease-in-out
            group-hover:scale-[1.08]
          "
        />
      </div>

      {/* Card Content */}
      <div className="mt-20 px-4"> {/* ⬅ pushed content further down */}
        <h2
          className="
            text-xl
            sm:text-2xl
            font-semibold text-[#ffcc00] mb-2 
            drop-shadow-[0_0_10px_#ffcc00]
          "
        >
          {title}
        </h2>
        <p
          className="
            text-sm
            sm:text-base
            text-[#cfcfcf] mb-4 
            min-h-[60px]
          "
        >
          {description}
        </p>
        <Link
          to={path}
          className="
            inline-block
            px-4 py-2
            sm:px-5 sm:py-2.5
            border border-[#00f7ff]
            rounded-lg
            text-sm
            text-[#00f7ff] font-bold
            transition-all duration-300 ease-in-out
            hover:bg-[#00f7ff] hover:text-black
            hover:shadow-[0_0_15px_#00f7ff]
          "
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
