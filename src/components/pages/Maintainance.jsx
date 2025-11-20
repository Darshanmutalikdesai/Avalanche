import React, { useEffect } from "react";
import milestone1600 from "../../assets/1600.png";
import ava from "../../assets/Avalanche.png";
import bgAudio from "../../assets/paradise.mp3";

const RegistrationCompletePage = () => {
  // Stars effect
  useEffect(() => {
    const numStars = 150;
    const container = document.getElementById("star-container");
    if (!container) return;
    container.innerHTML = "";

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";
      star.style.animationDelay = Math.random() * 5 + "s";
      const size = Math.random() * 4 + 2;
      star.style.width = size + "px";
      star.style.height = size + "px";
      container.appendChild(star);
    }
  }, []);

  // Audio effect - SEPARATE useEffect
  useEffect(() => {
    const audio = new Audio(bgAudio);
    audio.loop = true;
    audio.volume = 0.4;

    const playAudio = () => audio.play().catch(() => {});
    playAudio();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
    
  }, []);

  // Fireworks effect - SEPARATE useEffect
  useEffect(() => {
    const fireworksContainer = document.getElementById("fireworks-container");
    if (!fireworksContainer) return;

    const createFirework = () => {
      const firework = document.createElement("div");
      firework.className = "firework";

      firework.style.left = Math.random() * 100 + "%";
      firework.style.top = Math.random() * 40 + 20 + "%";

      const colors = [
        "#fbbf24",
        "#f59e0b",
        "#ef4444",
        "#3b82f6",
        "#8b5cf6",
        "#ec4899",
        "#10b981",
        "#f97316",
      ];

      const color = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        particle.className = "firework-particle";

        particle.style.background = color;
        particle.style.boxShadow = `0 0 8px ${color}`;

        const angle = (Math.PI * 2 * i) / 40;
        const velocity = 120 + Math.random() * 80;

        particle.style.setProperty("--tx", Math.cos(angle) * velocity + "px");
        particle.style.setProperty("--ty", Math.sin(angle) * velocity + "px");

        firework.appendChild(particle);
      }

      fireworksContainer.appendChild(firework);

      setTimeout(() => firework.remove(), 2000);
    };

    const interval = setInterval(createFirework, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative min-h-screen w-screen overflow-hidden font-['Nasalization'] flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #1e1b4b 0%, #0f172a 50%, #000 100%)",
      }}
    >
      <div id="star-container" className="stars absolute w-full h-full"></div>
      <div
        id="fireworks-container"
        className="fireworks absolute w-full h-full pointer-events-none"
      ></div>

      <div className="relative z-50 w-full h-20px flex items-center justify-center">
        <div className="credits-container w-full">
          <div className="crawl">

            {/* HEADER */}
            <div className="text-white text-center px-4 space-y-8">

              <div className="w-full flex justify-center items-center text-center px-4">
                <h1
                  className="text-yellow-400 font-bold leading-tight"
                  style={{
                    fontSize: "clamp(4rem, 12vw, 14rem)",
                    lineHeight: "1.1",
                  }}
                >
                  Congratulations!
                </h1>
              </div>

              <div className="flex justify-center mt-6">
                <img
                  src={milestone1600}
                  alt="1600 milestone"
                  className="w-[280px] sm:w-[380px] md:w-[500px] lg:w-[700px] xl:w-[900px] drop-shadow-2xl"
                />
              </div>

              <p className="text-blue-300 text-6xl sm:text-8xl md:text-10xl font-semibold">
                REGISTRATIONS MILESTONE ACHIEVED 
              </p>
            </div>

            {/* COORDINATORS */}
            <div className="section-card border-blue-400/20 bg-blue-900/20">
              <h3 className="section-title text-blue-200">COORDINATORS</h3>
              <p className="section-text">Dr. Swetha Patil</p>
              <p className="section-text">Prof. Sruthi Mutgekar</p>
            </div>

            {/* STUDENT COORDINATORS */}
            <div className="section-card border-purple-400/20 bg-purple-900/20">
              <h3 className="section-title text-purple-200">STUDENT COORDINATORS</h3>
              <p className="section-text">Koushal S Kedari</p>
              <p className="section-text">Aditya Math</p>
            </div>

            {/* CONVENERS */}
            <div className="section-card border-green-400/20 bg-green-900/20">
              <h3 className="section-title text-green-200">
                CONVENERS
              </h3>
              <p className="section-text">Prof. V. R. Chate</p>
              <p className="section-text">Prof. Jyothi. S. Patil</p>
            </div>

            {/* DEAN */}
            <div className="section-card border-indigo-400/20 bg-indigo-900/20">
              <h3 className="section-title text-indigo-200">DEAN STUDENT AFFAIRS</h3>
              <p className="section-text">Prof. Satish .P. Deshpande</p>
            </div>

            {/* PRINCIPAL */}
            <div className="section-card pb-20 border-orange-400/20 bg-orange-900/20">
              <h3 className="section-title text-orange-300">PRINCIPAL</h3>
              <p className="section-text">Dr. M. S Patil</p>
            </div>

            <div className="justify-center pt-40">
              <h3 className="text-center text-6xl sm:text-8xl md:text-[9rem] text-cyan-400 font-bold">
                TECH TEAM
              </h3>
            </div>

            {/* PRODUCTION TEAM */}
            <div className="section-card border-orange-400/20 bg-cyan-900">
              <h3 className="section-title text-orange-300">PRODUCTION TEAM</h3>
              <p className="section-text">KOUSHAL KEDARI</p>
              <p className="section-text">AMOGH KALLIMATH</p>
            </div>

            {/* FRONTEND */}
            <div className="section-card border-orange-400/20 bg-cyan-900">
              <h3 className="section-title text-orange-300">FRONTEND TEAM</h3>
              <p className="section-text">DARSHAN MUTALIKDESAI</p>
              <p className="section-text">PRATIK SADEKAR</p>
            </div>

            {/* BACKEND */}
            <div className="section-card border-orange-400/20 bg-cyan-900">
              <h3 className="section-title text-orange-300">BACKEND TEAM</h3>
              <p className="section-text">LAXMAN DESAI</p>
            </div>

            {/* GRAPHICS */}
            <div className="section-card border-orange-400/20 bg-cyan-900">
              <h3 className="section-title text-orange-300">GRAPHICS TEAM</h3>
              <p className="section-text">IAN D'SOUZA</p>
              <p className="section-text">SHREYA AMMANAGI</p>
            </div>

            {/* SPECIAL THANKS */}
            <div className="section-card border-pink-400/20 bg-pink-900/20 mt-16">
              <h3 className="section-title text-pink-300">SPECIAL THANKS</h3>
              <p className="section-text">Karnataka Law Society</p>
              <p className="section-text">Gogte Institute of Technology</p>
              <p className="text-blue-300 text-2xl sm:text-4xl md:text-5xl mt-3">
                & To all 1600+ participants
              </p>
            </div>

            {/* FOOTER LOGO */}
            <div className="mt-28 flex flex-col items-center">
              <img
                src={ava}
                alt="Avalanche Logo"
                className="w-[250px] sm:w-[350px] md:w-[500px] lg:w-[700px] xl:w-[900px] drop-shadow-2xl"
              />
              <p className="text-2xl sm:text-4xl md:text-5xl text-white mt-4">
                Gogte Institute of Technology
              </p>
              <p className="text-center text-4xl sm:text-6xl md:text-8xl text-white mt-2 font-bold">
                TECH TEAM SIGNING OFF
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        html, body { overflow: hidden !important; }

        .stars .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s infinite alternate, drift 15s linear infinite;
          opacity: 0.8;
        }

        @keyframes twinkle {
          from { opacity: 0.3; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1.3); }
        }

        @keyframes drift {
          from { transform: translate(0,0); }
          to { transform: translate(60px,60px); }
        }

        .firework { position: absolute; }
        .firework-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: explode 1.8s ease-out forwards;
        }

        @keyframes explode {
          0% { transform: translate(0,0); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)); opacity: 0; }
        }

        /* CRAWL */
        .credits-container {
          height: 100vh;
          overflow: hidden;
          perspective: 2100px;
          mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        }

        /* FIX MOBILE WIDTH */
        .crawl {
          transform-origin: 50% 100%;
          animation: crawlAnim 28s linear infinite;
          width: 100%;
          transform: translateX(-10%);
        }

        /* TABLET */
        @media (min-width: 640px) {
          .crawl {
            width: 100%;
          }
        }

        /* SMALL LAPTOP */
        @media (min-width: 1024px) {
          .crawl {
            width: 100%;
          }
        }

        /* LARGE DESKTOP */
        @media (min-width: 1280px) {
          .crawl {
            width: 100%;
          }
        }

        @keyframes crawlAnim {
          0%   { transform: translateY(0vh) rotateX(45deg); }
          100% { transform: translateY(-100%) rotateX(45deg); }
        }

        /* Bigger & More Responsive Cards */
        .section-card {
          text-align: center;
          color: white;
          padding: 2rem;
          margin: 3rem auto;
          border-radius: 1rem;
          width: 95%;
          max-width: 1800px;
        }

        /* Bigger Titles */
        .section-title {
          font-size: clamp(3rem, 6vw, 8rem);
          margin-bottom: 1rem;
          font-weight: bold;
        }

        /* Better text scaling */
        .section-card p {
          font-size: clamp(2rem, 5vw, 6rem);
        }

      `}</style>
    </div>
  );
};

export default RegistrationCompletePage;