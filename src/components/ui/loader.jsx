import React, { useState, useEffect } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;
    const interval = setInterval(() => {
      value += 1;
      setProgress(value);
      if (value >= 100) clearInterval(interval);
    }, 30);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white text-4xl font-bold">
      {progress}%
    </div>
  );
};

export default Loader;
