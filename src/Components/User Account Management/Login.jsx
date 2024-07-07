import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.css";
import Signup from "./Signup";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUserInfo } from "../../Redux/userInfo/actions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [formData, setFormData]=useState({
    emailId:'',
    password:'',
    category:''
  })

  const handleInputChane=(e)=>{
    const updatedForm = {...formData};
    updatedForm[e.target.name] = e.target.value;
    setFormData(updatedForm);
  }

  const handleCategoryChange=(e)=>{
    setFormData({
      ...formData,
      category:e.target.value
    })
  }

  const handleSubmit = (e) => {
    console.log("submit clicked");
    e.preventDefault();
    
    axios.post(`http://localhost:8080/login/`,formData).then((res)=>{
      dispatch(addUserInfo({
        emailId:formData.emailId,
        category: formData.category
      }))
       navigate(formData.category ==="agency" ? '/reports':'/products')
    }).catch((err)=>{
      alert(err)
      navigate("/signup");
    })
  };

  return (
      <div  className="parentWrapper">
        <form onSubmit={handleSubmit}>
          <h1 className="donationText">Donation Management System</h1>
          <h2>Login to Your Account</h2>
          <div className="inputsWrapper">
            <div className="usersSelect">
              <label htmlFor="users">Email Id</label>
              <input
                className="customInput"
                type="email"
                name="emailId"
                placeholder="Please Enter Email Id"
                required
                onChange={handleInputChane}
              />
            </div>
            <div className="usersSelect">
              <label htmlFor="users">Password</label>
              <input
                className="customInput"
                type="password"
                name="password"
                placeholder="Enter Password"
                required
                minLength={8}
                maxLength={12}
                onChange={handleInputChane}
              />
            </div>
          </div>
          <div className="usersSelect">
            <label htmlFor="users">Category</label>
            <select name="category" id="users" className="category" required value={formData.category} onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              <option value="donor">Donor</option>
              <option value="organiser">Organisation</option>
              <option value="agency">Agency</option>
            </select>
          </div>
          <button className="loginBtn" type="submit">
            Sign In
          </button>
        </form>
      </div>
  );
};

export default Login;
