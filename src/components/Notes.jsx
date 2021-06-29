import { NotesContainer } from "./NotesContainer";
import { useNotes } from "../contexts/notes-context";
import { useParams } from "react-router";

export const Notes = () => {
  const {
    notesState: { notes },
  } = useNotes();

  const { labelName } = useParams();

  if (notes.length === 0) {
    return (
      <div className="text-gray-400 font-bold flex h-full text-xl">
        <div className="m-auto"> No notes yet</div>
      </div>
    );
  }
  const filteredNotes = notes.filter((note) =>
    labelName ? note.labelList.some((label) => label.name === labelName) : true
  );
  if (filteredNotes.length === 0) {
    return (
      <div className="text-gray-400 font-bold flex h-full text-xl">
        <div className="m-auto"> No notes with this label yet</div>
      </div>
    );
  }
  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const otherNotes = filteredNotes.filter((note) => !note.isPinned);

  return (
    <section className="max-w-5xl w-9/10 m-auto ">
      {pinnedNotes.length > 0 && (
        <div className="mt-5 mb-5 text-gray-600">Pinned notes</div>
      )}
      <NotesContainer notes={pinnedNotes} />
      {otherNotes.length > 0 && pinnedNotes.length > 0 && (
        <div className="mt-5 mb-5 text-gray-600">Other Notes</div>
      )}
      <NotesContainer notes={otherNotes} />
    </section>
  );
};
