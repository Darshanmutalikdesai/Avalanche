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
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../../assets/weblogo.svg";

const NavigationBar = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/home", icon: Zap },
    { name: "Event Registration", href: "/events", icon: UserPlus },
    { name: "Schedules", href: "/schedules", icon: CalendarDays },
    { name: "Developer", href: "/developer", icon: Code2 },
    { name: "Login", href: "/auth", icon: LogIn },
  ];

  // Mobile Slide-in Navigation
  const NavigationModal = () => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center font-['Sweet_Rosetia_Sans']"
        onClick={() => setIsNavigationOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-md px-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            whileHover={{ rotate: 90, scale: 1.1 }}
            onClick={() => setIsNavigationOpen(false)}
            className="absolute top-8 right-8 text-white hover:text-cyan-300 transition-colors"
            aria-label="Close menu"
          >
            <X size={36} />
          </motion.button>

          {/* Nav Items */}
<nav className="flex flex-col space-y-8 mt-24">
  {navItems.map((item, index) => (
    <motion.div
      key={item.name}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 * index, duration: 0.3 }}
    >
      <NavLink
        to={item.href}
        onClick={() => setIsNavigationOpen(false)}
        className={({ isActive }) =>
          `flex items-center space-x-5 px-8 py-5 rounded-lg transition-all text-2xl font-semibold border border-cyan-300 border-opacity-40
          ${
            isActive
              ? "bg-cyan-500/90 text-black shadow-lg shadow-cyan-400/50"
              : "text-white hover:text-cyan-300 hover:bg-cyan-400/20 bg-black/20"
          }`
        }
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <item.icon size={28} />
        </motion.div>
        <span>{item.name}</span>
      </NavLink>
    </motion.div>
  ))}
</nav>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <header className="relative z-10 w-full font-['Sweet_Rosetia_Sans']">
      {/* Top Nav Bar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between px-4 py-3 sm:px-10 sm:py-1"
      >
        {/* Logo */}
        <Link to="/home" className="flex items-center space-x-3">
          <motion.img
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={logo}
            alt="Avalanche Logo"
            className="h-20 w-auto sm:h-24"
          />
        </Link>

        {/* Desktop Nav */}
<nav className="hidden md:flex items-center space-x-10">
  {navItems.map((item, index) => (
    <motion.div
      key={item.name}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
    >
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          `group relative flex items-center space-x-3 px-4 py-3 rounded transition-all duration-200 text-lg font-medium ${
            isActive
              ? "text-cyan-300"
              : "text-white hover:text-cyan-300 "
          }`
        }
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 15 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <item.icon size={22} />
        </motion.div>
        <span>{item.name}</span>

        {/* 🔥 Underline animation */}
        <span
          className={`absolute bottom-0 h-[2px] bg-cyan-300 transition-all duration-300 ease-out ${
            location.pathname === item.href
              ? "w-full left-0" // Active link underline visible
              : "w-0 left-1/2 group-hover:w-full group-hover:left-0" // Hover animation for inactive
          }`}
        />
      </NavLink>
    </motion.div>
  ))}
</nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsNavigationOpen(true)}
          className="text-white hover:text-cyan-300 transition-colors p-3 md:hidden"
          aria-label="Open menu"
        >
          <motion.div
            animate={{ rotate: isNavigationOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Menu size={32} />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Mobile Modal */}
      {isNavigationOpen && <NavigationModal />}
    </header>
  );
};

export default NavigationBar; 