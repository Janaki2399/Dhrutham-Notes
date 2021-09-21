import axios from "axios";
import { API_STATUS, API_URL } from "../constants";
export const updateNote = async ({
  note,
  token,
  notesDispatch,
  setStatus,
  showToast,
}) => {
  try {
    setStatus(API_STATUS.LOADING);
    const { data, status } = await axios.post(
      `${API_URL}/notes/${note.noteId}`,
      {
        ...note,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (status === 200) {
      notesDispatch({
        type: "UPDATE_NOTE",
        payload: { noteId: note.noteId, note: data.note },
      });
      setStatus(API_STATUS.SUCCESS);
    }
  } catch (error) {
    setStatus(API_STATUS.ERROR);
    showToast("Something went wrong");
  }
};
