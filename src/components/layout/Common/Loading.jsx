import React, { useEffect, useState } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 1;
      });
    }, 30); // speed (30ms per step → ~3s total)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full bg-black text-white">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Loading...</h1>
        <div className="w-64 bg-gray-800 rounded-full h-4 overflow-hidden">
          <div
            className="bg-blue-500 h-4 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="mt-4 text-lg font-mono">{progress}%</span>
      </div>
    </div>
  );
};

export default Loading;
