import React from "react";
import DevelopersPage from "../layout/Developer";
import NavigationBar from "../layout/Common/Navbar";

const DeveloperPage = () => {
  return (
    <div className="flex flex-col items-start relative bg-white overflow-hidden">
        <div className="w-full">
            <NavigationBar/>
        </div>
      {/* First section: LandingPage */}
      <div className="w-full">
        <DevelopersPage/>
      </div>
    </div>
  );
};

export default DeveloperPage;
