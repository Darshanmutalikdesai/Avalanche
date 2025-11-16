import React, { useEffect, useState } from "react";
import NavigationBar from "../layout/Common/Navbar";
import Footer from "../layout/Common/footer";
import BackButton from "../layout/Common/BackButton";

const SchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState("day1");

  // -----------------------
  // STAR BACKGROUND EFFECT
  // -----------------------
  useEffect(() => {
    const numStars = 120;
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

  // -----------------------
  // MULTIPLE IMAGES PER DAY
  // -----------------------
  const scheduleImages = {
    day1: [
      "/d1_schedule_1.webp",
      "/d1_schedule_2.webp",
    ],
    day2: [
      "/d2_schedule_1.webp",
      "/d2_schedule_2.webp",
    ],
    day3: [
      "/d3_schedule_1.webp",
      "/d3_schedule_2.webp",
    ],
  };

  return (
    <div
      className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}
    >
      {/* Star Background */}
      <div id="star-container" className="stars absolute w-full h-full"></div>

      {/* Navigation Bar */}
      <div className="relative z-[60]">
        <NavigationBar />
      </div>

      {/* Day Buttons */}
      <div className="relative z-50 flex justify-center gap-6 mt-20 flex-wrap px-4">
        <button
          onClick={() => setSelectedDay("day1")}
          className={`px-6 py-2 rounded-lg text-white font-bold border transition 
            ${selectedDay === "day1" ? "bg-blue-600 border-blue-400" : "bg-white/10 border-white/20"}`}
        >
          Day 1
        </button>

        <button
          onClick={() => setSelectedDay("day2")}
          className={`px-6 py-2 rounded-lg text-white font-bold border transition 
            ${selectedDay === "day2" ? "bg-blue-600 border-blue-400" : "bg-white/10 border-white/20"}`}
        >
          Day 2
        </button>

        <button
          onClick={() => setSelectedDay("day3")}
          className={`px-6 py-2 rounded-lg text-white font-bold border transition 
            ${selectedDay === "day3" ? "bg-blue-600 border-blue-400" : "bg-white/10 border-white/20"}`}
        >
          Day 3
        </button>
      </div>

      {/* IMAGES LIST */}
      <div className="relative z-50 flex flex-col items-center gap-10 px-4 py-16">
        {scheduleImages[selectedDay].map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Schedule ${selectedDay} - ${index + 1}`}
            className="w-full max-w-5xl h-auto rounded-xl shadow-2xl border border-white/20"
          />
        ))}
      </div>

      {/* Styles for Stars Animation */}
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
      `}</style>

      {/* Back Button */}
      <div className="absolute bottom-[6rem] right-6 sm:right-10 z-[120]">
        <BackButton />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SchedulePage;
