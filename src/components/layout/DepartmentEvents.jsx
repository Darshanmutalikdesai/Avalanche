import React, { useState } from "react";
import EventCard from "../layout/Events/EventCard";
import centralEventsData from "../data/centralEventsData";
import BackgroundVideo from "../../assets/backround1.mp4";

const DepartmentEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Mock departmental events data
  // const mockDepartmentEventsData = [
  //   {
  //     id: 1,
  //     title: "Neural Network Architecture Design",
  //     description: "Advanced AI system design workshop for Computer Science students",
  //     department: "Computer Science",
  //     image: "/api/placeholder/300/200",
  //     instructions: "Design cutting-edge neural network architectures.\n\nRequirements:\n- Advanced programming skills\n- Machine learning background\n- Team size: 3-4 members\n- Duration: 3 days\n- Prize: 75,000 credits"
  //   },
  //   {
  //     id: 2,
  //     title: "Quantum Circuit Implementation",
  //     description: "Build and test quantum computing circuits",
  //     department: "Electronics",
  //     image: "/api/placeholder/300/200",
  //     instructions: "Implement quantum circuits using advanced hardware.\n\nSpecs:\n- Quantum development kit provided\n- Individual competition\n- Duration: 2 days\n- Prerequisites: Quantum mechanics knowledge\n- Winner receives quantum computer"
  //   },
  //   {
  //     id: 3,
  //     title: "Cybersecurity Penetration Testing",
  //     description: "Ethical hacking and security assessment challenge",
  //     department: "Information Security",
  //     image: "/api/placeholder/300/200",
  //     instructions: "Test and secure digital infrastructures.\n\nChallenge:\n- Live network penetration testing\n- Team size: 2-3 members\n- Duration: 24 hours\n- Legal framework provided\n- Internship opportunities available"
  //   },
  //   {
  //     id: 4,
  //     title: "Biomedical Device Innovation",
  //     description: "Design revolutionary healthcare technology solutions",
  //     department: "Biomedical Engineering",
  //     image: "/api/placeholder/300/200",
  //     instructions: "Create next-generation medical devices.\n\nGuidelines:\n- Focus on patient care improvement\n- Prototype development required\n- Team size: 4-5 members\n- Duration: 5 days\n- Funding opportunities for winners"
  //   },
  //   {
  //     id: 5,
  //     title: "Autonomous Vehicle Navigation",
  //     description: "Program self-driving car navigation systems",
  //     department: "Mechanical Engineering",
  //     image: "/api/placeholder/300/200",
  //     instructions: "Develop autonomous navigation algorithms.\n\nSpecifications:\n- Real vehicle testing platform\n- Team size: 4-6 members\n- Duration: 4 days\n- Safety protocols mandatory\n- Industry partnership prizes"
  //   },
  //   {
  //     id: 6,
  //     title: "Sustainable Energy Optimization",
  //     description: "Design efficient renewable energy systems",
  //     department: "Electrical Engineering",
  //     image: "/api/placeholder/300/200",
  //     instructions: "Optimize renewable energy distribution.\n\nProject scope:\n- Smart grid integration\n- Team size: 3-4 members\n- Duration: 3 days\n- Environmental impact analysis\n- Green technology awards"
  //   }
  // ];

  const departments = ["all", "Computer Science", "Electronics", "Information Security", "Biomedical Engineering", "Mechanical Engineering", "Electrical Engineering"];

  const filteredEvents = selectedDepartment === "all" 
    ? mockDepartmentEventsData 
    : mockDepartmentEventsData.filter(event => event.department === selectedDepartment);

  const MockEventCard = ({ title, description, department, image }) => (
    <div className="group relative overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-[1.02]">
      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-purple-400 opacity-60"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-400 opacity-60"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-400 opacity-60"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-purple-400 opacity-60"></div>

      {/* Department badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-purple-500/20 border border-purple-400/50 px-2 py-1 text-xs font-mono text-purple-300 backdrop-blur-sm">
          {department}
        </div>
      </div>

      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 flex items-center justify-center">
        <div className="text-6xl opacity-30">🔬</div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-purple-400 mb-3 font-mono tracking-wider">
          {title}
        </h3>
        <p className="text-purple-200 text-sm leading-relaxed">
          {description}
        </p>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900 z-0"></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5 z-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-40"
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
        <div className="min-h-full p-4 md:p-8 text-purple-400">
          {/* Header */}
          <div className="text-center mb-8 md:mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-purple-400 mb-4 tracking-wider drop-shadow-lg">
              <span className="inline-block animate-pulse">🔬</span>
              {' '}DEPARTMENTAL EVENTS{' '}
              <span className="inline-block animate-pulse">🔬</span>
            </h1>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-4"></div>
            <p className="text-lg md:text-xl text-purple-200 opacity-80 tracking-wide">
              SPECIALIZED COMPETITIONS BY ACADEMIC DEPARTMENTS
            </p>
          </div>

          {/* Department Filter */}
          <div className="mb-8 md:mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-mono border-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedDepartment === dept
                      ? 'border-purple-400 bg-purple-400/20 text-purple-300 shadow-lg shadow-purple-500/50'
                      : 'border-purple-400/50 text-purple-400 hover:border-purple-400 hover:bg-purple-400/10'
                  }`}
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%)'
                  }}
                >
                  {dept === "all" ? "[ALL DEPARTMENTS]" : `[${dept.toUpperCase()}]`}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6 md:gap-8 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
              >
                <MockEventCard
                  title={event.title}
                  description={event.description}
                  department={event.department}
                  image={event.image}
                />
              </div>
            ))}
          </div>

          {/* No events message */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 opacity-50">⚠️</div>
              <p className="text-purple-400 text-xl font-mono">
                [NO EVENTS FOUND FOR SELECTED DEPARTMENT]
              </p>
            </div>
          )}

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
            className="bg-gray-900/90 backdrop-blur-md p-6 md:p-8 rounded-xl border border-purple-400/50 shadow-lg shadow-purple-500/50 max-w-lg w-full text-purple-400 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal corner decorations */}
            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-purple-400"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-400"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-400"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-purple-400"></div>

            {/* Department badge in modal */}
            <div className="text-center mb-4">
              <span className="inline-block bg-purple-500/20 border border-purple-400/50 px-3 py-1 text-sm font-mono text-purple-300 backdrop-blur-sm">
                {selectedEvent.department}
              </span>
            </div>

            {/* Modal content */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center tracking-wider text-purple-400">
                {selectedEvent.title}
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-6"></div>
              <p className="mb-8 whitespace-pre-line text-purple-200 leading-relaxed">
                {selectedEvent.instructions}
              </p>
              
              {/* Close button */}
              <div className="flex justify-center">
                <button
                  className="px-6 py-3 bg-transparent border-2 border-purple-400 text-purple-400 font-bold font-mono tracking-wider transition-all duration-300 hover:bg-purple-400 hover:text-black hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95"
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

export default DepartmentEvents;