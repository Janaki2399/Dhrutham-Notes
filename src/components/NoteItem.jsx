import { Pin } from "./Pin";
import { ColorPalette } from "./ColorPalette";
import { LabelPills } from "./LabelPills";
import { LabelsDropdown } from "./LabelsDropdown";
import { useNotes } from "../contexts/notes-context";
import { useAuth } from "../contexts/auth-context";
import { updatePinStatus } from "../services/updatePinStatus";
import { updateColor } from "../services/updateColor";
import { addLabelInNote } from "../services/addLabelInNote";
import { addLabelFromListToNote } from "../services/addLabelFromListToNote";
import { removeLabelFromNote } from "../services/removeLabelFromNote";
import { useState } from "react";
import { Modal } from "./Modal";
import { NotesInput } from "./NotesInput";
import { deleteNote } from "../services/deleteNote";
import { API_STATUS } from "../constants";
import { useToast } from "../contexts/toast-context";
import { Loader } from "./Loader";

export const NoteItem = ({
  noteId,
  title,
  text,
  isPinned,
  color,
  labelList,
}) => {
  const { notesDispatch } = useNotes();
  const { showToast } = useToast();
  const [isLabelDropDownOpen, setLabelDropDownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [labelStatus, setLabelStatus] = useState(API_STATUS.IDLE);
  const [colorChangeStatus, setColorChangeStatus] = useState(API_STATUS.IDLE);
  const [deleteStatus, setDeleteStatus] = useState(API_STATUS.IDLE);
  const { token } = useAuth();

  const pinAction = () => {
    const updateObject = {
      isPinned,
      noteId,
    };
    updatePinStatus({
      updateObject,
      token,
      notesDispatch,
      setStatus,
      showToast,
    });
  };

  const changeColor = (newColor) => {
    const updateObject = {
      color: newColor,
      noteId,
    };
    updateColor({
      updateObject,
      token,
      notesDispatch,
      setColorChangeStatus,
      showToast,
    });
  };

  const openLabelDropDown = () => {
    setLabelDropDownOpen((prevState) => !prevState);
  };

  const deleteNoteItem = () => {
    deleteNote({ noteId, token, setDeleteStatus, notesDispatch, showToast });
  };

  const openModal = () => {
    setModal(true);
  };

  async function createLabel(input, setInput) {
    const postObject = {
      labelName: input,
      noteId,
    };
    await addLabelInNote({
      postObject,
      token,
      notesDispatch,
      setLabelStatus,
      showToast,
    });
    setInput("");
  }

  const toggleCheckBox = (event, item) => {
    const postObject = { label: { _id: item._id, name: item.name }, noteId };
    const deleteObject = { noteId, labelId: item._id };

    if (event.target.checked) {
      addLabelFromListToNote({
        postObject,
        token,
        notesDispatch,
        setLabelStatus,
        showToast,
      });
    } else {
      removeLabelFromNote({
        deleteObject,
        token,
        notesDispatch,
        setLabelStatus,
        showToast,
      });
    }
  };

  function checkIfLabelExistsInList(labelId) {
    return labelList.some((item) => item._id === labelId);
  }

  return (
    <div
      style={{ backgroundColor: color }}
      className="border-2 border-gray-200 rounded-xl relative"
    >
      <div className="flex flex-col m-2 justify-between h-full">
        <div>
          <div className="flex justify-between">
            <div className="font-semibold ">{title}</div>
            <Pin isPinned={isPinned} pinAction={pinAction} status={status} />
          </div>

          <div className="break-all justify-between flex-grow-1  w-full">
            {text}
          </div>
        </div>
        <div>
          <LabelPills labels={labelList} />

          <div className="mt-3 mb-3 flex justify-between">
            <div className="flex">
              <ColorPalette
                changeColor={changeColor}
                currentColor={color}
                colorChangeStatus={colorChangeStatus}
              />
              <button
                className="ml-4 focus:outline-none"
                onClick={openLabelDropDown}
              >
                <span className="material-icons-outlined text-gray-500 ">
                  new_label
                </span>
              </button>
              <button className=" focus:outline-none" onClick={openModal}>
                <span className="material-icons-outlined text-gray-500 ">
                  edit
                </span>
              </button>
            </div>
            {deleteStatus === API_STATUS.LOADING ? (
              <div>
                <Loader />
              </div>
            ) : (
              <button className=" focus:outline-none" onClick={deleteNoteItem}>
                <span className="material-icons-outlined text-gray-500 ">
                  delete
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      <LabelsDropdown
        isLabelDropDownOpen={isLabelDropDownOpen}
        labelsInNote={labelList}
        labelCreationAction={createLabel}
        checkboxTogglingAction={toggleCheckBox}
        isLabelInList={checkIfLabelExistsInList}
        labelStatus={labelStatus}
      />
      {modal && (
        <Modal>
          <NotesInput
            noteItem={{ noteId, title, text, isPinned, color, labelList }}
            isNoteUpdate
            setModal={setModal}
          />
        </Modal>
      )}
    </div>
  );
};
