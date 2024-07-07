import React, { useEffect, useState } from "react";
import styles from "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { productsAdded, removeProduct } from "../../Redux/cart/cartAction";

const AddCounter = ({ product }) => {
  const [count, setCount] = useState(0);
  const [emptyProduct, setEmptyProduct] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (emptyProduct) {
      dispatch(removeProduct({ ...product }));
    }
  }, [emptyProduct]);

  const handleAddCart = () => {
    dispatch(productsAdded({ ...product, qty: count }));
  };

  return (
    <>
      <div className="countWrapper">
        {!count ? (
          <button
            className="addBtn"
            onClick={() => {
              setCount(count + 1);
              setEmptyProduct(false);
            }}
          >
            Add
          </button>
        ) : (
          <div className="addBtns">
            <button
              className="btn"
              onClick={() => {
                setCount(count - 1);
                if (count === 1) {
                  setEmptyProduct(true);
                }
              }}
            >
              -
            </button>
            <span>{count}</span>
            <button
              className="btn"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
      <button
        style={{ opacity: !count ? 0.5 : 1 }}
        disabled={!count}
        className="cartBtn"
        onClick={handleAddCart}
      >
        Add to Cart
      </button>
    </>
  );
};

export default AddCounter;
