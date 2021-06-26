import { useState } from "react";
import { useNotes } from "../contexts/notes-context";
import { useAuth } from "../contexts/auth-context";
import { LabelCheckBox } from "./LabelCheckbox";
import { addLabelInNote } from "../services/addLabelInNote";
import { API_STATUS } from "../constants";
export const LabelsDropdown = ({
  noteId,
  isLabelDropDownOpen,
  labelsInNote,
}) => {
  const {
    notesState: { notes, labelsList },
    notesDispatch,
  } = useNotes();
  const [input, setInput] = useState("");
  const [checkbox, setCheckBox] = useState(getLabels());

  const { token } = useAuth();
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");
  function checkIfItemExistsInList(labelId, labelsInNote) {
    return labelsInNote.some((item) => item._id === labelId);
  }

  function getLabels() {
    return labelsList.map((item, index) => {
      if (checkIfItemExistsInList(item._id, labelsInNote)) {
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
    <div
      className={
        isLabelDropDownOpen
          ? "block absolute border-2 z-10 bg-white "
          : "hidden"
      }
    >
      <div className="drop-down h-36 overflow-y-scroll">
        {checkbox.map((item, index) => (
          <LabelCheckBox
            key={item.id}
            item={item}
            index={index}
            noteId={noteId}
            setCheckBox={setCheckBox}
          />
        ))}
      </div>
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
