import { Action } from "history";
import { useNotes } from "../contexts/notes-context";
export const Pin = ({ noteId, isPinned, pinAction, isNoteItem }) => {
  const { notesDispatch } = useNotes();
  const iconBtn = isPinned ? (
    <span className="material-icons">push_pin</span>
  ) : (
    <span className="material-icons-outlined text-gray-500">push_pin</span>
  );

  const handleClickAction = () => {
    isNoteItem
      ? notesDispatch({ type: "CHANGE_PIN_STATE", payload: { id: noteId } })
      : pinAction();
  };
  return (
    <button className="focus:outline-none m-1 p-1" onClick={handleClickAction}>
      {iconBtn}
    </button>
  );
};
