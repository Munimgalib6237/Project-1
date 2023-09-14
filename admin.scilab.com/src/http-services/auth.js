import axios from "axios";

/* Login */
const login = async (data) => {
  return await axios.post(`${process.env.REACT_APP_AUTH_ENDPOINT}login`, data);
};

/* Reset */
const reset = async (data) => {
  return await axios.post(`${process.env.REACT_APP_AUTH_ENDPOINT}reset`, data);
};

export const Auth = {
  login,
  reset,
};
