import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from './styles.css'
import MenuToggle from "../Products/Menu";
import EventsReport from "./EventsReport";

const Reports=()=>{
    const [reportsList,setReportsList] = useState([])
    const [showEventReports,setShowEventReports] =useState(false)

    useEffect(()=>{
        axios.get('http://localhost:8080/report').then((res)=>{
            setReportsList(res.data)
        }).catch(()=>{
            alert("API FAILED")
        })
    },[])

    return(
        <>
          <h1 className="donationText">Donation Management System</h1>
        <div>
            <button style={{opacity:showEventReports?'0.8':'1'}} className="ticketLabel ticketPurchase" onClick={()=>setShowEventReports(false)}>Products Report</button>
            <button style={{opacity:!showEventReports?'0.8':'1'}} className="ticketLabel ticketPurchase" onClick={()=>setShowEventReports(true)}>Events Report</button>
        </div>
       {showEventReports ? <EventsReport />: <div className="reportParentWrapper">
        <h3>Products Report Management</h3>
        <MenuToggle/>
        {reportsList.length ?<table className="reportTable">
            <thead>
                <tr>
                    <td className="reportTd">Agent Name</td>
                    <td className="reportTd">Product Title</td>
                    <td className="reportTd">Product Price</td>
                    <td className="reportTd">Product Quantity</td>
                </tr>
            </thead>
            <tbody>
                {reportsList.map((report)=>(
                    report.products.map((product)=>(
                    <tr key={report.agency}>
                        <td className="reportTd">{report.agency}</td>
                        <td className="reportTd">{product.title}</td>
                        <td className="reportTd">{product.price}</td>
                        <td className="reportTd">{product.quantity}</td>
                    </tr>
                    ))
                ))}
            </tbody>
        </table>:<></>}
        </div>}
        </>
    )
}

export default Reports