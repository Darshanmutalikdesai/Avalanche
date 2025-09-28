import React from "react";

const VideoBackground = ({ videoSrc, children }) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-white">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />
      {children}
    </div>
  );
};

export default VideoBackground;
