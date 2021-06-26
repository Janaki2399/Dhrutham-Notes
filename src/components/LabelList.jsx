import { Navigate, useNavigate } from "react-router";
import { useNotes } from "../contexts/notes-context";

export const LabelList = () => {
  const navigate = useNavigate();
  const {
    notesState: { labelsList },
  } = useNotes();

  const handleLabelSelection = (label) => {
    navigate(`#/labels/${label._id}`);
  };
  return (
    <div className="mt-20 w-72">
      {labelsList.map(({ _id, name }) => {
        return (
          <div
            key={_id}
            className="hover:bg-gray-200 text-lg p-1 cursor-pointer"
            onClick={() => {
              handleLabelSelection(_id);
            }}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};
