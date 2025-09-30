import React, { useEffect, useState } from "react";

const RocketCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Hide default cursor everywhere */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom Rocket Cursor (flipped horizontally) */}
      <div
        className="pointer-events-none fixed z-[9999] text-3xl select-none"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: "translate(-50%, -50%) scaleX(-1)", // 🚀 flipped to opposite
        }}
      >
        🚀
      </div>
    </>
  );
};

export default RocketCursor;
