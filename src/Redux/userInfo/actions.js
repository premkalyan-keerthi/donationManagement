import { ADD_USER_INFO } from "../constants";

export const addUserInfo = (userInfo) => {
  return {
    type: ADD_USER_INFO,
    payload: userInfo,
  };
};
