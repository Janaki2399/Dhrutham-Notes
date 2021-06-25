import { Pin } from "./Pin";
import { ColorPalette } from "./ColorPalette";
import { LabelPills } from "./LabelPills";
import { LabelsDropdown } from "./LabelsDropdown";
export const NoteItem = ({
  noteId,
  title,
  text,
  isPinned,
  color,
  labelList,
}) => {
  console.log(labelList);
  return (
    <div style={{ backgroundColor: color }}>
      <div className="flex flex-col ">
        <div className="flex justify-between">
          <div>{title}</div>
          <Pin noteId={noteId} isPinned={isPinned} isNoteItem />
        </div>

        <div className="break-all flex-grow-1 w-full">{text}</div>
        <LabelPills labels={labelList} />
        <div className="flex flex-end">
          <ColorPalette />
          <LabelsDropdown noteId={noteId} />
        </div>
      </div>
    </div>
  );
};
