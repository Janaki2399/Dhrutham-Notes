import { Pin } from "./Pin";
import { ColorPalette } from "./ColorPalette";
import { LabelPills } from "./LabelPills";
import { LabelsDropdown } from "./LabelsDropdown";
import { useNotes } from "../contexts/notes-context";
import { updatePinStatus } from "../services/updatePinStatus";
import { updateColor } from "../services/updateColor";
import { useState } from "react";
import { API_STATUS } from "../constants";
import { useAuth } from "../contexts/auth-context";

export const NoteItem = ({
  noteId,
  title,
  text,
  isPinned,
  color,
  labelList,
}) => {
  const { notesDispatch } = useNotes();
  const [isLabelDropDownOpen, setLabelDropDownOpen] = useState(false);
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [colorChangeStatus, setColorChangeStatus] = useState(API_STATUS.IDLE);
  const { token } = useAuth();

  const pinAction = () => {
    const updateObject = {
      isPinned,
      noteId,
    };
    updatePinStatus({ updateObject, token, notesDispatch, setStatus });
  };

  const changeColor = (newColor) => {
    const updateObject = {
      color: newColor,
      noteId,
    };
    updateColor({ updateObject, token, notesDispatch, setColorChangeStatus });
  };

  const openLabelDropDown = () => {
    setLabelDropDownOpen((prevState) => !prevState);
  };
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

          <div className="mt-3 mb-3 flex">
            <ColorPalette
              changeColor={changeColor}
              colorChangeStatus={colorChangeStatus}
            />
            <button
              className="ml-4 focus:outline-none"
              onClick={openLabelDropDown}
            >
              <span className="material-icons text-gray-500 ">new_label</span>
            </button>
          </div>
        </div>
      </div>
      <LabelsDropdown
        noteId={noteId}
        isLabelDropDownOpen={isLabelDropDownOpen}
        labelsInNote={labelList}
      />
    </div>
  );
};
