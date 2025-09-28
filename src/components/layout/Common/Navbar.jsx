import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Github,
  Heart,
  MessageCircle,
  Twitter,
  Zap,
  UserPlus,
  Code2,
  CalendarDays,
  LogIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ React Router DOM navigation

const NavigationBar = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const canvasRef = useRef(null);
  const puffsCanvasRef = useRef(null);
  const navigate = useNavigate(); // ✅ get navigate function

  // Load font and background animations as before
  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  // ... keep your background canvas animations (dots/puffs) here

  const navItems = [
    { name: "Event Registration", href: "/events", icon: UserPlus },
    { name: "Developer", href: "/developer", icon: Code2 },
    { name: "Schedules", href: "/schedules", icon: CalendarDays },
    { name: "Login", href: "/auth", icon: LogIn },
  ];

  const NavigationModal = () => (
    <div
      className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-md transition-opacity duration-300 flex items-center justify-center p-4 ${
        isNavigationOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.3 }} />
      <canvas ref={puffsCanvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.25 }} />

      <div className="w-full max-w-md sm:max-w-lg p-0 overflow-hidden rounded-lg shadow-lg">
        <div className="bg-gradient-to-b from-cyan-900/20 to-cyan-900/5 p-6 sm:p-8 flex flex-col items-center justify-center text-center relative">
          <button
            onClick={() => setIsNavigationOpen(false)}
            className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-300 transition-colors p-1"
          >
            <X size={28} />
          </button>

          <nav className="flex flex-col items-center justify-center space-y-6 mb-8 mt-6 w-full">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.href); // ✅ Navigate with React Router
                  setIsNavigationOpen(false);
                }}
                className="flex items-center space-x-3 p-3 rounded transition-all duration-200 w-full justify-center text-cyan-400/90 hover:text-cyan-300 hover:bg-cyan-400/10 text-2xl font-light"
              >
                <item.icon size={24} />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <header className="relative z-10 w-full">
      <div className="flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
            <Zap size={16} className="text-black" />
          </div>
          <span className="text-cyan-400 text-lg sm:text-xl font-light tracking-wider">
            AVALANCHE
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.href)}
              className="flex items-center space-x-2 px-3 py-2 rounded transition-all duration-200 text-base text-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-400/10"
            >
              <item.icon size={18} />
              <span className="font-light">{item.name}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={() => setIsNavigationOpen(true)}
          className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 md:hidden"
        >
          <Menu size={24} />
        </button>
      </div>

      <NavigationModal />
    </header>
  );
};

export default NavigationBar;
