import { useState } from "react";
import { useNotes } from "../contexts/notes-context";
import { useAuth } from "../contexts/auth-context";
import { addLabelInNote } from "../services/addLabelInNote";
import { API_STATUS } from "../constants";
export const LabelsDropdown = ({ noteId, isNoteItem }) => {
  const {
    notesState: { labelsList },
    notesDispatch,
  } = useNotes();
  const [input, setInput] = useState("");
  //   const { dispatch, state } = useDataContext();
  const { token } = useAuth();
  //   const [checkbox, setCheckBox] = useState(getLabels());
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");
  function checkIfItemExistsInList(labelsList, noteId) {
    return labelsList.some((item) => item._id === noteId);
  }

  function getLabels() {
    return labelsList.map((item, index) => {
      if (checkIfItemExistsInList(item.list, noteId)) {
        return {
          id: item._id,
          name: item.name,
          checked: true,
        };
      }
      return {
        id: item._id,
        name: item.name,
        checked: false,
      };
    });
  }
  //   const addToListAndServer = async (playlistObject) => {
  //     try {
  //       // showToast(`Adding to ${toastItem}`);
  //       const { data, status } = await axios.post(
  //         `https://dhrutham-play-backend.herokuapp.com/library`,
  //         playlistObject,
  //         {
  //           headers: {
  //             authorization: token,
  //           },
  //         }
  //       );
  //       if (status === 200) {
  //         dispatch({ type: "SET_LIBRARY", payload: data.library });
  //       }
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };

  async function createLabel() {
    const postObject = {
      labelName: input,
      noteId,
    };
    await addLabelInNote({
      postObject,
      token,
      notesDispatch,
      setStatus,
      setErrorMessage,
    });
    setInput("");
    // dispatch({ type: "CREATE_PLAYLIST", payload: playlistObject });
    // setModal(false);
  }
  return (
    <div className="padding-left flex-column margin-bottom">
      {/* <div className="drop-down">
        {checkbox.map((item, index) => (
          <PlaylistCheckBox
            item={item}
            index={index}
            videoId={videoId}
            setCheckBox={setCheckBox}
          />
        ))}
      </div> */}
      <div className="padding-bottom padding-right">
        <input
          className="border-bottom font-size-6 full-width margin-top"
          style={{ height: "1.3rem", outline: "0" }}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Enter label name"
        ></input>

        {input !== "" && (
          <button
            className="margin-top padding-right btn btn-text text-end full-width color-blue"
            onClick={createLabel}
          >
            CREATE
          </button>
        )}
      </div>
    </div>
  );
};
