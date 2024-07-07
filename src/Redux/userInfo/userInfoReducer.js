import { ADD_USER_INFO } from "../constants";

const initialState = {
  emailId: "",
  category: "",
};

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_INFO:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
