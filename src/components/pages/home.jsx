import React from "react";
import Home from "../layout/home";
import NavigationBar from "../layout/Common/Navbar";

const HomePage = () => {
  return (
    <div className="flex flex-col items-start relative bg-white overflow-hidden">
      {/* First section: LandingPage */}
      <div className="w-full">
        <Home />
      </div>
    </div>
  );
};

export default HomePage;
