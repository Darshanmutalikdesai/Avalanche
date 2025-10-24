import React, { useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../layout/Events/EventCard";
import BackgroundVideo from "../../assets/backround1.mp4";
import image1 from "../../assets/treasure_image.jpg";
import image2 from "../../assets/hackathon_image.jpg";
import image3 from "../../assets/debate_image.jpg";
import image4 from "../../assets/logo5.jpeg";

const CentralEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const centralEventsData = [
    {
      id: 1,
      title: "Technical Quiz",
      description:
        "Test your technical knowledge.",
      image: image1,
      instructions:
        "Technical Quiz Guidelines:\n1. Each team can have a maximum of two participants.\n2. The quiz will consist of two rounds – Preliminary Round and Final Round.\n3. Round 1 (Preliminary) will be a written pen-and-paper round.\n4. Use of mobile phones or electronic devices is strictly prohibited.\n5. Top teams from the preliminary round will qualify for the final round.\n6. Any form of misconduct or unfair means will lead to disqualification.\n7. Decisions of the judges and organizers will be final and binding.\n8. Questions will test technical knowledge, logic, and awareness.\n\nTechnical Quiz General Rules:\n1. The Quizmaster is God and their decision is final.\n2. Use of mobile phones or electronic devices is strictly prohibited.\n3. The quiz will consist of 25 questions in the preliminary round.\n4. ‘*’ (Star mark) questions will act as tie-breakers.\n5. No negative marking in the first round.\n6. No prompting of answers is allowed.\n7. If there are more than three blockers, no further hints will be given.\n8. Any form of misconduct or discussion during the quiz will lead to disqualification.",
      Dept: "Central Level",
      MaxReg: "80",
      MinTeam: "2",
      MaxTeam: "2",
      Coord1Name: "Darshan Mutalikdesai",
      Coord1Pno: "7204092064",
      Coord2Name: "Yash Deshpande",
      Coord2Pno: "8971214823",
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
      title: "Technical Debate",
      description: "Battle of Code Words!",
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-nasal text-[#00eaff] drop-shadow-[0_0_15px_rgba(0,234,255,0.7)] mb-3">
            Central Events
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#b0f7ff] text-orbitron opacity-80">
            Discover the main highlights of AVALANCHE
          </p>
        </div>

        {/* Events Grid */}
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
    role="dialog"
    aria-modal="true"
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
        max-h-[80vh]      /* Limit modal height */
        overflow-y-auto   /* Make content scrollable */
      "
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl sm:text-3xl font-bold font-nasal text-[#ffcc00] mb-4 drop-shadow-[0_0_10px_#ffcc00]">
        {selectedEvent.title}
      </h2>
      <p className="text-base sm:text-lg text-gray-300 font-orbitron whitespace-pre-line leading-relaxed mb-6">
        {selectedEvent.instructions}
      </p>

      {/* Buttons Row */}
      <div className="flex gap-4 justify-end">
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

        <Link
          to="/events/register-events"
          state={{ event: selectedEvent }}
          className="
            px-6 py-3
            bg-[#00f7ff]
            border-2 border-[#00f7ff]
            rounded-lg
            text-black font-bold
            transition-all duration-300 ease-in-out
            hover:bg-transparent hover:text-[#00f7ff]
            hover:shadow-[0_0_15px_#00f7ff]
          "
        >
          Register
        </Link>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CentralEvents;
