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
    const { status } = await axios.post(
      `${API_URL}/notes/${updateObject.noteId}`,
      {
        color: updateObject.color,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (status === 200) {
      notesDispatch({
        type: "CHANGE_COLOR",
        payload: { id: updateObject.noteId, color: updateObject.color },
      });
      setColorChangeStatus(API_STATUS.SUCCESS);
    }
  } catch (error) {
    setColorChangeStatus(API_STATUS.ERROR);
    // setErrorMessage(error);
  }
};
