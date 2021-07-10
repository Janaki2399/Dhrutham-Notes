import axios from "axios";
import { API_STATUS, API_URL } from "../constants";

export const fetchNotes = async ({ token, notesDispatch, setStatus }) => {
  try {
    setStatus(API_STATUS.LOADING);
    const { data, status } = await axios.get(`${API_URL}/notes`, {
      headers: {
        authorization: token,
      },
    });

    if (status === 200) {
      notesDispatch({
        type: "LOAD_NOTES",
        payload: { noteList: data.noteList },
      });
      setStatus(API_STATUS.SUCCESS);
    }
  } catch (error) {
    setStatus(API_STATUS.ERROR);
  }
};
