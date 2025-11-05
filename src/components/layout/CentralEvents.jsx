import React, { useState, useEffect } from "react";
import NavigationBar from "./Common/Navbar";
import { Link, useLocation } from "react-router-dom";
import EventCard from "../layout/Events/EventCard";
import image1 from "../../assets/TechQuiz.jpeg";
import image3 from "../../assets/QuizMania.jpeg";
import image4 from "../../assets/TechDebate.jpeg";
import image5 from "../../assets/pp.jpeg";
import Footer from "../../components/layout/Common/footer";
import BackButton from "./Common/BackButton";
const CentralEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

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

  const centralEventsData = [
    {
      eventId: "tech_quiz_circuit",
      eventName: "Technical Quiz(Circuit)",
      image: image1,
      instructions: "Technical Quiz General Rules\n 1.The Quizmaster is God and their decision is final.\n 2. Use of mobile phones or electronic devices is strictly prohibited.\n 3. The quiz will consist of 25 questions in the preliminary round.\n 4. ‘*’ (Star mark) questions will act as tie-breakers.\n 5. No negative marking in the first round.\n 6. No prompting of answers is allowed.\n 7. If there are more than three blockers, no further hints will be given.\n 8. Any form of misconduct or discussion during the quiz will lead to disqualification.\n\n\nTechnical Quiz Guidelines 1. Each team can have a maximum of two participants.\n 2. The quiz will consist of two rounds – Preliminary Round and Final Round.\n 3. Round 1 (Preliminary) will be a written pen-and-paper round.\n 4. Use of mobile phones or electronic devices is strictly prohibited.\n 5. Top teams from the preliminary round will qualify for the final round.\n 6. Any form of misconduct or unfair means will lead to disqualification.\n 7. Decisions of the judges and organizers will be final and binding.\n 8. Questions will test technical knowledge, logic, and awareness.\n",
    },
    {
      eventId: "paper_presentation",
      eventName: "Paper Presentation",
      image: image5,
      instructions:
        "Mode of Presentation: \n\n The paper presentation will be conducted in hybrid mode, allowing participants to either present online or offline.\n\n By participating in the Paper Presentation event of Avalanche'25, all registrants must adhere to the following rules and guidelines to ensure a smooth and productive event.\n\n1. Teams interested in participating in the Paper Presentation must choose a track provided by their respective departments.\n2. Teams must send an email with the subject format 'trackname_departmentname' and attach their completed paper.\n3. The mail must be sent to the given email IDs (to be published shortly).\n4. The mail should include: a) Title and Track of the paper, b) Names of the authors, c) Phone numbers of the authors, d) Email IDs of the authors.\n5. The paper must include the following sections: Abstract, Index, List of Figures, List of Tables, Introduction, Literature Survey, Methodology, Materials and Results, Conclusion, and References.\n6. All participants should bring their PowerPoint presentations on a pen drive.\n7. Papers must follow the IEEE format as provided on the official IEEE website.\n8. Font size should be 12.\n9. Font style should be Times New Roman.\n10. Use a double-column layout.\n11. The event encourages original and authentic research work free from plagiarism. A similarity index of up to 40% is acceptable depending on context and references.\n12. The decision of the judges will be final and binding; no appeals or arguments will be entertained.\n13. Dress Code: Formals. Participants must wear their college ID cards.\n14. Be prepared for technical issues — keep a backup of all materials on portable media such as a pen drive.\n15. The final format and details will be shared in the official WhatsApp group after registration.\n\n Round Details: Each team will have 12 minutes total — 10 minutes for presentation followed by 2 minutes for Q&A. Participants must strictly adhere to the allotted time, as exceeding it may disrupt the schedule.",
    },
    {
      eventId: "tech_quiz_noncirc_",
      eventName: "Technical Quiz(Non Circuit)",
      image: image3,
      instructions: "Technical Quiz General Rules\n 1.The Quizmaster is God and their decision is final.\n 2. Use of mobile phones or electronic devices is strictly prohibited.\n 3. The quiz will consist of 25 questions in the preliminary round.\n 4. ‘*’ (Star mark) questions will act as tie-breakers.\n 5. No negative marking in the first round.\n 6. No prompting of answers is allowed.\n 7. If there are more than three blockers, no further hints will be given.\n 8. Any form of misconduct or discussion during the quiz will lead to disqualification.\n\n\nTechnical Quiz Guidelines 1. Each team can have a maximum of two participants.\n 2. The quiz will consist of two rounds – Preliminary Round and Final Round.\n 3. Round 1 (Preliminary) will be a written pen-and-paper round.\n 4. Use of mobile phones or electronic devices is strictly prohibited.\n 5. Top teams from the preliminary round will qualify for the final round.\n 6. Any form of misconduct or unfair means will lead to disqualification.\n 7. Decisions of the judges and organizers will be final and binding.\n 8. Questions will test technical knowledge, logic, and awareness.\n",
    },
    {
      eventId: "tech_debate",
      eventName: "Technical Debate",
      image: image4,
      instructions: "Round 1 – Devil’s Advocate:\nParticipants debate individually, first arguing for and then against an assigned topic within 3 minutes.\nThis round tests analytical depth, smooth transitions, and convincing delivery.\nTen finalists advance based on their ability to defend opposing viewpoints logically and persuasively.\n\nRound 2 – Oxford-Style Debate:\nFinalists are grouped into Proposition and Opposition teams to debate a given motion.\nEach side presents opening statements, rebuttals, and closing arguments, followed by audience or judge questions.\n\nThroughout the event, participants are expected to uphold respect, professionalism, logical reasoning, and adherence to time limits—making Technical Debate 2025 a true test of intellect, communication, and composure.",
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
      <div className="pb-20">
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


          <div className="flex flex-wrap justify-center items-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full px-4 sm:px-6 md:px-8">
            {centralEventsData.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="cursor-pointer transition-transform duration-300 hover:scale-105 
                          w-[90%] sm:w-60 md:w-72 lg:w-80 xl:w-96"
              >
                <EventCard
                  title={event.eventName}
                  description=""
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
              {selectedEvent.eventName}
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

              {/*<button
                className="px-6 py-3 bg-[#00f7ff] border-2 border-[#00f7ff] rounded-lg text-black font-bold transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#00f7ff] hover:shadow-[0_0_15px_#00f7ff]"
                onClick={() => setSelectedEvent(null)}
              >
                Coming Soon...
              </button>*/}

              <Link
                to={isLoggedIn
                  ? "/events/register"
                  : "/auth"
                }
                state={{ event: selectedEvent }}
                className="px-6 py-3 bg-[#00f7ff] justify-items-center border-2 border-[#00f7ff] rounded-lg text-black font-bold transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[#00f7ff] hover:shadow-[0_0_15px_#00f7ff]"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
      <div
        className="
          absolute 
          right-6 bottom-6       /* mobile: closer to edges */
          sm:right-10 sm:bottom-10 
          md:right-16 md:bottom-12 
          lg:right-24 lg:bottom-16 
          xl:right-36 xl:bottom-16
          pb-20
        "
      >
        <BackButton />
      </div>
      </div>

      {/* ✅ Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default CentralEvents;
