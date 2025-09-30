import React, { useState } from "react";
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
import logo from "../../../assets/weblogo.svg";

const NavigationBar = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/home", icon: Zap },
    { name: "Event Registration", href: "/events", icon: UserPlus },
    { name: "Developer", href: "/developer", icon: Code2 },
    { name: "Schedules", href: "/schedules", icon: CalendarDays },
    { name: "Login", href: "/auth", icon: LogIn },
  ];

  // Mobile Slide-in Navigation
  const NavigationModal = () => (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center font-['Sweet_Rosetia_Sans']"
      onClick={() => setIsNavigationOpen(false)}
    >
      <div
        className="w-full max-w-md px-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsNavigationOpen(false)}
          className="absolute top-8 right-8 text-white hover:text-cyan-300 transition-colors"
          aria-label="Close menu"
        >
          <X size={36} /> {/* Bigger close button */}
        </button>

        {/* Nav Items */}
        <nav className="flex flex-col space-y-8 mt-24">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setIsNavigationOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-5 px-8 py-5 rounded-lg transition-all text-2xl font-semibold ${
                  isActive
                    ? "bg-cyan-500/90 text-black shadow-lg shadow-cyan-400/50"
                    : "text-white hover:text-cyan-300 hover:bg-cyan-400/20 bg-black/20"
                }`
              }
            >
              <item.icon size={28} /> {/* Bigger icons */}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <header className="relative z-10 w-full font-['Sweet_Rosetia_Sans']">
      {/* Top Nav Bar */}
      <div className="flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Avalanche Logo"
            className="h-24 w-auto sm:h-28" // Bigger logo
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded transition-all duration-200 text-lg font-medium ${
                  isActive
                    ? "bg-cyan-500 text-black shadow-md shadow-cyan-400/50"
                    : "text-white hover:text-cyan-300 hover:bg-cyan-400/10"
                }`
              }
            >
              <item.icon size={22} /> {/* Bigger icons */}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsNavigationOpen(true)}
          className="text-white hover:text-cyan-300 transition-colors p-3 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={32} /> {/* Bigger hamburger */}
        </button>
      </div>

      {/* Mobile Modal */}
      {isNavigationOpen && <NavigationModal />}
    </header>
  );
};

export default NavigationBar;
