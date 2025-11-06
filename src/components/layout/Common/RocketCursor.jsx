import React, { useEffect, useState } from "react";

const RocketCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };
    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <div
        style={{
          position: "fixed",
          left: cursorPos.x,
          top: cursorPos.y,
          transform: "translate(-50%, -50%) scaleX(-1)",
          pointerEvents: "none",
          zIndex: 9999,
          fontSize: "2rem",
        }}
      >
        🚀
      </div>
    </>
  );
};

export default RocketCursor;
