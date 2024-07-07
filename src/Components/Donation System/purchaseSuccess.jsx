import React from "react";
import { Link } from 'react-router-dom';
import styles from "../Donation System/purchaseSuccess.css"
import MenuToggle from "../Products/Menu";
import { useDispatch } from "react-redux";
import { clearCart } from "../../Redux/cart/cartAction";
const PurchaseSuccess = ({}) =>{
    const dispatch = useDispatch();

    const handleChange = ()=>{
        dispatch(clearCart());
    }

    return(
        <div className="payment-success-container">
          <h1 className="donationText">Donation Management System</h1>
            <h2>Payment Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <MenuToggle/>
            <Link to="/products">
                        <button onClick={handleChange} className='Store' id="store"><span className="Storespan">Go to Store</span></button>
                    </Link>
        </div>
    )
}

export default PurchaseSuccess;