import React, { useState, useEffect } from "react";
import {
  Zap,
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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../../assets/weblogo.svg";
import { Button } from "@/components/ui/button";

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 🌫 Scroll effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔐 Detect if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      // Check for userId and user data to ensure user is logged in
      const userId = localStorage.getItem("userId");
      const userData = localStorage.getItem("user");
      const newLoginState = !!(userId && userData);
      
      if (newLoginState !== isLoggedIn) {
        setIsLoggedIn(newLoginState);
      }
    };

    checkAuth();

    // Listen for custom auth event (for Google OAuth callback)
    const handleAuthChange = () => checkAuth();
    window.addEventListener("authStateChanged", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    
    return () => {
      window.removeEventListener("authStateChanged", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, [location, isLoggedIn]); // Re-check when location changes

  // 🌐 Navigation items (dynamic last item)
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

  // 🧭 Handle click on Login/User Portal
  const handleAuthClick = () => {
    if (isLoggedIn) {
      navigate("/user-portal");
    } else {
      navigate("/auth");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 font-nasal ${
        isScrolled
          ? "bg-black/60 backdrop-blur-lg shadow-md py-2"
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
              {item.name === "Login" || item.name === "User Portal" ? (
                // ✅ For Auth / Portal button
                <button
                  onClick={handleAuthClick}
                  className={`group relative flex items-center gap-2 text-[15px] xl:text-[17px] font-semibold transition-colors duration-200 ${
                    location.pathname === item.href
                      ? "text-cyan-300"
                      : "text-white hover:text-cyan-300"
                  }`}
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
                </button>
              ) : (
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2 text-[15px] xl:text-[17px] font-semibold transition-colors duration-200 ${
                      isActive
                        ? "text-cyan-300"
                        : "text-white hover:text-cyan-300"
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
              )}
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

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-black backdrop-blur-lg border-t border-cyan-500/30 md:hidden flex flex-col items-center space-y-4 py-6"
          >
            {navItems.map((item) => (
              <Button
                key={item.name}
                onClick={() => {
                  if (item.name === "Login" || item.name === "User Portal") {
                    handleAuthClick();
                  } else {
                    navigate(item.href);
                  }
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 text-white hover:text-cyan-300 text-lg font-semibold border border-white/20 hover:border-cyan-400/50 px-6 py-2 rounded-xl transition-all duration-300 w-[85%] justify-center shadow-md hover:shadow-cyan-400/40 bg-transparent hover:bg-white/5"
              >
                <item.icon size={22} />
                {item.name}
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavigationBar;