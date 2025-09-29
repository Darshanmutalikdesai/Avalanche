// src/pages/CentralEvents.jsx
import React, { useState } from "react";
import EventCard from "../layout/Events/EventCard";

// import centralEventsData from "../data/centralEventsData";
import "./EventsPage.css"; 
import "./Popup.css"; // ✅ new CSS for popup

const DepartmentEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="events-wrapper">
     

      <div className="events-header">
        <h1 className="events-title">Departmental Events</h1>
        <p className="events-subtitle">Discover the main highlights of AVALANCHE</p>
      </div>

      <div className="events-grid">
        {centralEventsData.map((event) => (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event)} // ✅ open popup
            style={{ cursor: "pointer" }}
          >
            <EventCard
              title={event.title}
              description={event.description}
              image={event.image}
            />
          </div>
        ))}
      </div>

      {/* ✅ Popup Modal */}
      {selectedEvent && (
        <div className="popup-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEvent.title}</h2>
            <p style={{ whiteSpace: "pre-line" }}>{selectedEvent.instructions}</p>
            <button className="popup-close" onClick={() => setSelectedEvent(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentEvents;