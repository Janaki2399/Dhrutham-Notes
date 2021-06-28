import axios from "axios";
import { API_STATUS, API_URL } from "../constants";
export const updateColor = async ({
  updateObject,
  token,
  notesDispatch,
  setColorChangeStatus,
}) => {
  try {
    setColorChangeStatus(API_STATUS.LOADING);
    const { data, status } = await axios.post(
      `${API_URL}/notes/${updateObject.noteId}`,
      {
        updateObject,
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
        payload: { noteId: updateObject.noteId, note: data.note },
      });
      setColorChangeStatus(API_STATUS.SUCCESS);
    }
  } catch (error) {
    setColorChangeStatus(API_STATUS.ERROR);
    // setErrorMessage(error);
  }
};
