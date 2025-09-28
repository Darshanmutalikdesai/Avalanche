// src/pages/Events.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavigationBar from "../layout/Common/Navbar";
import EventsPage from "../layout/EventsPage";
import CentralEvents from "../layout/CentralEvents";
import DepartmentEvents from "../layout/DepartmentEvents";

import centralEventsData from "../data/centralEventsData";
import eventsData from "../data/eventsData";

// Layout wrapper
const EventsLayout = ({ children }) => (
  <div className="flex flex-col items-start relative min-h-screen w-full">
    <div className="w-full z-20">
      <NavigationBar />
    </div>
    <div className="flex flex-1 w-full px-4 sm:px-6 lg:px-8">{children}</div>
  </div>
);

export default function Events() {
  return (
    <EventsLayout>
      <Routes>
        <Route path="/" element={<EventsPage events={eventsData} />} />
        <Route path="/central-events" element={<CentralEvents events={centralEventsData} />} />
        <Route path="/department-events" element={<DepartmentEvents events={eventsData} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </EventsLayout>
  );
}
