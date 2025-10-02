import React, { useState } from "react";
import EventCard from "../layout/Events/EventCard";
import BackgroundVideo from "../../assets/backround1.mp4";
import image1 from "../../assets/treasure_image.jpg";
import image2 from "../../assets/hackathon_image.jpg";
import image3 from "../../assets/debate_image.jpg";
import image4 from "../../assets/logo5.jpeg"; // 🎵 Example new image

const CentralEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const centralEventsData = [
    {
      id: 1,
      title: "Treasure Hunt",
      description: "A thrilling hunt across campus!",
      image: image1,
      instructions:
        "1. Register online.\n2. Teams of 4.\n3. Bring college ID.\n4. Follow the clues to win.",
    },
    {
      id: 2,
      title: "Hackathon",
      description: "Show your coding skills in 24 hours.",
      image: image2,
      instructions:
        "1. Teams of max 3.\n2. Bring laptops.\n3. Internet will be provided.\n4. Judges' decision is final.",
    },
    {
      id: 3,
      title: "Quiz Mania",
      description: "Test your knowledge and win exciting prizes.",
      image: image3,
      instructions:
        "1. Individual participation.\n2. 3 rounds.\n3. No mobiles allowed.\n4. Top 3 win certificates.",
    },
    {
      id: 4,
      title: "Battle of Bands",
      description: "Feel the rhythm, rock the stage!",
      image: image4,
      instructions:
        "1. Teams of 5-8 members.\n2. 15 minutes stage time.\n3. Original or cover songs allowed.\n4. Bring your instruments.",
    },
  ];

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-y-auto font-['Orbitron',sans-serif] text-[#00f7ff]">
      {/* Background video */}
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
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-[1]"></div>

      {/* Content wrapper */}
<div className="relative z-[2] min-h-screen p-4 sm:p-6 lg:p-8 pt-36 sm:pt-32 lg:pt-28">
  {/* Header */}
  <div className="text-center mb-20 sm:mb-20 lg:mb-24">
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#00eaff] drop-shadow-[0_0_15px_rgba(0,234,255,0.7)] mb-3">
      Central Events
    </h1>
    <p className="text-base sm:text-lg lg:text-xl text-[#b0f7ff] opacity-80">
      Discover the main highlights of AVALANCHE
    </p>
  </div>

  {/* Grid */}
  <div
    className="
      grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4
      justify-items-center
      gap-x-8 gap-y-16 sm:gap-x-10 sm:gap-y-20
      max-w-8xl
      mx-auto
      px-4
      pb-16
    "
  >
    {centralEventsData.map((event) => (
      <div
        key={event.id}
        onClick={() => setSelectedEvent(event)}
        className="cursor-pointer flex"
      >
        <EventCard
          title={event.title}
          description={event.description}
          image={event.image}
          path="#"
          className="flex flex-col h-[380px] w-full"
        />
      </div>
    ))}
  </div>
</div>

      {/* Popup Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="
              bg-[rgba(0,15,30,0.95)]
              border-2 border-[#00f7ff]
              rounded-xl
              shadow-[0_0_30px_rgba(0,247,255,0.6)]
              max-w-2xl w-full
              p-6 sm:p-8
              relative
              animate-[fadeIn_0.3s_ease-in-out]
            "
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#ffcc00] mb-4 drop-shadow-[0_0_10px_#ffcc00]">
              {selectedEvent.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-300 whitespace-pre-line leading-relaxed mb-6">
              {selectedEvent.instructions}
            </p>
            <button
              className="
                px-6 py-3
                bg-transparent
                border-2 border-[#00f7ff]
                rounded-lg
                text-[#00f7ff] font-bold
                transition-all duration-300 ease-in-out
                hover:bg-[#00f7ff] hover:text-black
                hover:shadow-[0_0_15px_#00f7ff]
              "
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CentralEvents;