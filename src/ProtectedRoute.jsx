import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const state = useSelector((state) => state.userInfoReducer);
    const navigate=useNavigate();
  
    useEffect(()=>{
        if(!state.emailId && !state.category){
            navigate('/login')
        }
    },[])

    return <>{props.children}</>
  };

export default ProtectedRoute