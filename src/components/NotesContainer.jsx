import { NoteItem } from "./NoteItem";

export const NotesContainer = ({ notes, pinAction }) => {
  return (
    <div className="grid grid-flow-row grid-cols-4 grid-rows-4 md:grid-cols-4 md:grid-grid-rows-2 md-grid-flow-row gap-10 ">
      {notes.map(({ _id, title, text, isPinned, color, labels }) => {
        return (
          <NoteItem
            key={_id}
            noteId={_id}
            title={title}
            text={text}
            isPinned={isPinned}
            color={color}
            labels={labels}
            pinAction={pinAction}
          />
        );
      })}
    </div>
  );
};
