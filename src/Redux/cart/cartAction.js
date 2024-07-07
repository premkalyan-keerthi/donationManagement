import { CLEAR_CART, PRODUCT_ADDED, REMOVE_PRODUCT } from "../constants";

export function productsAdded(products) {
  return {
    type: PRODUCT_ADDED,
    payload: products,
  };
}

export function removeProduct(product) {
  return {
    type: REMOVE_PRODUCT,
    payload: product,
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
    payload: [],
  };
}