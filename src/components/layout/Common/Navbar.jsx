import React, { useState, useEffect } from "react";
import {
  Zap,
  UserPlus,
  BookOpen,
  CalendarDays,
  Code2,
  Phone,
  User,
  LogIn,
  Rocket,
  X,
  Menu,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../../assets/weblogo.svg";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll blur
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auth token
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const navItems = [
    { name: "Home", href: "/home", icon: Zap },
    { name: "Event Registration", href: "/events", icon: Rocket },
    { name: "Rule Book", href: "/rulebook", icon: BookOpen },
    { name: "Schedules", href: "/schedules", icon: CalendarDays },
    { name: "Developer", href: "/developer", icon: Code2 },
    { name: "Contact", href: "/contact", icon: Phone },
    isLoggedIn
      ? { name: "User Portal", href: "/user-portal", icon: User }
      : { name: "Login", href: "/auth", icon: LogIn },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 font-nasal ${
        isScrolled
          ? "bg-black/40 backdrop-blur-lg shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between px-6 xl:px-12 2xl:px-24 whitespace-nowrap">
        {/* Logo */}
        <NavLink to="/home" className="flex items-center gap-3">
          <motion.img
            src={logo}
            alt="Avalanche Logo"
            className={`transition-all duration-300 ${
              isScrolled ? "h-12" : "h-16"
            }`}
            whileHover={{ scale: 1.05, rotate: 3 }}
          />
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center gap-8 xl:gap-10 2xl:gap-14">
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `group relative flex items-center gap-2 text-[15px] xl:text-[17px] font-semibold transition-colors duration-200 ${
                    isActive ? "text-cyan-300" : "text-white hover:text-cyan-300"
                  }`
                }
              >
                <item.icon size={20} />
                {item.name}
                <span
                  className={`absolute bottom-[-4px] left-0 h-[2px] bg-cyan-300 transition-all duration-300 ${
                    location.pathname === item.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (original bordered glowing style) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg border-t border-cyan-500/30 md:hidden flex flex-col items-center space-y-4 py-6"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-white hover:text-cyan-300 text-lg font-semibold border border-white/20 hover:border-cyan-400/50 px-6 py-2 rounded-xl transition-all duration-300 w-[85%] justify-center shadow-md hover:shadow-cyan-400/40"
              >
                <item.icon size={22} />
                {item.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavigationBar;
