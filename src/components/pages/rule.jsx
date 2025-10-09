import React from "react";
import NavigationBar from "../layout/Common/Navbar";
import RulebookComponent from "../layout/Rulebook"; // check path

const RulebookPage = () => {
  return (
    <div className="flex flex-col items-start relative bg-white overflow-hidden">
      {/* Navigation */}
      <div className="w-full">
        <NavigationBar />
      </div>

      {/* Rulebook section */}
      <div className="w-full">
        <RulebookComponent />
      </div>
    </div>
  );
};

export default RulebookPage;
