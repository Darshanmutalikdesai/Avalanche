import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../layout/Events/EventCard";
import NavigationBar from "./Common/Navbar";
import image1 from "../../assets/treasure_image.jpg";
import image2 from "../../assets/hackathon_image.jpg";
import image3 from "../../assets/debate_image.jpg";
import Footer from "../../components/layout/Common/footer";

export const DepartmentsData = [
  { id: "AERO", title: "Aeronautical", description: "About the Department", image: image1 },
  { id: "ARCH", title: "Architecture", description: "About the Department", image: image2 },
  { id: "Phy", title: "Physics", description: "About the Department", image: image3 },
  { id: "MATH", title: "Maths", description: "About the Department", image: image3 },
  { id: "Chem", title: "Chemistry", description: "About the Department", image: image3 },
  { id: "Bsc", title: "BSc", description: "About the Department", image: image3 },
  { id: "CSE", title: "Computer Science", description: "About the Department", image: image3 },
  { id: "CIVIL", title: "Civil", description: "About the Department", image: image3 },
  { id: "EEE", title: "Electrical and Electronics", description: "About the Department", image: image3 },
  { id: "ECE", title: "Electronics and Communication", description: "About the Department", image: image3 },
  { id: "ISE", title: "Information Science", description: "About the Department", image: image3 },
  { id: "MBA", title: "MBA", description: "About the Department", image: image3 },
  { id: "MECH", title: "Mechanical", description: "About the Department", image: image3 },
  { id: "AIML", title: "AIML", description: "About the Department", image: image3 },
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
      <div className="relative z-[2] min-h-screen pt-32 pb-20 sm:pt-28 px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-20">
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
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
            gap-10 sm:gap-12 
            flex-items-center
            justify-items-center 
            mx-auto max-w-[1200px]
          "
        >
          {DepartmentsData.map((dept) => {
            const slug = dept.id;
            return (
              <div
                key={dept.id}
                onClick={() => navigate(`/events/department-events/${slug}`)}
                className="cursor-pointer flex justify-center"
              >
                <EventCard
                  title={dept.title}
                  description={dept.description}
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
