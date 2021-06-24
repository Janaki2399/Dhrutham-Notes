import axios from "axios";
import { API_STATUS, API_URL } from "../constants";

export const signUp = async ({
  userDetails,
  state,
  setToken,
  navigate,
  setStatus,
  setErrorMessage,
}) => {
  try {
    setStatus(API_STATUS.LOADING);
    const { data, status } = await axios.post(`${API_URL}/signup`, userDetails);
    if (status === 200) {
      setStatus(API_STATUS.SUCCESS);
      setToken(data.token);
      navigate(state?.from ? state.from : "/");
      localStorage?.setItem("login", JSON.stringify({ token: data.token }));
    }
  } catch (error) {
    setStatus(API_STATUS.ERROR);
    setErrorMessage(error.response.data.errorMessage);
  }
};
