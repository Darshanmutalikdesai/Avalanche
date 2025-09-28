import React from "react";
import EventCard from "../layout/Events/EventCard";
import BackgroundVideo from "../../assets/backround1.mp4";

const EventsPage = ({ events }) => {
  return (
    <div className="relative w-full min-h-screen font-orbitron text-[#00f7ff]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={BackgroundVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <div className="text-center py-16">
          <h1 className="text-[2.5rem] font-semibold text-[#00eaff] drop-shadow-[0_0_15px_rgba(0,234,255,0.7)]">
            Events
          </h1>
          <p className="text-[1.2rem] text-[#b0f7ff] opacity-80">
            Explore the Galaxy of AVALANCHE
          </p>
        </div>

        {/* Grid of cards */}
        <div
          className="grid gap-16 sm:gap-20 md:gap-24 
                     grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                     justify-items-center px-4 sm:px-6 lg:px-8 pb-20"
        >
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              description={event.description}
              image={event.image}
              path={event.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
