import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-black/80 border-t border-white/10 text-center py-6 text-gray-400 text-sm overflow-hidden">
      {/* Neon Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent blur-2xl animate-pulse"></div>

      {/* Metallic gradient line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 shadow-[0_0_15px_2px_rgba(255,0,255,0.4)]"></div>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-gray-300 hover:text-white transition-all duration-500"
      >
        © {new Date().getFullYear()}{" "}
        <span className=" bg-clip-text bg-gradient-to-r text-gray-300 font-semibold">
          Avalanche
        </span>{" "}
        — All rights reserved | Tech Team of{" "}
        <span className="font-semibold text-gray-300 transition-colors duration-500">
          KLS GIT
        </span>
      </motion.p>
    </footer>
  );
};

export default Footer;
