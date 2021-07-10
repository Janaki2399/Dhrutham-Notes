import { useEffect, useReducer, useRef, useState } from "react";
import { Pin } from "./Pin";
import { ColorPalette } from "./ColorPalette";
import { API_STATUS } from "../constants";
import { useAuth } from "../contexts/auth-context";
import { Loader } from "../components/Loader";
import { addNewNote } from "../services/addNewNote";
import { addLabelToList } from "../services/addLabelToList";
import { updateNote } from "../services/updateNote";
import { useNotes } from "../contexts/notes-context";
import { LabelsDropdown } from "./LabelsDropdown";
import { LabelPills } from "./LabelPills";
import { useLocation, useParams } from "react-router";
import { useToast } from "../contexts/toast-context";

export const NotesInput = ({ noteItem, isNoteUpdate, setModal }) => {
  const { token } = useAuth();
  const { labelName } = useParams();
  const location = useLocation();
  const notesRef = useRef(null);

  const { notesDispatch } = useNotes();
  const { showToast } = useToast();

  const [title, setTitle] = useState(() => {
    return isNoteUpdate ? noteItem.title : "";
  });
  const [isPinned, setPinStatus] = useState(() => {
    return isNoteUpdate ? noteItem.isPinned : false;
  });
  const [color, setColor] = useState(() => {
    return isNoteUpdate ? noteItem.color : "#F9FAFB";
  });
  const [labelList, setLabelList] = useState(() => {
    return isNoteUpdate ? noteItem.labelList : [];
  });

  const [status, setStatus] = useState(API_STATUS.IDLE);

  const [isLabelDropDownOpen, setLabelDropDownOpen] = useState(false);

  useEffect(() => {
    labelName
      ? setLabelList([{ name: labelName, _id: location.state.id }])
      : setLabelList([]);
  }, [labelName, location?.state?.id]);

  useEffect(() => {
    notesRef.current.focus();
    if (isNoteUpdate) {
      notesRef.current.innerText = noteItem.text;
    }
  }, []);

  const changePinState = () => {
    setPinStatus((previousState) => !previousState);
  };

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  const addNote = async () => {
    const note = {
      title,
      text: notesRef.current.innerText,
      isPinned,
      labelList,
      color,
    };
    await addNewNote({
      note,
      token,
      notesDispatch,
      setStatus,
      showToast,
    });

    setPinStatus(false);
    setColor("#F9FAFB");
    setTitle("");
    !labelName && setLabelList([]);
    notesRef.current.innerText = "";
  };

  const updateNoteItem = () => {
    const note = {
      noteId: noteItem.noteId,
      title,
      text: notesRef.current.innerText,
      isPinned,
      labelList,
      color,
    };
    updateNote({
      note,
      token,
      notesDispatch,
      setStatus,
      showToast,
    });
  };

  const openLabelDropDown = () => {
    setLabelDropDownOpen((prevState) => !prevState);
  };

  async function createLabel(input, setInput) {
    const postObject = {
      labelName: input,
    };
    await addLabelToList({
      postObject,
      token,
      notesDispatch,
      setLabelList,
      setStatus,
      showToast,
    });
    setInput("");
  }

  const toggleCheckBox = (event, item) => {
    if (event.target.checked) {
      setLabelList((prevList) => prevList.concat(item));
    } else {
      setLabelList((prevList) =>
        prevList.filter((label) => label._id !== item._id)
      );
    }
  };

  function checkIfLabelExistsInList(labelId) {
    return labelList.some((item) => item._id === labelId);
  }
  return (
    <div
      className="relative dropdown m-auto flex flex-col w-9/10 max-w-2xl px-3 shadow-2xl rounded-lg  py-2"
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between">
        <input
          className="p-1 focus:outline-none font-semibold w-full mt-1"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ backgroundColor: color }}
        ></input>
        <Pin isPinned={isPinned} pinAction={changePinState} />
      </div>

      <div
        contentEditable
        suppressContentEditableWarning
        className="w-full border-2 focus:outline-none border-none min-h-3 m-1 font-sm placeholder"
        tabIndex="0"
        spellCheck="false"
        ref={notesRef}
      ></div>

      <LabelPills labels={labelList} />
      <div className="flex w-full justify-between border-none m-1">
        <div className="flex">
          <ColorPalette changeColor={changeColor} currentColor={color} />
          <button
            className="ml-4 focus:outline-none"
            onClick={openLabelDropDown}
          >
            <span className="material-icons-outlined text-gray-500 ">
              new_label
            </span>
          </button>
        </div>

        <div>
          {isNoteUpdate && (
            <button
              className="text-primary-color font-semibold mr-5 focus:outline-none"
              onClick={() => setModal(false)}
            >
              <div>Close</div>
            </button>
          )}

          <button
            className="text-primary-color font-semibold"
            onClick={isNoteUpdate ? updateNoteItem : addNote}
            disabled={status === "loading" || title.length === 0}
          >
            {status === "loading" ? (
              <Loader />
            ) : (
              <div>{isNoteUpdate ? "Save" : "Add"}</div>
            )}
          </button>
        </div>
      </div>
      <LabelsDropdown
        isLabelDropDownOpen={isLabelDropDownOpen}
        labelsInNote={labelList}
        labelCreationAction={createLabel}
        checkboxTogglingAction={toggleCheckBox}
        isLabelInList={checkIfLabelExistsInList}
      />
    </div>
  );
};
