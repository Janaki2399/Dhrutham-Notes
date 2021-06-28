import axios from "axios";
import { API_STATUS, API_URL } from "../constants";
export const deleteNote = async ({
  noteId,
  token,
  notesDispatch,
  setDeleteStatus,
}) => {
  try {
    setDeleteStatus(API_STATUS.LOADING);

    const { data, status } = await axios.delete(`${API_URL}/notes/${noteId}`, {
      headers: {
        authorization: token,
      },
    });
    if (status === 200) {
      setDeleteStatus(API_STATUS.SUCCESS);
      notesDispatch({
        type: "DELETE_NOTE",
        payload: { noteId },
      });
    }
  } catch (error) {
    setDeleteStatus(API_STATUS.ERROR);
  }
};
