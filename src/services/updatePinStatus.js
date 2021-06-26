import axios from "axios";
import { API_STATUS, API_URL } from "../constants";
export const updatePinStatus = async ({
  updateObject,
  token,
  notesDispatch,
  setStatus,
}) => {
  try {
    setStatus(API_STATUS.LOADING);
    const { data, status } = await axios.post(
      `${API_URL}/notes/${updateObject.noteId}`,
      {
        isPinned: !updateObject.isPinned,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (status === 200) {
      notesDispatch({
        type: "CHANGE_PIN_STATE",
        payload: { id: updateObject.noteId },
      });
      setStatus(API_STATUS.SUCCESS);
    }
  } catch (error) {
    setStatus(API_STATUS.ERROR);
    // setErrorMessage(error);
  }
};
