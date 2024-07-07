import React, { useState } from "react";
import menuIcon from "../../images/menu.jpg";
import { useNavigate } from "react-router-dom";
import styles from "./styles.css";
import { useSelector } from "react-redux";

const MenuToggle=()=>{
    const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const state = useSelector((state) => state.userInfoReducer);

    return(
        <div>
        <button
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
        className="menuBtn"
      >
        <img className="menuIcon" src={menuIcon} alt="menu" />
      </button>

      {menuOpen ? (
        <div style={{height:state.category==="organiser"? '150px':'120px'}} className="menuWrapper">
          <button
          onClick={() => {
            navigate("/products");
          }}
           className="browseText">Browse Products</button>
          <button
            onClick={() => {
              navigate("/tickets-booking");
            }}
            className="browseText"
          >
            Browse Events
          </button>
          <button
            onClick={() => {
              navigate("/event-creation");
            }}
            className="browseText"
          >
            Event Creation
          </button>
          <button
            onClick={() => {
              navigate("/reports");
            }}
            className="browseText"
          >
            Reporting
          </button>
          {state.category==="organiser" ? <button
            onClick={() => {
              navigate("/event-management");
            }}
            className="browseText"
          >
            Event Management
          </button>:<></>}
        </div>
      ) : (
        <></>
      )}
      </div>
    )
}

export default MenuToggle