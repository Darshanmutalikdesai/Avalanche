import React, { useState } from "react";
import EventCard from "../layout/Events/EventCard";
import centralEventsData from "../data/centralEventsData";
import BackgroundVideo from "../../assets/backround1.mp4";

const CentralEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock data for demo purposes
  // const mockCentralEventsData = [
  //   {
  //     id: 1,
  //     title: "Cyber Combat Championship",
  //     description: "Elite cyber warfare competition with cutting-edge technology",
  //     image: "/api/placeholder/300/200",
  //     instructions: "Join the ultimate cyber combat experience.\n\nRules:\n- Advanced neural interface required\n- Team size: 4-6 members\n- Duration: 48 hours\n- Prize pool: 100,000 credits"
  //   },
  //   {
  //     id: 2,
  //     title: "Neural Network Symposium",
  //     description: "Advanced AI and machine learning conference",
  //     image: "/api/placeholder/300/200",
  //     instructions: "Explore the frontiers of artificial intelligence.\n\nSchedule:\n- Day 1: Keynote presentations\n- Day 2: Technical workshops\n- Day 3: Innovation showcase\n- Registration fee: 500 credits"
  //   },
  //   {
  //     id: 3,
  //     title: "Quantum Computing Workshop",
  //     description: "Hands-on quantum computing experience",
  //     image: "/api/placeholder/300/200",
  //     instructions: "Dive into quantum computing fundamentals.\n\nRequirements:\n- Basic quantum mechanics knowledge\n- Laptop with quantum simulator\n- Duration: 2 days\n- Limited to 50 participants"
  //   },
  //   {
  //     id: 4,
  //     title: "Holographic Design Contest",
  //     description: "Create stunning holographic interfaces",
  //     image: "/api/placeholder/300/200",
  //     instructions: "Design the future of holographic interfaces.\n\nSubmission guidelines:\n- Original holographic designs\n- Interactive prototypes preferred\n- Deadline: 30 days\n- Winner receives 50,000 credits"
  //   }
  // ];

  const MockEventCard = ({ title, description, image }) => (
    <div className="group relative overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-lg transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-[1.02]">
      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400 opacity-60"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400 opacity-60"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400 opacity-60"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400 opacity-60"></div>

      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 flex items-center justify-center">
        <div className="text-6xl opacity-30">🚀</div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-3 font-mono tracking-wider">
          {title}
        </h3>
        <p className="text-cyan-200 text-sm leading-relaxed">
          {description}
        </p>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black overflow-hidden font-mono">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={BackgroundVideo} type="video/mp4" />
      </video>

      {/* Fallback gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900 z-0"></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5 z-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 247, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 247, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 h-full overflow-y-auto">
        <div className="min-h-full p-4 md:p-8 text-cyan-400">
          {/* Header */}
          <div className="text-center mb-12 md:mb-24">
            <h1 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-4 tracking-wider drop-shadow-lg">
              <span className="inline-block animate-pulse">⚡</span>
              {' '}CENTRAL EVENTS{' '}
              <span className="inline-block animate-pulse">⚡</span>
            </h1>
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-4"></div>
            <p className="text-lg md:text-xl text-cyan-200 opacity-80 tracking-wide">
              DISCOVER THE MAIN HIGHLIGHTS OF AVALANCHE
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid gap-8 md:gap-16 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-w-7xl mx-auto">
            {mockCentralEventsData.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
              >
                <MockEventCard
                  title={event.title}
                  description={event.description}
                  image={event.image}
                />
              </div>
            ))}
          </div>

          {/* Footer spacer */}
          <div className="h-16"></div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-gray-900/90 backdrop-blur-md p-6 md:p-8 rounded-xl border border-cyan-400/50 shadow-lg shadow-cyan-500/50 max-w-lg w-full text-cyan-400 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal corner decorations */}
            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>

            {/* Modal content */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center tracking-wider text-cyan-400">
                {selectedEvent.title}
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6"></div>
              <p className="mb-8 whitespace-pre-line text-cyan-200 leading-relaxed">
                {selectedEvent.instructions}
              </p>
              
              {/* Close button */}
              <div className="flex justify-center">
                <button
                  className="px-6 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold font-mono tracking-wider transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 active:scale-95"
                  onClick={() => setSelectedEvent(null)}
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)'
                  }}
                >
                  [CLOSE TRANSMISSION]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default CentralEvents;