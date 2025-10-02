import React from "react";
import EventCard from "../layout/Events/EventCard";
import BackgroundVideo from "../../assets/backround1.mp4";
import image1 from "../../assets/central_image.jpg";
import image2 from "../../assets/dept_image.jpg";
import image3 from "../../assets/puc_image.jpg";

const EventsPage = () => {
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
  description: "Department",
  image: image2,
  path: "/events/department-events",
},
{
  id: 3,
  title: "Blinking Galaxy",
  description: "High School and Pre-University",
  image: image3,
  path: "/events/puc-events",
},

  ];

  return (
    <div
      className="
        fixed inset-0 w-screen h-screen overflow-y-auto 
        font-['Titillium_Web',sans-serif] /* ⬅ apply your custom font everywhere */
        text-[#00f7ff]
      "
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={BackgroundVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-[1]"></div>

      {/* Content wrapper sits above video */}
      <div className="relative z-[2] min-h-screen p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-20 sm:mb-24 lg:mb-28 pt-20">
          {/* ⬆️ pushed further down with pt-16 & more bottom margin */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#00eaff] drop-shadow-[0_0_15px_rgba(0,234,255,0.7)] mb-3">
            EVENTS
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#b0f7ff] opacity-80">
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
    </div>
  );
};

export default EventsPage;