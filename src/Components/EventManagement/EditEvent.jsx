import axios from "axios";
import React, { useEffect, useState } from "react";
import crossIcon from "../../images/cross.png";
import MenuToggle from "../Products/Menu";

const EditEvent=({isDelete})=>{
  const [eventSelect, setEventSelect] = useState({ _id: "",numberOfTickets:[] });
    const [eventsList,setEventsList]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8080/browseEvent').then((res)=>{
        setEventsList(res.data)
        }).catch(()=>{
            alert("api failed")
        })
      },[])

      const handleEventSelect = (e) => {
        const evnt = eventsList.filter((event) => event._id === e.target.value);
        evnt.length && setEventSelect(evnt[0]);
      };

      const handleInputChange = (e) => {
        const updatedEvent = {...eventSelect};
        updatedEvent[e.target.name] = e.target.value;
        // console.log(updatedEvent,'???')
        setEventSelect({
            ...updatedEvent
        })
      };  

      const handleConfigureInputChange = (index, columnName, value) => {
        const newRows = [...eventSelect.numberOfTickets];
        newRows[index][columnName] = value;
        setEventSelect({
            ...eventSelect,
            numberOfTickets:newRows
        })
      };

      const handleClose=(id)=>{
        const updateRows = eventSelect.numberOfTickets.filter((row)=> row.id !=id);
        setEventsList({
            ...eventSelect,
            numberOfTickets:updateRows
        })
      }

      const handleSubmit=(e)=>{
        e.preventDefault()
        if(!isDelete){
          axios.put(`http://localhost:8080/editEvent/${eventSelect.eventId}`,eventSelect).then((res)=>{
            console.log(res)
          }).catch((err)=>{
            alert("API FAILED")
          })
        }else{
          axios.delete(`http://localhost:8080/eventDelete/${eventSelect.eventId}`).then((res)=>{
            console.log(res)
          }).catch((err)=>{
            alert("API FAILED")
          })
        }
      }

    return(
        <div className="bookingParent">
          <h1 className="donationText">Donation Management System</h1>
        <h1>{isDelete? "Delete" : "Edit"} Event</h1>
      <MenuToggle/>
      <form className="bookingWrapper" onSubmit={handleSubmit}>
        <div className="bookingField">
            <label className="ticketLabel">Select Events - </label>
        <select value={eventSelect.id} onChange={handleEventSelect} className="ticketRight ticketSelect">
          <option value={""}>Select Option</option>
          {eventsList.map((e) => (
            <option key={e._id} value={e._id}>{e.eventTitle}</option>
          ))}
        </select>
        </div>
        <div>
                    <div className="bookingField">
                        <label className="ticketLabel" htmlFor="title">Title</label>
                        <input disabled={isDelete} name="eventTitle" value={eventSelect.eventTitle}  className="ticketRight ticketInput" id="title" onChange={handleInputChange}/>
                    </div>
                    <div className="bookingField">
                        <label className="ticketLabel" htmlFor="description">Description</label>
                        <input disabled={isDelete} name="eventDescription" value={eventSelect.eventDescription} className="ticketRight ticketInput" id="description" onChange={handleInputChange}/>
                    </div>
        </div>
       {eventSelect.numberOfTickets?.length? 
       <div className="bookingField confirmBtnWrapper">
                    <button className="ticketLabel ticketPurchase" > Configure Tickets</button>
                    {eventSelect.numberOfTickets.map((row, index) => (
                        <div className="creationPricesWrapper" key={row.id}>
                            <input
                                disabled={isDelete}
                                className="creationPriceRight ticketInput"
                                type="text"
                                placeholder="Enter Ticket Type"
                                value={row.ticketType}
                                onChange={(e) => handleConfigureInputChange(index, 'ticketType', e.target.value)}
                            />

                            <input
                            disabled={isDelete}
                                className="creationPriceRight ticketInput"
                                type="text"
                                placeholder="Enter Ticket Price"
                                value={row.ticketPrice}
                                onChange={(e) => handleConfigureInputChange(index, 'ticketPrice', e.target.value)}
                            />
                            {!isDelete ?<img className="crossIcon" src={crossIcon} alt="cross-icon" onClick={()=>handleClose(row.id)}/>:<></>}
                     </div>
                      ))}
                {eventSelect.numberOfTickets.length ?
                <button className="ticketLabel ticketPurchase" type="submit">{isDelete ? "Delete":"Submit"}</button>:
                <></>}
                </div>
                :<></>}
        </form>
        </div>
    )
}

export default EditEvent;