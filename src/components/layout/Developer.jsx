import React, { useState, useEffect } from 'react';
import NavigationBar from './Common/Navbar';
import amogh from "../../assets/Amogh.jpeg";
import darshan from "../../assets/Darshan.jpeg";
import Footer from "../../components/layout/Common/footer";
import BackButton from '../layout/Common/BackButton';


const DeveloperCard = ({ name, designation, developerType, linkedin, phone, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-72 h-80 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full bg-transparent overflow-visible
          transition-all duration-500 ease-out
          ${isHovered ? "scale-[1.02]" : "scale-100"}
        `}
      >
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20">
          <div
            className={`
              w-40 h-40 rounded-full bg-cover bg-center border-4 border-[#00f7ff]
              shadow-[0_0_20px_rgba(0,247,255,0.6)]
              transition-all duration-500
              ${isHovered ? "scale-110 shadow-[0_0_30px_rgba(0,247,255,0.9)]" : ""}
            `}
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>

        <span
          className={`absolute inset-0 pointer-events-none bg-gradient-to-br from-[#0a1929] to-[#051320] transition-all duration-300 ${
            isHovered ? "scale-105" : ""
          }`}
          style={{
            clipPath:
              "polygon(30px 0, calc(100% - 30px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0 calc(100% - 30px), 0 30px)",
            border: "1px solid #00f7ff",
            boxShadow: isHovered
              ? "0 0 30px rgba(0, 247, 255, 0.6)"
              : "0 0 15px rgba(0, 247, 255, 0.3)",
          }}
        ></span>

        <div className="pt-28 p-3 space-y-3 relative z-10 text-center">
          <h3 className="text-2xl font-nasal font-bold text-[#00f7ff] drop-shadow-[0_0_10px_rgba(0,247,255,0.8)]">
            {name}
          </h3>
          <p className="text-lg text-[#ffcc00] font-orbitron font-semibold drop-shadow-[0_0_8px_rgba(255,204,0,0.6)]">
            {designation}
          </p>
          <div>
            <span className="px-3 py-1 bg-[rgba(0,247,255,0.1)] border border-[#00f7ff] rounded-full text-sm text-[#b0f7ff] font-nasal font-bold">
              {developerType}
            </span>
          </div>

          <div className="flex justify-center items-center gap-6 pt-4">
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0077b5] to-[#005582] flex items-center justify-center border-2 border-[#00f7ff] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,119,181,0.8)]">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </a>

            <a href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center border-2 border-[#00f7ff] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(37,211,102,0.8)]">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {[
          { pos: "top-0 left-0", h_pos: "top-0 left-0", v_pos: "top-0 left-0" },
          { pos: "top-0 right-0", h_pos: "top-0 right-0", v_pos: "top-0 right-0" },
          { pos: "bottom-0 left-0", h_pos: "bottom-0 left-0", v_pos: "bottom-0 left-0" },
          { pos: "bottom-0 right-0", h_pos: "bottom-0 right-0", v_pos: "bottom-0 right-0" },
        ].map((corner, i) => (
          <div key={i} className={`absolute ${corner.pos} w-8 h-8 z-30 pointer-events-none`}>
            {[
              { pos: corner.h_pos, size: "w-full h-[3px]" },
              { pos: corner.v_pos, size: "h-full w-[3px]" }
            ].map((line, j) => (
              <div
                key={j}
                className={`absolute ${line.pos} ${line.size} bg-[#00f7ff] transition-all duration-700 ${
                  isHovered ? "shadow-[0_0_10px_#e5ac0d] bg-[#fceb8c]" : ""
                }`}
                style={{
                  animation: isHovered ? "pulseGlow 2s infinite ease-in-out" : "none",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <style>
        {`
        @keyframes pulseGlow {
          25%, 100% { opacity: 0.8; filter: drop-shadow(0 0 6px #00f7ff); }
          50% { opacity: 0.4; filter: drop-shadow(0 0 12px #00f7ff); }
        }
        `}
      </style>
    </div>
  );
};

const DevelopersPage = () => {
  useEffect(() => {
    const numStars = 140;
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
  const developersData = [
    {
      id: 1,
      name: "KOUSHAL KEDARI",
      designation: "403-METADOCK",
      developerType: "Production Team",
      linkedin: "https://www.linkedin.com/in/koushal-kedari/",
      phone: "+919663362250",
      image: "https://media.licdn.com/dms/image/v2/D5603AQGFeQsVpYBQkg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706472933559?e=1762387200&v=beta&t=6EMTzXzUvHGXjN7BHVro4hItrUo_Tdw155uF-xEVS2w"
    },
      {
      id: 2,
      name: "Darshan Mutalikdesai",
      designation: "Loudspeaker",
      developerType: "Full Stack Developer",
      linkedin: "https://www.linkedin.com/in/darshan-mutalikdesai-b4a4832a0/",
      phone: "7204092064",
      image: darshan
    },
    
    {
      id: 3,
      name: "PRATIK SADEKAR ",
      designation: "DOMinator",
      developerType: "Frontend Developer",
      linkedin: "https://www.linkedin.com/in/pratik-sadekar-3a9394271/",
      phone: "+919380313099",
      image: "https://media.licdn.com/dms/image/v2/D5603AQGFVOv9mUCJLQ/profile-displayphoto-shrink_200_200/B56ZP2Qt8zG8AY-/0/1735003399375?e=1762992000&v=beta&t=ykc13YneslZ2iODxA99QKc2ud-Y_d5V1EsDdRoXIYHA"
    },

    {
      id: 4,
      name: "LAXMAN DESAI",
      designation: "200 OK",
      developerType: "Backend Dev`",
      linkedin: "https://www.linkedin.com/in/desai-laxman/",
      phone: "+919380055232",
      image: "https://media.licdn.com/dms/image/v2/D5603AQEvGCv7y6GM5w/profile-displayphoto-shrink_200_200/B56Zc0rsfJHoAY-/0/1748935560749?e=1762992000&v=beta&t=7hf1MEudIAVXl0o_4y8QECVz0ErqeajZ0fm1jyeICB0"
    },
     {
      id: 5,
      name: "IAN D'SOUZA",
      designation: "Export Successful",
      developerType: "Frontend Designer",
      linkedin: "https://www.linkedin.com/in/dsouza-ian/",
      phone: "+919513421759",
      image: "https://media.licdn.com/dms/image/v2/D5603AQG4iYpm6_a63g/profile-displayphoto-shrink_400_400/B56ZSotL2NHwAk-/0/1737997206706?e=1762992000&v=beta&t=NzqEl6BYa_WqxF-GUmGSpDZWOGp2vj-TT8hMZ74KHMc"
    },
    {
      id: 6,
      name: "AMOGH KALLIMATH",
      designation: "Build-Succeeded-Barely",
      developerType: "Production Team",
      linkedin: "https://www.linkedin.com/in/amogh-kallimath-a6b06a292/",
      phone: "+916361234618",
      image: amogh
    },
    {
      id: 7,
      name: "Shreya Ammanagi",
      designation: "UI Alchemist",
      developerType: "Frontend Designer",
      linkedin: "https://www.linkedin.com/in/shreya-ammanagi-25670a2bb/",
      phone: "+919449685752",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQHoQL_W47Qqaw/profile-displayphoto-scale_200_200/B4DZhIM.jPGkAY-/0/1753558020380?e=1762992000&v=beta&t=iGxeDhFfb6W1XFOg7UQrVKRQbYsKNPZisRtu_rXcUIc"
    }
    
  ];

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto font-['Nasalization'] scroll-smooth"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)",
      }}>

        <div id="star-container" className="stars absolute w-full h-full"></div>


        <div className="relative z-[60]">
            <NavigationBar />
        </div>
      {/* Content */}
      <div className="relative z-[2] min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-20 sm:mb-24 lg:mb-28 pt-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-nasal font-semibold text-[#00eaff] drop-shadow-[0_0_15px_rgba(0,234,255,0.7)] mb-3">
            Meet the Developers
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-orbitron text-gray-100 opacity-100">
            The Brilliant Minds powering AVALANCHE
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-32 sm:gap-x-10 sm:gap-y-36 lg:gap-x-12 lg:gap-y-40 max-w-[1600px] mx-auto px-4 pb-20">
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
      </div>
        <div className="absolute bottom-[6rem] right-6 sm:right-10 z-[120]">
          <BackButton />
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

export default DevelopersPage;