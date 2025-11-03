import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import NavigationBar from "./Common/Navbar";
import EventCard from "../layout/Events/EventCard";
import scienceexpo from "../../assets/ScienceExpo.jpeg";
import FishTank from "../../assets/FishTank.jpeg";
import BackButton from "./Common/BackButton";
import Footer from "../../components/layout/Common/footer";

const SchoolEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);


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

  useEffect(() => {
          const checkAuth = () => {
            // Check for userId and user data to ensure user is logged in
            const userId = localStorage.getItem("userId");
            const userData = localStorage.getItem("user");
            const newLoginState = !!(userId && userData);
            
            if (newLoginState !== isLoggedIn) {
              setIsLoggedIn(newLoginState);
            }
          };
      
          checkAuth();
        }, [location, isLoggedIn]);

    const SchoolEventsData = [
        {
            "eventId": "science_expo",
            "eventName": "Science Expo",
            "description": "An engaging exhibition where young innovators present science and technology projects that inspire curiosity, creativity, and problem-solving.",
            "image": scienceexpo,
            "instructions": "Eligibility:\nOpen to all high school students.\n\nRegistration:\nSubmit a 100–150 word abstract describing your project.\n\nTeam Composition:\n2–4 members per team.\n\nProject Type:\nWorking models, demonstrations, or research-based projects related to science and technology.\n\nOriginality:\nProjects must be original and student-made. Teacher or parent guidance is allowed but should not replace student effort.\n\nDisplay Requirements:\nEach project must include: Title & Team Details, Aim / Problem Statement, Procedure / Method, Observations / Results, Conclusion / Innovation.\n\nSetup & Logistics:\nTables, boards, and power points will be provided. Report 1 hour before the start for setup. Sections include Physics, Chemistry, Biology, and Technology. Bring all required materials; internet may not be available.\n\nSafety & Conduct:\nFollow safety instructions. Maintain discipline and cooperate with organizers.\n\nRound Details:\nRound 1 - 60 minutes.",
        },
        {
          "id": "fish_tank",
          "eventName": "Fish Tank",
          "description": "Fish Tank is an idea pitching event for PUC students to present innovative solutions to real-world challenges aligned with themes.",
          "image": FishTank,
          "instructions": "Objectives of the Event\nThe Idea Pitching Event is conducted to encourage creativity, innovation, and awareness among PUC students.\nIt allows students to identify real-world challenges within the selected theme and propose practical solutions that can positively impact society, promote national growth, and enhance safety and sustainability.\n\nParticipation Rules\n1. Eligibility: Open to all Pre University students.\n2. Team Composition: Minimum 2 and maximum 4 members per team.\n3. Originality: Ideas must be student-developed and original. Existing concepts are acceptable only if they show clear innovation or improvement.\n4. Professional Conduct: Maintain decorum and professionalism throughout the event. Inappropriate, offensive, or politically sensitive content is strictly prohibited. Judges’ decisions are final and binding.\n\nEvent Rounds\nRound 1: Problem Identification Presentation\n• Teams must present a real-world problem related to the selected theme.\n• The presentation should clearly include:\n  • What is the problem?\n  • Who is affected?\n  • Why is it important to solve?\n• Time Limit: 4 minutes presentation + 2 minutes Q&A\n\nRound 2: Solution Pitch\n• Selected teams will present their innovative solution to the problem from Round 1.\n• The presentation should include:\n  • Proposed solution and concept\n  • Technology or approach used\n  • Feasibility and implementation strategy\n  • Potential economic or societal impact\n  • Scalability and future scope\n• Time Limit: 5 minutes presentation + 3 minutes Q&A\n\nPitch Presentation Guidelines\nEach team’s pitch (for both Rounds) should clearly include:\nPresentation Format\n• Title of the Idea\n• Team Member Names and Class (PUC I or II)\n• Theme Chosen\n• Selected Problem Statement (Round 1)\n• Proposed Solution (Round 2)\n• Innovation / Technology / Method Used\n• Feasibility & Practical Impact\n• Beneficiaries and Target Sector\n• Future Scope / Scalability\n\nSupporting Material\n• PPT is mandatory (maximum 8 slides per round).\n• Charts, posters, videos, or simple models may be used.\n\nEvaluation Criteria\n• Relevance to the theme\n• Problem significance\n• Creativity and innovation of solution\n• Practical feasibility\n• Economic and social impact\n• Clarity and presentation skills\n\nLogistics & Setup\n1. Projector, screen, and microphone will be provided.\n2. Each team must bring their own laptop or supporting device.\n3. Teams must report 30 minutes prior to their presentation slot.\n\nRules & Regulations\n1. Time limits must be strictly followed.\n2. The idea must not contain inappropriate, offensive, or politically sensitive content.\n3. Use of copyrighted or plagiarized content will lead to disqualification.\n4. Professionalism and decorum must be maintained.\n5. Judges' decisions are final and binding.\n\nOutcomes & Rewards\n• Only two teams will be selected as winners after the completion of both rounds.\n• The selected teams will be given first and second prize according to their rank.\n• Winners will receive certificates and prize money as part of the final recognition.",
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
      <div className="relative z-[2] min-h-screen pb-20 p-4 sm:p-6 lg:p-8 pt-36 sm:pt-32 lg:pt-28">
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-nasal text-[#00eaff] drop-shadow-[0_0_15px_rgba(0,234,255,0.7)] mb-3">
            School Level Events
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 opacity-100">
            Explore the exciting events lined up for school students at AVALANCHE!
          </p>
        </div>

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
      <div className="absolute bottom-[0.5rem] right-6 sm:right-10 z-[120]">
        <BackButton />
      </div>

      </div>
 
      <Footer />


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

              <Link
                to={isLoggedIn
                  ? "/events/register"
                  : "/auth"
                }
                state={{ event: selectedEvent }}
                className="px-6 py-3 bg-[#00f7ff] border-2 border-[#00f7ff] rounded-lg text-black font-bold transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#00f7ff] hover:shadow-[0_0_15px_#00f7ff]"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Footer always at bottom */}
    </div>
  );
};

export default SchoolEvents;
