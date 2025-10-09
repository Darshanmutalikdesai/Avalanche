import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Removed BrowserRouter
import NavigationBar from "../layout/Common/Navbar";
import CosmicProfile from "../layout/userport"; // check path

const User = () => {
  return (
    <> {/* ✅ No BrowserRouter here - it's already in App.jsx */}
      <NavigationBar />
      <Routes>
        {/* Default route for /user-portal/ */}
        <Route index element={<CosmicProfile />} />
        
        {/* Alternative: /user-portal/profile */}
        <Route path="profile" element={<CosmicProfile />} />
        
        {/* You can add more nested routes here */}
        {/* <Route path="settings" element={<UserSettings />} /> */}
        {/* <Route path="dashboard" element={<UserDashboard />} /> */}
      </Routes>
    </>
  );
};

export default User;