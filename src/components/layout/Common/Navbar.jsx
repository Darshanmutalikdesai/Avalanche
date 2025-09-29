import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Zap,
  UserPlus,
  Code2,
  CalendarDays,
  LogIn,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const canvasRef = useRef(null);
  const puffsCanvasRef = useRef(null);
  const location = useLocation();

  // Load font
  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  const navItems = [
    { name: "Home", href: "/home", icon: Zap }, // Changed from "/home" to "/"
    { name: "Event Registration", href: "/events", icon: UserPlus },
    { name: "Developer", href: "/developer", icon: Code2 },
    { name: "Schedules", href: "/schedules", icon: CalendarDays },
    { name: "Login", href: "/auth", icon: LogIn },
  ];

  // Mobile Slide-in Navigation
  const NavigationModal = () => (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center"
      onClick={() => setIsNavigationOpen(false)}
    >
      <div 
        className="w-full max-w-md px-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsNavigationOpen(false)}
          className="absolute top-8 right-8 text-cyan-400 hover:text-cyan-300 transition-colors"
          aria-label="Close menu"
        >
          <X size={32} />
        </button>

        {/* Nav Items */}
        <nav className="flex flex-col space-y-6 mt-20">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setIsNavigationOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-4 px-6 py-4 rounded-lg transition-all text-xl font-medium ${
                  isActive
                    ? "bg-cyan-500/90 text-black shadow-lg shadow-cyan-400/50"
                    : "text-cyan-300 hover:text-white hover:bg-cyan-400/20 bg-black/20"
                }`
              }
            >
              <item.icon size={24} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <header className="relative z-10 w-full">
      {/* Top Nav Bar */}
      <div className="flex items-center justify-between p-4 sm:p-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
            <Zap size={16} className="text-black" />
          </div>
          <span className="text-cyan-400 text-lg sm:text-xl font-light tracking-wider">
            AVALANCHE 2025
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded transition-all duration-200 text-base font-light ${
                  isActive
                    ? "bg-cyan-500 text-black shadow-md shadow-cyan-400/50"
                    : "text-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-400/10"
                }`
              }
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsNavigationOpen(true)}
          className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Modal */}
      {isNavigationOpen && <NavigationModal />}
    </header>
  );
};

export default NavigationBar;