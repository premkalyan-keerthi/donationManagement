import React, { useState } from "react";
import styles from './styles.css';
import crossIcon from "../../images/cross.png";
import axios from "axios";
import MenuToggle from "../Products/Menu";

const EventCreation=()=>{
        const [inputRows, setInputRows] = useState([]);
        const [formData,setFormData] = useState({
            eventId:'',
            eventTitle:'',
            createdAt:'',
            eventDate:'',
            eventDescription:'',
            eventLocation:'',
            numberOfTickets:[]
        })

        const handleTickets = (e) =>{
            e.preventDefault()
            setInputRows([...inputRows, {id:parseFloat(Math.random(0,100)).toFixed(2) * 100,ticketType : '', ticketPrice : ''}])
        }

        const handleInputChange = (index, columnName, value) => {
            const newRows = [...inputRows];
            newRows[index][columnName] = value;
            setInputRows(newRows);
            setFormData({
                ...formData,
                numberOfTickets:newRows
            })
          };

          const handleClose=(id)=>{
            const updateRows = inputRows.filter((row)=> row.id !=id);
            setInputRows(updateRows)
            setFormData({
                ...formData,
                numberOfTickets:updateRows
            })
          }

          const handleFieldsInputChange=(e)=>{
            const updatedForm = {...formData};
            updatedForm[e.target.name] = e.target.value;
            setFormData(updatedForm)
          }

          const handleSubmit=(e)=>{
            e.preventDefault();
            const submitFormData = {...formData};
            submitFormData.createdAt = new Date();
            submitFormData.eventId = parseFloat(Math.random(0,100)).toFixed(2) * 100;
            
            axios.post('http://localhost:8080/eventcreation',submitFormData)
            .then((res)=>{
                // console.log(res.data,'???')
                setFormData({
                    eventId:'',
                    eventTitle:'',
                    createdAt:'',
                    eventDate:'',
                    eventDescription:'',
                    eventLocation:'',
                    numberOfTickets:[]
                })
                setInputRows([]);
            })
            .catch(()=>{
                alert("API FAILED")
            })
          }

    return(
        <div className="creationParent">
          <h1 className="donationText">Donation Management System</h1>
            <h2>Event Creation</h2>
            <MenuToggle/>
            <form className="creationFormWrapper" onSubmit={handleSubmit}>
                <div>
                    <div className="bookingField">
                        <label className="ticketLabel" htmlFor="title">Title</label>
                        <input name="eventTitle" value={formData.eventTitle}  className="ticketRight ticketInput" id="title" onChange={handleFieldsInputChange}/>
                    </div>
                    <div className="bookingField">
                        <label className="ticketLabel" htmlFor="date">Date</label>
                        <input name="eventDate" value={formData.eventDate} type="date" className="ticketRight ticketInput" id="date" onChange={handleFieldsInputChange}/>
                    </div>
                    <div className="bookingField">
                        <label className="ticketLabel" htmlFor="description">Description</label>
                        <input name="eventDescription" value={formData.eventDescription} className="ticketRight ticketInput" id="description" onChange={handleFieldsInputChange}/>
                    </div>
                    <div className="bookingField">
                        <label className="ticketLabel" htmlFor="location">Location</label>
                        <input name="eventLocation" value={formData.eventLocation} className="ticketRight ticketInput" id="location" onChange={handleFieldsInputChange}/>
                    </div>
                </div>
                <div className="bookingField confirmBtnWrapper">
                    <button className="ticketLabel ticketPurchase" onClick={handleTickets} > Configure Tickets</button>
                    {inputRows.map((row, index) => (
                        <div className="creationPricesWrapper" key={row.id}>
                            <input
                                className="creationPriceRight ticketInput"
                                type="text"
                                placeholder="Enter Ticket Type"
                                value={row.ticketType}
                                onChange={(e) => handleInputChange(index, 'ticketType', e.target.value)}
                            />

                            <input
                                className="creationPriceRight ticketInput"
                                type="text"
                                placeholder="Enter Ticket Price"
                                value={row.ticketPrice}
                                onChange={(e) => handleInputChange(index, 'ticketPrice', e.target.value)}
                            />
                            <img className="crossIcon" src={crossIcon} alt="cross-icon" onClick={()=>handleClose(row.id)}/>
                     </div>
                      ))}
                {formData.numberOfTickets.length ?
                <button className="ticketLabel ticketPurchase" type="submit">Submit</button>:
                <></>}
                </div>
                
            </form>
        </div>
    )
}

export default EventCreation