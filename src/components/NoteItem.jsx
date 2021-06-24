import { Pin } from "./Pin";
import { ColorPalette } from "./ColorPalette";
export const NoteItem = ({ noteId, title, text, isPinned, color, labels }) => {
  return (
    <div style={{ backgroundColor: color }}>
      <div className="flex flex-col ">
        <div className="flex justify-between">
          <div>{title}</div>
          <Pin noteId={noteId} isPinned={isPinned} isNoteItem />
        </div>

        <div className="break-all flex-grow-1 w-full">{text}</div>
        <div className="flex flex-end">
          <ColorPalette />
          <div>+ Labels</div>
        </div>
      </div>
    </div>
  );
};
