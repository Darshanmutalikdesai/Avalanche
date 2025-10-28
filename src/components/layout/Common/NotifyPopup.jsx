import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NotifyPopup = ({ show, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return alert("Please enter your email");
    setLoading(true);

    try {
      const response = await fetch("https://sheetdb.io/api/v1/3oduzymtlp0sn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              email: email, // ✅ must be inside data[]
            },
          ],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Thank you! You’ll be notified soon 🚀");
        setEmail("");
        onClose();
      } else {
        alert(`⚠️ Something went wrong: ${data?.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      alert("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-[#0a0a0a] border border-cyan-400 rounded-xl shadow-[0_0_25px_#00eaff] w-[90%] max-w-md p-8 text-white font-['Nasalization']"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-cyan-400 hover:text-cyan-200 text-lg"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-cyan-300 text-center mb-6 drop-shadow-[0_0_8px_#00eaff]">
              Stay Updated!
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-cyan-400 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full ${
                  loading ? "bg-gray-400" : "bg-cyan-400 hover:bg-cyan-300"
                } text-black font-semibold py-2 rounded-md transition-all duration-300`}
              >
                {loading ? "Saving..." : "Notify Me"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotifyPopup;
