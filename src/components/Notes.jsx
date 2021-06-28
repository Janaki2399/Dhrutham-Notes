import { NotesContainer } from "./NotesContainer";
import { useNotes } from "../contexts/notes-context";
import { useParams } from "react-router";

export const Notes = () => {
  const {
    notesState: { notes },
  } = useNotes();

  const { labelName } = useParams();

  const filteredNotes = notes.filter((note) =>
    labelName ? note.labelList.some((label) => label.name === labelName) : true
  );

  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const otherNotes = filteredNotes.filter((note) => !note.isPinned);

  return (
    <div className="max-w-5xl w-9/10 m-auto ">
      {pinnedNotes.length > 0 && (
        <div className="mt-5 mb-5 text-gray-600">Pinned notes</div>
      )}
      <NotesContainer notes={pinnedNotes} />
      {otherNotes.length > 0 && pinnedNotes.length > 0 && (
        <div className="mt-5 mb-5 text-gray-600">Other Notes</div>
      )}
      <NotesContainer notes={otherNotes} />
    </div>
  );
};
