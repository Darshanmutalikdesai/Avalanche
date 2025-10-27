import React from "react";
import { Routes, Route } from "react-router-dom";
import CosmicProfile from "../layout/userport"; // ✅ Profile page
import NavigationBar from "../layout/Common/Navbar"; // ✅ Import your Navbar component (adjust path if needed)

const User = () => {
  return (
    <>
      {/* ✅ Navbar visible on all user portal pages */}
      <NavigationBar />

      {/* ✅ Route configuration */}
      <Routes>
        {/* Default route for /user-portal/ */}
        <Route index element={<CosmicProfile />} />

        {/* /user-portal/profile */}
        <Route path="profile" element={<CosmicProfile />} />

        {/* Future routes */}
        {/* <Route path="settings" element={<UserSettings />} /> */}
        {/* <Route path="dashboard" element={<UserDashboard />} /> */}
      </Routes>
    </>
  );
};

export default User;
