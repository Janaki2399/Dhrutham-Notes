import { useNotes } from "../contexts/notes-context";
import { addLabelFromListToNote } from "../services/addLabelFromListToNote";
import { useAuth } from "../contexts/auth-context";
import { useState } from "react";
import { API_STATUS } from "../constants";
import { removeLabelFromNote } from "../services/removeLabelFromNote";

export function LabelCheckBox({ item, index, noteId, setCheckBox }) {
  const { token } = useAuth();
  const { notesDispatch } = useNotes();
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggle = (i) => {
    setCheckBox((prev) =>
      prev.map((item, index) =>
        index === i ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleCheckBox = (event) => {
    const postObject = { label: { _id: item.id, name: item.name }, noteId };
    const deleteObject = { noteId, labelId: item.id };

    handleToggle(index);

    if (event.target.checked) {
      addLabelFromListToNote({
        postObject,
        token,
        notesDispatch,
        setStatus,
      });
    } else {
      removeLabelFromNote({ deleteObject, token, notesDispatch, setStatus });
    }
  };
  return (
    <div className="flex cursor-pointer">
      <input
        type="checkbox"
        id={item.id}
        className="mr-1 checkbox-size"
        checked={item.checked}
        onChange={toggleCheckBox}
      />
      <label className="w-full font-size-5" htmlFor={item.id}>
        {item.name}
      </label>
    </div>
  );
}
