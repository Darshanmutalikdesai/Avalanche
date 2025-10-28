import React, { useState, useEffect } from "react";
import NavigationBar from "./Common/Navbar";
import EventCard from "../layout/Events/EventCard";
import image1 from "../../assets/TechQuiz.jpeg";
import image3 from "../../assets/QuizMania.jpeg";
import image4 from "../../assets/TechDebate.jpeg";
import image5 from "../../assets/pp.jpeg";
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
      title: "Technical Quiz(Circuit)",
      description: "Dive into a world where logic meets innovation! From trending technologies to mind-bending problem statements, this quiz is your chance to prove your technical instincts and outsmart your peers.",
      image: image1,
      instructions: "Technical Quiz General Rules\n 1.The Quizmaster is God and their decision is final.\n 2. Use of mobile phones or electronic devices is strictly prohibited.\n 3. The quiz will consist of 25 questions in the preliminary round.\n 4. ‘*’ (Star mark) questions will act as tie-breakers.\n 5. No negative marking in the first round.\n 6. No prompting of answers is allowed.\n 7. If there are more than three blockers, no further hints will be given.\n 8. Any form of misconduct or discussion during the quiz will lead to disqualification.\n\n\nTechnical Quiz Guidelines 1. Each team can have a maximum of two participants.\n 2. The quiz will consist of two rounds – Preliminary Round and Final Round.\n 3. Round 1 (Preliminary) will be a written pen-and-paper round.\n 4. Use of mobile phones or electronic devices is strictly prohibited.\n 5. Top teams from the preliminary round will qualify for the final round.\n 6. Any form of misconduct or unfair means will lead to disqualification.\n 7. Decisions of the judges and organizers will be final and binding.\n 8. Questions will test technical knowledge, logic, and awareness.\n",
    },
    {
      id: 3,
      title: "Paper Presentation",
      description: "Turn your ideas into impact!Our Event lets you share your innovations, discoveries, and creative solutions with the world.",
      image: image5,
      instructions:
        "Mode of Presentation: \n\n The paper presentation will be conducted in hybrid mode, allowing participants to either present online or offline.\n\n By participating in the Paper Presentation event of Avalanche'25, all registrants must adhere to the following rules and guidelines to ensure a smooth and productive event.\n\n1. Teams interested in participating in the Paper Presentation must choose a track provided by their respective departments.\n2. Teams must send an email with the subject format 'trackname_departmentname' and attach their completed paper.\n3. The mail must be sent to the given email IDs (to be published shortly).\n4. The mail should include: a) Title and Track of the paper, b) Names of the authors, c) Phone numbers of the authors, d) Email IDs of the authors.\n5. The paper must include the following sections: Abstract, Index, List of Figures, List of Tables, Introduction, Literature Survey, Methodology, Materials and Results, Conclusion, and References.\n6. All participants should bring their PowerPoint presentations on a pen drive.\n7. Papers must follow the IEEE format as provided on the official IEEE website.\n8. Font size should be 12.\n9. Font style should be Times New Roman.\n10. Use a double-column layout.\n11. The event encourages original and authentic research work free from plagiarism. A similarity index of up to 40% is acceptable depending on context and references.\n12. The decision of the judges will be final and binding; no appeals or arguments will be entertained.\n13. Dress Code: Formals. Participants must wear their college ID cards.\n14. Be prepared for technical issues — keep a backup of all materials on portable media such as a pen drive.\n15. The final format and details will be shared in the official WhatsApp group after registration.\n\n Round Details: Each team will have 12 minutes total — 10 minutes for presentation followed by 2 minutes for Q&A. Participants must strictly adhere to the allotted time, as exceeding it may disrupt the schedule.",
      special: true,
    },
    {
      id: 4,
      title: "Technical Quiz(Non Circuit)",
      description: "A fusion of creativity, knowledge, and quick thinking! Explore fascinating concepts from science, engineering, and everyday innovation in this fast-paced challenge designed to test not just what you know, but how you think.",
      image: image3,
      instructions: "Technical Quiz General Rules\n 1.The Quizmaster is God and their decision is final.\n 2. Use of mobile phones or electronic devices is strictly prohibited.\n 3. The quiz will consist of 25 questions in the preliminary round.\n 4. ‘*’ (Star mark) questions will act as tie-breakers.\n 5. No negative marking in the first round.\n 6. No prompting of answers is allowed.\n 7. If there are more than three blockers, no further hints will be given.\n 8. Any form of misconduct or discussion during the quiz will lead to disqualification.\n\n\nTechnical Quiz Guidelines 1. Each team can have a maximum of two participants.\n 2. The quiz will consist of two rounds – Preliminary Round and Final Round.\n 3. Round 1 (Preliminary) will be a written pen-and-paper round.\n 4. Use of mobile phones or electronic devices is strictly prohibited.\n 5. Top teams from the preliminary round will qualify for the final round.\n 6. Any form of misconduct or unfair means will lead to disqualification.\n 7. Decisions of the judges and organizers will be final and binding.\n 8. Questions will test technical knowledge, logic, and awareness.\n",
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
            {centralEventsData.map((event) => (
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
