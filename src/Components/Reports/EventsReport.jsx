import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from './styles.css'
import MenuToggle from "../Products/Menu";

const EventsReport=()=>{
    const [reportsList,setReportsList] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8080/ticketsBooked').then((res)=>{
            setReportsList(res.data)
        }).catch(()=>{

        })
    },[])

    return(
        <div className="reportParentWrapper">
        <h3>Events Report Management</h3>
        <MenuToggle/>
        {reportsList.length ?<table className="reportTable">
            <thead>
                <tr>
                    <td className="reportTd">Event Title</td>
                    <td className="reportTd">Event Description</td>
                    <td className="reportTd">Ticket Type</td>
                    <td className="reportTd">Ticket Price</td>
                    <td className="reportTd">Purchased Tickets</td>
                </tr>
            </thead>
            <tbody>
                {reportsList.map((report)=>(
                    report.reportTickets.map((ticket)=>(
                    <tr key={report.agency}>
                        <td className="reportTd">{report.eventTitle}</td>
                        <td className="reportTd">{report.eventDescription}</td>
                        <td className="reportTd">{ticket.ticketType}</td>
                        <td className="reportTd">{ticket.ticketPrice}</td>
                        <td className="reportTd">{ticket.ticketsPurchased}</td>
                    </tr>
                    ))
                ))}
            </tbody>
        </table>:<></>}
        </div>
    )
}

export default EventsReport