import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // If there’s a previous page in history, go back.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Otherwise, redirect to home or any default page.
      navigate("/home");
    }
  };

  return (
    <motion.button
      onClick={handleBack}
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px #00eaff" }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center justify-center gap-2 
                 px-5 py-2 sm:px-6 sm:py-3 
                 bg-transparent border border-cyan-400 
                 text-cyan-400 font-orbitron text-sm sm:text-base 
                 rounded-full overflow-hidden 
                 transition-all duration-300 ease-out"
    >
      {/* Glow layer */}
      <span className="absolute inset-0 bg-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></span>

      {/* Text */}
      <span className="relative z-10 group-hover:text-white">Back</span>

      {/* Icon */}
      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-x-1" />

      {/* Animated border sweep */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent 
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out opacity-60"></span>
    </motion.button>
  );
};

export default BackButton;
