import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./Common/Navbar";
import EventCard from "../layout/Events/EventCard";
import image1 from "../../assets/treasure_image.jpg";
import image2 from "../../assets/hackathon_image.jpg";
import image3 from "../../assets/debate_image.jpg";
import image4 from "../../assets/logo5.jpeg";
import image5 from "../../assets/hackathon_image.jpg";
import Footer from "../../components/layout/Common/footer";

const CentralEvents = () => {
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

  const centralEventsData = [
    {
      id: 1,
      title: "Technical Quiz",
      description: "Test your technical knowledge.",
      image: image1,
      instructions: "Technical quiz details...",
    },
    {
      id: 2,
      title: "Hackathon",
      description: "Show your coding skills in 24 hours.",
      image: image2,
      instructions: "Hackathon details...",
    },
    {
      id: 3,
      title: "Paper Presentation",
      description: "Showcase your research and innovation.",
      image: image5,
      instructions:
        "1. Individual or team of 2.\n2. PPT compulsory.\n3. 10 mins presentation + 5 mins Q&A.\n4. Bring your laptop and ID card.",
      special: true,
    },
    {
      id: 4,
      title: "Quiz Mania",
      description: "Test your knowledge and win exciting prizes.",
      image: image3,
      instructions: "Quiz details...",
    },
    {
      id: 5,
      title: "Technical Debate",
      description: "Battle of Code Words!",
      image: image4,
      instructions: "Debate details...",
    },
  ];

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
            Central Events
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 opacity-100">
            Discover the main highlights of AVALANCHE
          </p>
        </div>

        {/* Pyramid Layout */}
        <div className="flex flex-col items-center space-y-20 sm:space-y-28 lg:space-y-32">
          {/* Top Row */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16">
            {centralEventsData.slice(0, 2).map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <EventCard
                  title={event.title}
                  description={event.description}
                  image={event.image}
                />
              </div>
            ))}
          </div>

          {/* Middle Row */}
          <div className="flex justify-center">
            <div
              onClick={() => setSelectedEvent(centralEventsData[2])}
              className="cursor-pointer transform scale-110 hover:scale-[1.12] transition-transform duration-300"
            >
              <EventCard
                title={centralEventsData[2].title}
                description={centralEventsData[2].description}
                image={centralEventsData[2].image}
              />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16">
            {centralEventsData.slice(3).map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
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

export default CentralEvents;
