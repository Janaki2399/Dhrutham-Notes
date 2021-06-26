import { useEffect, useRef, useState } from "react";
import { Pin } from "./Pin";
import { ColorPalette } from "./ColorPalette";
import { API_STATUS } from "../constants";
import { useAuth } from "../contexts/auth-context";
import { Loader } from "../components/Loader";
import { addNewNote } from "../services/addNewNote";
import { useNotes } from "../contexts/notes-context";

export const NotesInput = () => {
  const { token } = useAuth();
  const notesRef = useRef("Enter note");
  const { notesDispatch } = useNotes();
  const [title, setTitle] = useState("");
  const [isPinned, setPinStatus] = useState(false);
  const [color, setColor] = useState("#F9FAFB");

  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    notesRef.current.focus();
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
      color,
    };
    await addNewNote({
      note,
      token,
      notesDispatch,
      setStatus,
      setErrorMessage,
    });

    setPinStatus(false);
    setColor("#F9FAFB");
    setTitle("");
    notesRef.current.innerText = "";
  };

  return (
    <div
      className="m-auto flex flex-col  max-w-xl px-3 shadow-2xl rounded-lg mt-20 "
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between">
        <input
          className="p-1 focus:outline-none font-semibold w-full mt-1"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <Pin isPinned={isPinned} pinAction={changePinState} />
      </div>

      <div
        contentEditable
        suppressContentEditableWarning
        className="w-full border-2 focus:outline-none border-none min-h-3 m-1 font-sm "
        tabIndex="0"
        spellCheck="false"
        ref={notesRef}
      ></div>

      <div className="flex">{}</div>
      <div className="flex w-full justify-between border-none m-1">
        <ColorPalette changeColor={changeColor} />
        <div>
          <button
            className="text-blue-color"
            onClick={addNote}
            disabled={status === "loading"}
          >
            {status === "loading" ? <Loader /> : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
};
