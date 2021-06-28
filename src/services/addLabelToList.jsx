import axios from "axios";
import { API_STATUS, API_URL } from "../constants";
export const addLabelToList = async ({
  postObject,
  token,
  notesDispatch,
  setLabelList,
  setStatus,
  setErrorMessage,
}) => {
  try {
    setStatus(API_STATUS.LOADING);

    const { data, status } = await axios.post(
      `${API_URL}/labels/to-list`,
      postObject,
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 200) {
      notesDispatch({
        type: "ADD_LABEL_TO_LIST",
        payload: { label: data.label },
      });
      setLabelList((prevList) => prevList.concat(data.label));
      setStatus(API_STATUS.SUCCESS);
    }
  } catch (error) {
    setStatus(API_STATUS.ERROR);
    setErrorMessage(error);
  }
};
