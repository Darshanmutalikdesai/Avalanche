import React, { useState, useEffect } from "react";
import EventCard from "../layout/Events/EventCard";
import NavigationBar from "./Common/Navbar";
import image1 from "../../assets/treasure_image.jpg";
import image2 from "../../assets/hackathon_image.jpg";
import image3 from "../../assets/debate_image.jpg";

const DepartmentEvents = () => {
  // ✅ Define state for modal popup
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

  const DepartmentsData = [
    { id: 1, title: "Aeronautical", description: "About the Department", image: image1, instructions: "To be added..." },
    { id: 2, title: "Architecture", description: "About the Department", image: image2, instructions: "To be added..." },
    { id: 3, title: "Physics", description: "About the Department", image: image3, instructions: "To be added..." },
    { id: 4, title: "Maths", description: "About the Department", image: image3, instructions: "To be added..." },
    { id: 5, title: "Chemistry", description: "About the Department", image: image3, instructions: "To be added..." },
    { id: 6, title: "BSc", description: "About the Department", image: image3, instructions: "To be added..." },
    { id: 7, title: "Computer Science", description: "About the Department", image: image3, instructions: "To be added..." },
    { id: 8, title: "Electrical and Electronics", description: "About the Department", image: image3, instructions: "To be added..." },
    { id: 9, title: "Electronics and Communication", description: "About the Department", image: image3, instructions: "To be added..." },
    { id: 10, title: "Information Science", description: "About the Department", image: image3, instructions: "To be added..." },
    { id: 11, title: "MBA", description: "About the Department", image: image3, instructions: "To be added..." },
    { id: 12, title: "Mechanical", description: "About the Department", image: image3, instructions: "To be added..." },
    { id: 13, title: "AIML", description: "About the Department", image: image3, instructions: "To be added..." },
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

      {/* Content */}
      <div className="relative z-[2] min-h-screen p-4 sm:p-6 lg:p-8 pt-36 sm:pt-32 lg:pt-28">
        <div className="text-center mb-20 sm:mb-20 lg:mb-24">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-nasal text-[#00eaff] drop-shadow-[0_0_15px_rgba(0,234,255,0.7)] mb-3">
            Departmental Events
          </h1>
          <p className="text-base sm:text-lg font-orbitron lg:text-xl text-[#b0f7ff] opacity-80">
            Discover the main highlights of AVALANCHE
          </p>
        </div>

        {/* Event grid */}
        <div
          className="
            grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3
            justify-items-center
            gap-x-8 gap-y-16 sm:gap-x-10 sm:gap-y-20
            max-w-8xl
            mx-auto
            px-4
            pb-16
          "
        >
          {DepartmentsData.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)} // ✅ fixed
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

      {/* Modal popup */}
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

export default DepartmentEvents;
