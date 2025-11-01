// src/pages/Events.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DepartmentsData from "../layout/DepartmentEvents";
import IndividualDeptEvents from "../layout/Common/IndividualDeptEvents";
import EventsPage from "../layout/EventsPage";
import CentralEvents from "../layout/CentralEvents";
import DepartmentEvents from "../layout/DepartmentEvents";
import RegisterPaperPage from "../layout/RegisterPage";
import SchoolEvents from "../layout/SchoolEvents";


// Layout wrapper
const EventsLayout = ({ children }) => (
  <div className="relative min-h-screen w-full">
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
        <Route path="central-events" element={<CentralEvents />} />
        <Route path="department-events" element={<DepartmentEvents />} />
        <Route path="department-events/:deptName" element={<IndividualDeptEvents departmentsData={DepartmentsData} />} />
        <Route path="puc-events" element={<SchoolEvents />} />

        {/* Register Event (receives state from CentralEvents/DepartmentEvents) */}

        <Route path="register" element={<RegisterPaperPage />} />



        {/* Catch all → redirect back */}
        <Route path="*" element={<Navigate to="/events" />} />
      </Routes>
    </EventsLayout>
  );
}