import React from "react";

const PaymentButton = () => {
  const handleClick = () => {
    // 🔗 Add your hyperlink here
    window.open("https://backendavalanche.git.edu", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="
        relative overflow-hidden
        px-8 py-3
        text-cyan-400 font-semibold uppercase tracking-wider
        border border-cyan-400 rounded-xl
        transition-all duration-300
        hover:text-black
        hover:bg-cyan-400
        hover:shadow-[0_0_20px_#22d3ee,0_0_40px_#22d3ee,0_0_60px_#22d3ee]
        active:scale-95
      "
    >
      <span className="relative z-10">Pay Now!! </span>

      {/* glowing background sweep */}
      <span
        className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent
          -translate-x-full group-hover:translate-x-full
          transition-transform duration-700 ease-in-out
        "
      />
    </button>
  );
};

export default PaymentButton;
