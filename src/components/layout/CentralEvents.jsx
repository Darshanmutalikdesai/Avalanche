import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./Common/Navbar";
import EventCard from "../layout/Events/EventCard";
import image1 from "../../assets/treasure_image.jpg";
import image2 from "../../assets/hackathon_image.jpg";
import image3 from "../../assets/debate_image.jpg";
import image4 from "../../assets/logo5.jpeg";

const CentralEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
    useEffect(() => {
      const numStars = 79;
      const container = document.getElementById("star-container");
      if (!container) return;
      container.innerHTML = "";
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.top = Math.random() * 100 + "%";
        star.style.left = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 5 + "s";
        const size = Math.random() * 4 + 1;
        star.style.width = size + "px";
        star.style.height = size + "px";
        container.appendChild(star);
      }
    }, []);

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
    <div className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}>

        <div id="star-container" className="stars absolute w-full h-full"></div>


        <div className="relative z-[60]">
            <NavigationBar />
        </div>
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
    <style>{`
        html, body {
          overflow-x: hidden !important;
          width: 100%;
          max-width: 100vw;
        }
        .stars .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 1;
          animation: twinkle 3s infinite alternate, drift 20s linear infinite;
        }
        @keyframes twinkle {
          from { opacity: 0.3; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1.2); }
        }
        @keyframes drift {
          from { transform: translate(0, 0); }
          to { transform: translate(20px, 20px); }
        }
        @keyframes slide {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
        .animate-slide {
          animation: slide 30s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          75% { transform: rotate(-2deg); }
        }
        .animate-wiggle {
          animation: wiggle 4s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 6px #3b82f6); }
          50% { filter: drop-shadow(0 0 16px #2563eb); }
        }
        .animate-glow {
          animation: glow 2.5s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
};

export default CentralEvents;
