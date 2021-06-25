import { Navigate, useNavigate } from "react-router";
import { useNotes } from "../contexts/notes-context";

export const LabelList = ({ setSelectedLabel }) => {
  const navigate = useNavigate();
  const {
    notesState: { labelsList },
  } = useNotes();
  return (
    <div className="mt-20 w-72">
      {labelsList.map((label) => {
        return (
          <div
            onClick={() => {
              setSelectedLabel(label.name);
              navigate(`#/labels/${label._id}`);
            }}
          >
            {label.name}
          </div>
        );
      })}
    </div>
  );
};
