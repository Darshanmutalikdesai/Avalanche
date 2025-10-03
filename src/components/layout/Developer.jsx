import React, { useState } from 'react';
import BackgroundVideo from "../../assets/backround1.mp4"; // ⬅️ Replace with your actual video path

const DeveloperCard = ({ name, designation, developerType, linkedin, phone, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-72 h-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full
          bg-gradient-to-br from-[#0a1929] to-[#051320]
          border-2 border-[#00f7ff]
          rounded-2xl
          overflow-visible
          transition-all duration-500 ease-out
          ${isHovered ? 'shadow-[0_0_30px_rgba(0,247,255,0.6)] scale-105' : 'shadow-[0_0_15px_rgba(0,247,255,0.3)]'}
        `}
      >
        {/* Circular Image Section */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10">
          <div
            className={`
              w-32 h-32 rounded-full
              bg-cover bg-center
              border-4 border-[#00f7ff]
              shadow-[0_0_20px_rgba(0,247,255,0.6)]
              transition-all duration-500
              ${isHovered ? 'scale-110 shadow-[0_0_30px_rgba(0,247,255,0.9)]' : 'scale-100'}
            `}
            style={{
              backgroundImage: `url(${image})`
            }}
          />
        </div>

        {/* Content Section */}
        <div className="pt-20 p-6 space-y-3">
          <h3 className="text-xl font-bold text-[#00f7ff] drop-shadow-[0_0_10px_rgba(0,247,255,0.8)] text-center">
            {name}
          </h3>
          <p className="text-sm text-[#ffcc00] font-semibold text-center drop-shadow-[0_0_8px_rgba(255,204,0,0.6)]">
            {designation}
          </p>
          <div className="flex justify-center">
            <span className="px-3 py-1 bg-[rgba(0,247,255,0.1)] border border-[#00f7ff] rounded-full text-xs text-[#b0f7ff] font-medium">
              {developerType}
            </span>
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-6 pt-4">
            {/* LinkedIn */}
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0077b5] to-[#005582] flex items-center justify-center border-2 border-[#00f7ff] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,119,181,0.8)]">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
            </a>

            {/* WhatsApp */}
            <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center border-2 border-[#00f7ff] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(37,211,102,0.8)]">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Corners */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#00f7ff]"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#00f7ff]"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#00f7ff]"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#00f7ff]"></div>
      </div>
    </div>
  );
};

const DevelopersPage = () => {
  const developersData = [
    {
      id: 1,
      name: "Koushal",
      designation: "Technical Secretary",
      developerType: "Full Stack Developer",
      linkedin: "https://linkedin.com/in/johndoe",
      phone: "+1234567890",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Darshan Mutalikdesai",
      designation: "Student Council",
      developerType: "Full Stack Developer",
      linkedin: "https://linkedin.com/in/janesmith",
      phone: "+1234567891",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Pratik ",
      designation: "Backend Lead",
      developerType: "Backend Developer",
      linkedin: "https://linkedin.com/in/mikejohnson",
      phone: "+1234567892",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Sarah Williams",
      designation: "UI/UX Designer",
      developerType: "Designer",
      linkedin: "https://linkedin.com/in/sarahwilliams",
      phone: "+1234567893",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "David Brown",
      designation: "DevOps Engineer",
      developerType: "DevOps",
      linkedin: "https://linkedin.com/in/davidbrown",
      phone: "+1234567894",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Emily Davis",
      designation: "Mobile Developer",
      developerType: "Mobile Developer",
      linkedin: "https://linkedin.com/in/emilydavis",
      phone: "+1234567895",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-y-auto font-['Titillium_Web',sans-serif] text-[#00f7ff]">
      {/* Background Video */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src={BackgroundVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Dark Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-[1]"></div>

      {/* Content */}
      <div className="relative z-[2] min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-20 sm:mb-24 lg:mb-28 pt-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#00eaff] drop-shadow-[0_0_15px_rgba(0,234,255,0.7)] mb-3">
            Our Developers
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#b0f7ff] opacity-80">
            Meet the minds behind AVALANCHE
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-32 sm:gap-x-10 sm:gap-y-36 lg:gap-x-12 lg:gap-y-40 max-w-7xl mx-auto px-4 pb-20">
          {developersData.map((developer) => (
            <DeveloperCard
              key={developer.id}
              name={developer.name}
              designation={developer.designation}
              developerType={developer.developerType}
              linkedin={developer.linkedin}
              phone={developer.phone}
              image={developer.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevelopersPage;
