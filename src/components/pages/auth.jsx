import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import OTPPage from "../layout/OTP";   
import Auth from "../layout/login";   
import Navbar from "../layout/Common/Navbar"; // Capitalized

// <-- Import your RegisterPage if needed
// import RegisterPage from "../layout/RegisterPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/navbar" element={<Navbar />} />  {/* Correct component usage */}
        
        {/* Auth Pages */}
        <Route path="/login" element={<Auth />} />
        {/* Uncomment if you have a RegisterPage */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        
        <Route path="/otp" element={<OTPPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} /> {/* Redirect unknown paths */}
      </Routes>
    </Router>
  );
};

export default App;
