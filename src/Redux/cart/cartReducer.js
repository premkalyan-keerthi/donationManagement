import { PRODUCT_ADDED, REMOVE_PRODUCT, CLEAR_CART } from "../constants";

const initialState = {
  products: [],
};

export function cartReducer(state = initialState, action) {
    const productIndex = [...state.products].findIndex(
      (product) => product.id === action.payload.id
    );

  switch (action.type) {
    case PRODUCT_ADDED:
      return {
        ...initialState,
        products:
          productIndex === -1
            ? [...state.products, action.payload]
            : [
                ...state.products.slice(0, productIndex),
                action.payload,
                ...state.products.slice(productIndex + 1),
              ],
      };

    case REMOVE_PRODUCT:
      return {
        ...initialState,
        products: [
          ...state.products.slice(0, productIndex),
          ...state.products.slice(productIndex + 1),
        ],
      };
    case CLEAR_CART:
      return {
        products: []}
    default:
      return state;
  }
}
