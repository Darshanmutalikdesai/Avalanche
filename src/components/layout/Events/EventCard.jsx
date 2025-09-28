import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ title, description, image, path }) => {
  return (
    <div className="flex flex-col items-center text-center 
                    transition-transform duration-300 hover:scale-105">
      {/* Planet Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-36 h-36 rounded-full object-cover border border-[#00f7ff40] 
                     shadow-[0_0_25px_rgba(0,247,255,0.6)] 
                     transition-transform duration-500 ease-in-out hover:scale-[1.08]"
        />
      </div>

      {/* Card Content */}
      <h2 className="mt-6 text-[1.4rem] text-[#ffcc00] drop-shadow-[0_0_10px_#ffcc00]">
        {title}
      </h2>
      <p className="mt-2 text-[0.95rem] text-[#cfcfcf] min-h-[60px]">
        {description}
      </p>

      {/* Explore Button */}
      <Link
        to={path}
        className="mt-4 inline-block px-4 py-2 border border-[#00f7ff] rounded-md 
                   text-[#00f7ff] font-bold transition-all duration-300 ease-in-out 
                   hover:bg-[#00f7ff] hover:text-black hover:shadow-[0_0_15px_#00f7ff]"
      >
        Explore
      </Link>
    </div>
  );
};

export default EventCard;
