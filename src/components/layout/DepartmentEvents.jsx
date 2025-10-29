import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../layout/Events/EventCard";
import NavigationBar from "./Common/Navbar";
import image1 from "../../assets/Aero.jpeg";
import image2 from "../../assets/Architecture.jpeg";
import image3 from "../../assets/Physics.jpeg";
import Mechanical from "../../assets/Mechanical.jpeg";
import Footer from "../../components/layout/Common/footer";
import chem from "../../assets/chem.jpeg";
import ai from "../../assets/AI.jpeg";
import Maths from "../../assets/Maths.jpeg";
import bsc from "../../assets/BSc.jpeg";
import cse from "../../assets/CSE.jpeg";
import civil from "../../assets/Civil.jpeg";
import eee from "../../assets/EE.jpeg";
import ece from "../../assets/EC.jpeg";
import ise from "../../assets/IS.jpeg";
import mba from "../../assets/MBA.jpeg";

export const DepartmentsData = [
  { id: "AERO", title: "Aeronautical", description: "About the Department", image: image1 },
  { id: "ARCH", title: "Architecture", description: "About the Department", image: image2 },
  { id: "Phy", title: "Physics", description: "About the Department", image: image3 },
  { id: "MATH", title: "Maths", description: "About the Department", image: Maths },
  { id: "Chem", title: "Chemistry", description: "About the Department", image: chem },
  { id: "Bsc", title: "BSc", description: "About the Department", image: bsc },
  { id: "CSE", title: "Computer Science", description: "About the Department", image: cse },
  { id: "CIVIL", title: "Civil", description: "About the Department", image: civil },
  { id: "EEE", title: "Electrical and Electronics", description: "About the Department", image: eee },
  { id: "ECE", title: "Electronics and Communication", description: "About the Department", image: ece },
  { id: "ISE", title: "Information Science", description: "About the Department", image: ise },
  { id: "MBA", title: "MBA", description: "About the Department", image: mba },
  { id: "MECH", title: "Mechanical", description: "About the Department", image: Mechanical },
  { id: "AIML", title: "AIML", description: "About the Department", image: ai },
];

const DepartmentEvents = () => {
  const navigate = useNavigate();

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

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth"
      style={{
        background: "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}
    >
      {/* === STAR BACKGROUND === */}
      <div id="star-container" className="stars absolute w-full h-full"></div>

      {/* === NAVBAR === */}
      <div className="relative z-[60]">
        <NavigationBar />
      </div>

      {/* === PAGE CONTENT === */}
      <div
        className="
          relative z-[20]
          w-full
          pt-32 sm:pt-28 pb-20
          px-4 sm:px-6 lg:px-8
          flex flex-col items-center
        "
      >
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-20 w-full">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-nasal text-[#00eaff] drop-shadow-[0_0_15px_rgba(0,234,255,0.7)] mb-3">
            Departmental Events
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl font-orbitron text-gray-100">
            Discover the main highlights of AVALANCHE
          </p>
        </div>

        {/* === EVENT GRID === */}
        <div
          className="
            flex flex-wrap
            gap-6 sm:gap-8 lg:gap-10 xl:gap-12
            justify-center
            mx-auto
            w-full
            max-w-[1400px]
            px-4 sm:px-6 md:px-8
            z-[30]
          "
        >
          {DepartmentsData.map((dept) => {
            const slug = dept.id;
            return (
              <div
                key={dept.id}
                onClick={() => navigate(`/events/department-events/${slug}`)}
                className="cursor-pointer transition-transform duration-300 hover:scale-105 
                          w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)]
                          max-w-[350px]"
              >
                <EventCard
                  title={dept.title}
                  image={dept.image}
                />
              </div>
            );
          })}
        </div>
      </div>


      {/* === FOOTER === */}
      <Footer />

      {/* === STYLES === */}
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
    </div>
  );
};

export default DepartmentEvents;
