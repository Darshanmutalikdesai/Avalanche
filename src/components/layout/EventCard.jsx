// src/components/EventCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./EventCard.css";

const EventCard = ({ title, description, image, path }) => {
  return (
    <div className="event-card">
      <div className="event-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="event-card-content">
        <h2 className="event-card-title">{title}</h2>
        <p className="event-card-description">{description}</p>
        <Link to={path} className="event-card-button">
          Explore
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
