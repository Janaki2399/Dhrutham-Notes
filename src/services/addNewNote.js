import axios from "axios";
import { API_STATUS, API_URL } from "../constants";
export const addNewNote = async ({
  note,
  token,
  notesDispatch,
  setStatus,
  setErrorMessage,
}) => {
  try {
    setStatus(API_STATUS.LOADING);
    const { data, status } = await axios.post(`${API_URL}/notes`, note, {
      headers: {
        authorization: token,
      },
    });
    if (status === 200) {
      notesDispatch({ type: "ADD_NOTE", payload: { note: data.note } });
      setStatus(API_STATUS.SUCCESS);
    }
  } catch (error) {
    setStatus(API_STATUS.ERROR);
    setErrorMessage(error);
  }
};