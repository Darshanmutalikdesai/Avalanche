import React from "react";
import DevelopersPage from "../layout/Developer";

const DeveloperPage = () => {
  return (
    <div className="flex flex-col items-start relative bg-white overflow-hidden">
      {/* First section: LandingPage */}
      <div className="w-full">
        <DevelopersPage/>
      </div>
    </div>
  );
};

export default DeveloperPage;
