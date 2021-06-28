import axios from "axios";
import { API_STATUS, API_URL } from "../constants";
export const addLabelFromListToNote = async ({
  postObject,
  token,
  notesDispatch,
  setStatus,
  setErrorMessage,
}) => {
  try {
    setStatus(API_STATUS.LOADING);

    const { data, status } = await axios.post(
      `${API_URL}/notes/${postObject.noteId}/labels/`,
      postObject,
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 200) {
      notesDispatch({
        type: "ADD_LABEL_FROM_LIST_TO_NOTE",
        payload: { label: postObject.label, noteId: postObject.noteId },
      });
      setStatus(API_STATUS.SUCCESS);
    }
  } catch (error) {
    console.log(error);
    setStatus(API_STATUS.ERROR);
    // setErrorMessage(error);
  }
};
