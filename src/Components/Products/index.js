import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles.css";
import AddCounter from "./AddCounter";
import { useDispatch, useSelector } from "react-redux";
import cartIcon from "../../images/shopping-cart_5953259.png";
import notifyIcon from "../../images/notification-bell-5743.png"
import { useNavigate } from "react-router-dom";
import MenuToggle from "./Menu";

const Products = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cartReducer.products);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setList(res.data.products);
      })
      .catch((err) => {
        alert("api failed");
      });
  }, []);

  const getTotalCount = useMemo(() => {
    let totalQty = 0;
    cartProducts.forEach((item) => {
      totalQty = totalQty + item.qty;
    });
    return totalQty;
  }, [cartProducts]);

  return (
    <div>
      <h1 className="donationText">Donation Management System</h1>
      <h2>Products</h2>
      <button
        onClick={() => {
          cartProducts.length && navigate("/cart");
        }}
        className="cartWrapper"
      >
        <img className="cartIcon" src={cartIcon} alt="cart-icon" />
        <span className="productsLen">
          {cartProducts.length ? getTotalCount : ""}
        </span>
      </button>
      <button className="notifyWrapper">
        <img className="notifyIcon" src = {notifyIcon} alt="notify-icon" />
      </button>
      {list.length ? (
        <div className="itemsWrapper">
          {list.map((item) => (
            <div key={item.title} className="itemWrapper">
              <h4 className="title">{item.title}</h4>
              <img
                className="image"
                src={item.thumbnail}
                alt={item.description}
              />
              <p className="desc">{item.description}</p>
              <div className="price">$ {parseInt(item.price, 10)}</div>
              <AddCounter product={item} />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}

      <MenuToggle />
    </div>
  );
};

export default Products;
