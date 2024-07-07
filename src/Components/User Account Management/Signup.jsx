import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Signup.css';
import axios from "axios";


const Signup = () => {
    const navigate=useNavigate()
    const [form,setForm] = useState({
        firstName:'',
        lastName:'',
        emailId:'',
        password:'',
        category:''
    });

    const handleInputChange=(e)=>{
        const updatedForm={...form};
        updatedForm[e.target.name] = e.target.value;
        setForm(updatedForm)
    }

    const handleCategoryChange=(e)=>{
        setForm({
            ...form,
            category: e.target.value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        axios.post('http://localhost:8080/signup',form).then((res)=>{
            navigate('/login')
        }).catch(()=>{
            alert("Api failed")
        })
    }

    return(<>
          <h1 className="donationText">Donation Management System</h1>
        <div className="parentWrapper">
            <form onSubmit={handleSubmit}>
                <h1>New User? Start Here</h1>
                    <div className="inputsWrapper">
                        <div className="usersSelect">
                            <label htmlFor="firstName">First Name</label>
                            <input id="firstName" name="firstName" type="text" placeholder="First Name" className="customInput" onChange={handleInputChange} />
                        </div>
                        <div className="usersSelect">
                            <label htmlFor="lastName">Last Name</label>
                            <input id="lastName" name="lastName" type="text" placeholder="Last Name"className="customInput" onChange={handleInputChange} />
                        </div>
                        <div className="usersSelect">
                            <label htmlFor="emailId">email</label>
                            <input id="emailId" name="emailId" type="email" placeholder="Email"className="customInput"  onChange={handleInputChange}/> 
                        </div> 
                        <div className="usersSelect">
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type="password" placeholder="Password" className="customInput" onChange={handleInputChange} />
                        </div>   
                        
                    </div>
                    <div className="usersSelect">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" value={form.category} onChange={handleCategoryChange} className="signUpcategory" required>
                            <option value="">Select Category</option>
                            <option value="donor">Donor</option>
                            <option value="organiser">Organisation</option>
                            <option value="agency">Agency</option>
                        </select>
                    </div>
                        <button type="submit" className="signUpBtn">
                            Sign Up
                         </button>
            </form>
                    </div>

       
       
    </>)
}
export default Signup;