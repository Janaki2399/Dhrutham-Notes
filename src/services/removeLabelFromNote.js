import axios from "axios";
import { API_STATUS, API_URL } from "../constants";
export const removeLabelFromNote = async ({
  deleteObject,
  token,
  notesDispatch,
  setStatus,
}) => {
  try {
    setStatus(API_STATUS.LOADING);

    const { data, status } = await axios.delete(
      `${API_URL}/notes/${deleteObject.noteId}/labels/${deleteObject.labelId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 200) {
      console.log("removed labelId");
      notesDispatch({
        type: "REMOVE_LABEL_FROM_NOTE",
        payload: { labelId: deleteObject.labelId, noteId: deleteObject.noteId },
      });
      setStatus(API_STATUS.SUCCESS);
    }
  } catch (error) {
    setStatus(API_STATUS.ERROR);
    // setErrorMessage(error);
  }
};
