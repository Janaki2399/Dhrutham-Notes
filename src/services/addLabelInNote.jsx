import axios from "axios";
import { API_STATUS, API_URL } from "../constants";
export const addLabelInNote = async ({
  postObject,
  token,
  notesDispatch,
  setStatus,
  showToast,
}) => {
  try {
    setStatus(API_STATUS.LOADING);

    const { data, status } = await axios.post(`${API_URL}/labels`, postObject, {
      headers: {
        authorization: token,
      },
    });
    if (status === 200) {
      notesDispatch({
        type: "ADD_LABEL",
        payload: { label: data.label, noteId: postObject.noteId },
      });
      setStatus(API_STATUS.SUCCESS);
    }
  } catch (error) {
    setStatus(API_STATUS.ERROR);
    showToast("Something went wrong");
  }
};
