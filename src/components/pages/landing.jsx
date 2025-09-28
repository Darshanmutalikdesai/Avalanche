import React from "react";
import LandingPage from "../layout/landing";

const Landing = () => {
  return (
    <div className="flex flex-col items-start relative bg-white overflow-hidden">
      {/* First section: LandingPage */}
      <div className="w-full">
        <LandingPage />
      </div>
    </div>
  );
};

export default Landing;
