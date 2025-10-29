import React, { useState, useEffect } from "react";
import NavigationBar from "./Common/Navbar";
import EventCard from "../layout/Events/EventCard";
import scienceexpo from "../../assets/ScienceExpo.jpeg";
import Footer from "../../components/layout/Common/footer";

const SchoolEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Create animated stars dynamically
    const numStars = 100;
    const container = document.getElementById("star-container");
    if (!container) return;
    container.innerHTML = "";

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";
      star.style.animationDelay = Math.random() * 5 + "s";
      const size = Math.random() * 3 + 1;
      star.style.width = size + "px";
      star.style.height = size + "px";
      container.appendChild(star);
    }
  }, []);

    const SchoolEventsData = [
        {
            "id": 1,
            "title": "Science Expo",
            "description": "An engaging exhibition where young innovators present science and technology projects that inspire curiosity, creativity, and problem-solving.",
            "image": scienceexpo,
            "instructions": "Eligibility:\nOpen to all high school students.\n\nRegistration:\nSubmit a 100–150 word abstract describing your project.\n\nTeam Composition:\n2–4 members per team.\n\nProject Type:\nWorking models, demonstrations, or research-based projects related to science and technology.\n\nOriginality:\nProjects must be original and student-made. Teacher or parent guidance is allowed but should not replace student effort.\n\nDisplay Requirements:\nEach project must include: Title & Team Details, Aim / Problem Statement, Procedure / Method, Observations / Results, Conclusion / Innovation.\n\nSetup & Logistics:\nTables, boards, and power points will be provided. Report 1 hour before the start for setup. Sections include Physics, Chemistry, Biology, and Technology. Bring all required materials; internet may not be available.\n\nSafety & Conduct:\nFollow safety instructions. Maintain discipline and cooperate with organizers.\n\nRound Details:\nRound 1 - 60 minutes.",
        }
    ]
  return (
    <div
      className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}
    >
      {/* Inline Starfield CSS */}
      <style>{`
        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
          animation: twinkle 3s infinite ease-in-out;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>

      {/* Animated Stars Background */}
      <div id="star-container" className="stars absolute w-full h-full"></div>

      {/* Navbar */}
      <div className="relative z-[60]">
        <NavigationBar />
      </div>

      {/* Content Section */}
      <div className="relative z-[2] min-h-screen p-4 sm:p-6 lg:p-8 pt-36 sm:pt-32 lg:pt-28">
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-nasal text-[#00eaff] drop-shadow-[0_0_15px_rgba(0,234,255,0.7)] mb-3">
            School Level Events
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 opacity-100">
            Explore the exciting events lined up for school students at AVALANCHE!
          </p>
        </div>

          {/* Top Row */}
          <div className="flex flex-wrap justify-center items-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full px-4 sm:px-6 md:px-8">
            {SchoolEventsData.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="cursor-pointer transition-transform duration-300 hover:scale-105 
                          w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] 
                          xl:w-[calc(25%-2.5rem)]
                          min-w-[280px] max-w-[380px]"
              >
                <EventCard
                  title={event.title}
                  description={event.description}
                  image={event.image}
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
            className="bg-[rgba(0,15,30,0.95)] border-2 border-[#00f7ff] rounded-xl shadow-[0_0_30px_rgba(0,247,255,0.6)] max-w-2xl w-full p-6 sm:p-8 relative animate-[fadeIn_0.3s_ease-in-out] max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl sm:text-3xl font-bold font-nasal text-[#ffcc00] mb-4 drop-shadow-[0_0_10px_#ffcc00]">
              {selectedEvent.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-300 font-orbitron whitespace-pre-line leading-relaxed mb-6">
              {selectedEvent.instructions}
            </p>

            <div className="flex flex-wrap gap-4 justify-end">
              <button
                className="px-6 py-3 bg-transparent border-2 border-[#00f7ff] rounded-lg text-[#00f7ff] font-bold transition-all duration-300 ease-in-out hover:bg-[#00f7ff] hover:text-black hover:shadow-[0_0_15px_#00f7ff]"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>

              <button
                className="px-6 py-3 bg-[#00f7ff] border-2 border-[#00f7ff] rounded-lg text-black font-bold transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#00f7ff] hover:shadow-[0_0_15px_#00f7ff]"
                onClick={() => setSelectedEvent(null)}
              >
                Coming Soon...
              </button>

              {/* <Link
                to={
                  selectedEvent.special
                    ? "/events/register-paper"
                    : "/events/register-events"
                }
                state={{ event: selectedEvent }}
                className="px-6 py-3 bg-[#00f7ff] border-2 border-[#00f7ff] rounded-lg text-black font-bold transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#00f7ff] hover:shadow-[0_0_15px_#00f7ff]"
              >
                Register
              </Link> */}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default SchoolEvents;
