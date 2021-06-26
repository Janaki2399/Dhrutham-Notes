import { NotesContainer } from "./NotesContainer";
import { useNotes } from "../contexts/notes-context";
import { useLocation, useParams } from "react-router";
export const Notes = ({ selectedLabel }) => {
  const {
    notesState: { notes },
  } = useNotes();

  //   const location = useLocation();
  //   console.log(location.hash);
  //   const label = useParams();
  //   console.log(label);
  //   const filteredNotes = notes.filter((note) => note.name === selectedLabel);
  const pinnedNotes = notes.filter((note) => note.isPinned);
  const otherNotes = notes.filter((note) => !note.isPinned);

  return (
    <div className="max-w-5xl w-9/10 m-auto">
      {pinnedNotes.length > 0 && <div className="mt-5 mb-5">Pinned notes</div>}
      <NotesContainer notes={pinnedNotes} />
      {otherNotes.length > 0 && pinnedNotes.length > 0 && (
        <div className="mt-10">Other Notes</div>
      )}
      <NotesContainer notes={otherNotes} />
    </div>
  );
};
