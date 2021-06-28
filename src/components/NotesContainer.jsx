import { NoteItem } from "./NoteItem";

export const NotesContainer = ({ notes, pinAction }) => {
  return (
    <div className="grid grid-cols-1 grid-flow-row auto-rows-max gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-auto mt-4 justify-items-stretch">
      {notes.map(({ _id, title, text, isPinned, color, labelList }) => {
        return (
          <NoteItem
            key={_id}
            noteId={_id}
            title={title}
            text={text}
            isPinned={isPinned}
            color={color}
            labelList={labelList}
            pinAction={pinAction}
          />
        );
      })}
    </div>
  );
};
