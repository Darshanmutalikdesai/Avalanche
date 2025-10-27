// src/layout/Common/IndividualDeptEvents.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "./Navbar";
import eventsData from "../../data/event_details.json";
import EventCard from "../Events/EventCard";
import { DepartmentsData } from "../DepartmentEvents";
import Footer from "../Common/footer";

export default function IndividualDeptEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { deptName } = useParams();

  // Star background effect
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

  const readableName =
    DepartmentsData.find((dept) => dept.id === deptName)?.title || deptName;

  const departmentEvents = eventsData.filter(
    (event) => event.Dept === deptName
  );

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden font-['Nasalization'] flex flex-col scroll-smooth"
      style={{
        background: "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}
    >
      {/* Background stars */}
      <div id="star-container" className="stars absolute inset-0 z-0"></div>

      {/* Navbar */}
      <div className="sticky top-0 z-[200]">
        <NavigationBar />
      </div>

      {/* Main content */}
      <main className="relative z-[70] flex-grow justify-items-center pt-32 px-4 sm:px-6 lg:px-10 pb-24 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00eaff] mt-8 mb-10 sm:mb-12 drop-shadow-[0_0_15px_rgba(0,234,255,0.7)]">
          {readableName} Department Events
        </h1>

        {departmentEvents.length === 0 ? (
          <p className="text-gray-400 text-base sm:text-lg">
            No events found for this department.
          </p>
        ) : (
          <div
            className="flex flex-row justify-items-center
                      gap-x-6 sm:gap-x-10 gap-y-10 sm:gap-y-12
                      mx-auto max-w-fit"
          >
            {departmentEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="cursor-pointer transition-transform duration-300 hover:scale-105 flex justify-center"
              >
                <EventCard
                  title={event.Eventname}
                  image={event.image}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-[70] mt-auto w-full">
        <Footer />
      </footer>

      {/* Background animations */}
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
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 6px #3b82f6); }
          50% { filter: drop-shadow(0 0 16px #2563eb); }
        }
      `}</style>

      {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-[rgba(0,15,30,0.95)] border-2 border-[#00f7ff] rounded-xl shadow-[0_0_30px_rgba(0,247,255,0.6)] w-full max-w-lg sm:max-w-2xl p-5 sm:p-8 relative animate-[fadeIn_0.3s_ease-in-out] max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold font-nasal text-[#ffcc00] mb-4 drop-shadow-[0_0_10px_#ffcc00]">
              {selectedEvent.Eventname}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 font-orbitron whitespace-pre-line leading-relaxed mb-6">
              {selectedEvent.Description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-transparent border-2 border-[#00f7ff] rounded-lg text-[#00f7ff] font-bold transition-all duration-300 hover:bg-[#00f7ff] hover:text-black hover:shadow-[0_0_15px_#00f7ff]"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>

              <button
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#00f7ff] border-2 border-[#00f7ff] rounded-lg text-black font-bold transition-all duration-300 hover:bg-transparent hover:text-[#00f7ff] hover:shadow-[0_0_15px_#00f7ff]"
                onClick={() => setSelectedEvent(null)}
              >
                Coming Soon...
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
