// src/pages/Events.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavigationBar from "../layout/Common/Navbar";
import EventsPage from "../layout/EventsPage";
import CentralEvents from "../layout/CentralEvents";
import DepartmentEvents from "../layout/DepartmentEvents";
import RegisterEvents from "../layout/RegisterEvents";

// Layout wrapper
const EventsLayout = ({ children }) => (
  <div className="relative min-h-screen w-full">
    {/* Navbar always at top */}
    <div className="w-full z-20 absolute top-0 left-0">
      <NavigationBar />
    </div>

    {/* Main content */}
    <div className="w-full">{children}</div>
  </div>
);

export default function Events() {
  return (
    <EventsLayout>
      <Routes>
        {/* Default Events Page */}
        <Route path="/" element={<EventsPage />} />

        {/* Central & Department Events */}
        <Route path="/central-events" element={<CentralEvents />} />
        <Route path="/department-events" element={<DepartmentEvents />} />

        {/* Register Event (receives state from CentralEvents/DepartmentEvents) */}
        <Route path="/register-events" element={<RegisterEvents />} />

        {/* Catch all → redirect back */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </EventsLayout>
  );
}
