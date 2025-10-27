import React, { useEffect } from "react";
import NavigationBar from "./Common/Navbar";
import EventCard from "../layout/Events/EventCard";
import image1 from "../../assets/central_image.jpg";
import image2 from "../../assets/dept_image.jpg";
import image3 from "../../assets/puc_image.jpg";
import Footer from "../../components/layout/Common/footer";


const EventsPage = () => {
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
  const eventsData = [
    {
      id: 1,
      title: "Tadpole Galaxy",
      description: "Central Level",
      image: image1,
      path: "/events/central-events",
    },
    {
      id: 2,
      title: "Andromeda Galaxy",
      description: "Departmental Events",
      image: image2,
      path: "/events/department-events",
    },
    {
      id: 3,
      title: "Blinking Galaxy",
      description: "High School and Pre-University Level Events",
      image: image3,
      path: "/events/puc-events",
    },
  ];

  return (
    <div
      className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}>

        <div id="star-container" className="stars absolute w-full h-full"></div>


        <div className="relative z-[60]">
            <NavigationBar />
        </div>

      {/* Content wrapper sits above video */}
      <div className="relative z-[2] min-h-screen p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-20 sm:mb-24 lg:mb-28 pt-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#00eaff] drop-shadow-[0_0_15px_rgba(0,234,255,0.7)] mb-3">
            EVENTS
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 opacity-100">
            Explore the Galaxy of AVALANCHE
          </p>
        </div>

        {/* Grid */}
        <div
          className="
            flex flex-wrap
            justify-center
            gap-x-8 gap-y-32
            sm:gap-x-10 sm:gap-y-36
            lg:gap-x-12 lg:gap-y-40
            max-w-8xl
            mx-auto
            px-4
            pb-20
          "
        >
          {eventsData.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              image={event.image}
              path={event.path}
            />
          ))}
        </div>
      </div>

          <Footer/>

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

export default EventsPage;
