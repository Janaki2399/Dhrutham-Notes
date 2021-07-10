import axios from "axios";
import { API_STATUS, API_URL } from "../constants";

export const fetchLabelList = async ({ token, notesDispatch, setStatus }) => {
  try {
    setStatus(API_STATUS.LOADING);
    const { data, status } = await axios.get(`${API_URL}/labels`, {
      headers: {
        authorization: token,
      },
    });
    if (status === 200) {
      notesDispatch({
        type: "LOAD_LABELS",
        payload: { labelsList: data.labelsList },
      });
      setStatus(API_STATUS.SUCCESS);
    }
  } catch (error) {
    setStatus(API_STATUS.ERROR);
  }
};
