import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuToggle from "../Products/Menu";

const EventManagement = () => {
  const naviage = useNavigate();

  const handleEventClick = (eventType) => {
    switch (eventType) {
      case "newEvent":
        naviage("/event-creation");
        break;
      case "editEvent":
        naviage("/edit-event");
        break;
      case "deleteEvent":
        naviage("/delete-event");
        break;
    }
  };

  return (
    <div>
          <h1 className="donationText">Donation Management System</h1>
      <h2>Event Management</h2>
      <MenuToggle/>
      <button
        className="ticketLabel ticketPurchase"
        onClick={() => {
          handleEventClick("newEvent");
        }}
      >
        Create New Event
      </button>
      <button
        className="ticketLabel ticketPurchase"
        onClick={() => {
          handleEventClick("editEvent");
        }}
      >
        Edit Event
      </button>
      <button
        className="ticketLabel ticketPurchase"
        onClick={() => {
          handleEventClick("deleteEvent");
        }}
      >
        Delete Event
      </button>
    </div>
  );
};

export default EventManagement;
