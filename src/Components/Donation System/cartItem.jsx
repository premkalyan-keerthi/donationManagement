import React, { useState } from "react";
import styles from "./Cart.css";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../Redux/cart/cartAction";

const CartItem = ({ item }) => {
  const [qty, setQty] = useState(item.qty);
    const dispatch = useDispatch()

  const handleDecrement=()=>{
    if(qty===1){
        dispatch(removeProduct(item))
    }
    setQty(qty-1)
  }
  
  console.log('yaswanth', item);

  return (
    <div className="cartProductWrapper">
      <div className="priceTextWrapper">
        <img className="cartProductImg" src={item.thumbnail} alt={item.title} />
        <div className="cartTexts">
          <span className="cartPdTitle">{item.title}</span>
          <p className="cartPdDesc">{item.description}</p>
        </div>
      </div>
      <div>
        <button onClick={handleDecrement} className="cartPlusBtn">-</button>
        <span>{qty}</span>
        <button onClick={()=>{setQty(qty+1)}} className="cartPlusBtn">+</button>
        
        <span className="cartPDPrice">$ {item.price * qty}</span>
      </div>
    </div>
  );
};

export default CartItem;
