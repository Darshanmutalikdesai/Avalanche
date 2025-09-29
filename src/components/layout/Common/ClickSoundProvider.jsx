import React, { useEffect } from "react";
import clickSound from "../../../assets/click.wav"; // adjust path if needed

const ClickSoundProvider = ({ children }) => {
  useEffect(() => {
    const handleClick = () => {
      const sound = new Audio(clickSound);
      sound.volume = 0.5; // adjust volume
      sound.play().catch(err => console.warn("Audio play failed:", err));
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return <>{children}</>;
};

export default ClickSoundProvider;
