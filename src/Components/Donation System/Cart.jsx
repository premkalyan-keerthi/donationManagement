import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Cart.css';
import AddCounter from '../Products/AddCounter';
import CartItem from './cartItem';
import axios from 'axios';
import MenuToggle from '../Products/Menu';

const Cart = () =>{
    const cartItems = useSelector((state)=> state.cartReducer.products);
    const [agency,setAgency] = useState(["Agency 1","Agency 2","Agency 3"]);
    const [agencySelect, setAgencySelect] = useState('')
    const navigate = useNavigate();

    const handleAgencyChange=(e)=>{
        setAgencySelect(e.target.value)
    }

    const handlePurchase=()=>{
        if(agencySelect){
            axios.post('http://localhost:8080/addcart',{
                agency:agencySelect,
                products: cartItems.map((item)=> ({
                    title:item.title,
                    quantity:item.qty,
                    price: item.price
                }))
            }).then((res)=>{
                // console.log(res.data,'???')
                navigate('/purchaseSuccess')
            }).catch(()=>{
                alert("API FAILED")
            })
    }
    }

  return (
    <div>
          <h1 className="donationText">Donation Management System</h1>
        <div className='cart-container'>
            <h2>Shopping Cart</h2>
            <MenuToggle/>
            {!cartItems.length ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty</p>
                    <div className="start-shopping">
                        <Link to="/products">
                            <button type="submit" className="continueShopping">
                                Continue Shopping
                             </button>
                        </Link>
                    </div>
                </div>
                ) : <>
                    {cartItems.map((item)=>(
                        <CartItem key={item.id} item={item} />
                    ))}
                    <select className='agencySelect' value={agencySelect} onChange={handleAgencyChange} required>
                        <option value="">Select Agency</option>
                        {agency.map((agent)=>(
                            <option value={agent}>{agent}</option>
                        ))}
                    </select>
                    {/* <Link to="/purchaseSuccess"> */}
                        <button onClick={handlePurchase} className='cartPurchase'>Purchase</button>
                    {/* </Link> */}
                    </>
                }
                
        </div>
    </div>
  )
}

export default Cart