import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "../layout/Common/Navbar";
import UserPage from "../pages/user";

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        {/* User Portal Route */}
        <Route path="/userport" element={<UserPage />} />
      </Routes>
    </>
  );
};

export default App;