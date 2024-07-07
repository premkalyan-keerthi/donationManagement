import React, { useEffect, useState } from "react";
import styles from "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router";
import MenuToggle from "../Products/Menu";


const TicketsBooking = () => {
  const [eventSelect, setEventSelect] = useState({ id: "",numberOfTickets:[] });
  const [eventsList,setEventsList] = useState([])
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:8080/browseEvent').then((res)=>{
    setEventsList(res.data)
    }).catch(()=>{
        alert("api failed")
    })
  },[])

  const handleEventSelect = (e) => {
    const evnt = eventsList.filter((event) => event._id === e.target.value);
    if(evnt.length){
    let newEvent={...evnt[0]};
    const newBook=newEvent.numberOfTickets.map((ticket,index)=> ({
      ticketPrice:ticket.ticketPrice,
      ticketType:ticket.ticketType,
      ticketsPurchased:'',
      id:ticket.id
    }));
    newEvent={...newEvent,numberOfTickets:newBook};
    setEventSelect(newEvent);
  }
  };

  const handleBookTickets = (e,id) => {
    const updated = eventSelect.numberOfTickets.map((ticket)=>{
      if(ticket.id===id){
        return {
          ...ticket,
          ticketsPurchased:e.target.value
        }
      }
      return ticket
    })
    setEventSelect({
      ...eventSelect,
      numberOfTickets:updated
    })
  };

  const handlePurchase=(e)=>{
    e.preventDefault();
    delete eventSelect["_id"]
    axios.post('http://localhost:8080/addTickets',eventSelect).then((res)=>{
      setEventSelect({ id: "",numberOfTickets:[] })
    }).catch((err)=>{
      alert("API FAILED")
    })
  }

  return (
    <div className="bookingParent">
          <h1 className="donationText">Donation Management System</h1>
        <h2>Ticket Booking</h2>
        <MenuToggle/>
      <form className="bookingWrapper">
        <div className="bookingField">
            <label className="ticketLabel">Select Events - </label>
        <select value={eventSelect.id} onChange={handleEventSelect} className="ticketRight ticketSelect">
          <option value={""}>Select Option</option>
          {eventsList.map((e) => (
            <option key={e._id} value={e._id}>{e.eventTitle}</option>
          ))}
        </select>
        </div>
        <div className="bookingField">
        <h3 className="ticketLabel">Name - </h3>
        <span className="ticketRight">{eventSelect.eventTitle}</span>
        </div>
        <div className="bookingField">
            <h3 className="ticketLabel">info -</h3>
        <p className="ticketRight">{eventSelect.eventDescription}</p>
        </div>
        <div className="bookingField ticketsAvailabelWrapper">
            <h3 className="ticketLabel">Available Tickets - </h3>
            {eventSelect.numberOfTickets.map((ticket)=>(
                <div key={ticket.id} className="ticketsWrapper">
                <span>{ticket.ticketType}</span>
                <span>{ticket.ticketPrice}</span>
                </div>
            ))}
        </div>
        {eventSelect.numberOfTickets.length ? 
        <div>
        {eventSelect.numberOfTickets.map((ticket)=>(<div className="bookingField">
            <h3 className="ticketLabel">Enter No of Tickets to purchase {ticket.ticketType}</h3>
            <input onChange={(e)=>{handleBookTickets(e,ticket.id)}} type="number" className="ticketRight ticketInput" value={ticket.ticketsPurchased}/>
        </div>))}
        <button onClick={handlePurchase} className="ticketPurchase">Purchase</button>
        </div>:<></>}
      </form>
    </div>
  );
};

export default TicketsBooking;
