// src/pages/Events.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavigationBar from "../layout/Common/Navbar";
import EventsPage from "../layout/EventsPage";
import CentralEvents from "../layout/CentralEvents";
import DepartmentEvents from "../layout/DepartmentEvents";

// import centralEventsData from "../data/centralEventsData";
// import eventsData from "../data/eventsData";

// Layout wrapper - removed padding and flex constraints
const EventsLayout = ({ children }) => (
  <div className="relative min-h-screen w-full">
    <div className="w-full z-20 absolute top-0 left-0">
      <NavigationBar />
    </div>
    <div className="w-full">{children}</div>
  </div>
);

export default function Events() {
  return (
    <EventsLayout>
      <Routes>
        <Route path="/" element={<EventsPage  />} />
        <Route path="/central-events" element={<CentralEvents />} />
        <Route path="/department-events" element={<DepartmentEvents  />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </EventsLayout>
  );
}