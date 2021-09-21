import axios from "axios";
import { API_STATUS, API_URL } from "../constants";
export const addLabelInNote = async ({
  postObject,
  token,
  notesDispatch,
  setLabelStatus,
  showToast,
}) => {
  try {
    setLabelStatus(API_STATUS.LOADING);

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
      setLabelStatus(API_STATUS.SUCCESS);
    }
  } catch (error) {
    setLabelStatus(API_STATUS.ERROR);
    showToast("Something went wrong");
  }
};
