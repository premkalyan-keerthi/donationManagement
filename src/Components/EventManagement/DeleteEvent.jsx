import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./styles.css";

const DeleteEvent = () => {
  const [eventSelect, setEventSelect] = useState({
    _id: "",
    numberOfTickets: [],
  });
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/browseEvent")
      .then((res) => {
        setEventsList(res.data);
      })
      .catch(() => {
        alert("api failed");
      });
  }, []);

  const handleEventSelect = (e) => {
    const evnt = eventsList.filter((event) => event._id === e.target.value);
    evnt.length && setEventSelect(evnt[0]);
  };

  return (
    <div className="bookingParent">
      <h1>Delete Event</h1>
      <form className="bookingWrapper">
        <div className="bookingField">
          <label className="ticketLabel">Select Events - </label>
          <select
            value={eventSelect.id}
            onChange={handleEventSelect}
            className="ticketRight ticketSelect"
          >
            <option value={""}>Select Option</option>
            {eventsList.map((e) => (
              <option key={e._id} value={e._id}>
                {e.eventTitle}
              </option>
            ))}
          </select>
        </div>
        <button className="ticketLabel ticketPurchase deleteBtn" type="submit">
          Delete
        </button>
      </form>
    </div>
  );
};

export default DeleteEvent;
