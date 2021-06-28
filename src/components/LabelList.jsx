import { Navigate, useNavigate } from "react-router";
import { useNotes } from "../contexts/notes-context";

export const LabelList = () => {
  const navigate = useNavigate();
  const {
    notesState: { labelsList },
  } = useNotes();

  const handleLabelSelection = (name) => {
    navigate(`/labels/${name}`);
  };

  const labelListContainer = labelsList?.map(({ _id, name }) => {
    return (
      <div
        key={_id}
        className="hover:bg-gray-200 text-lg p-1 cursor-pointer flex pl-5"
        onClick={() => {
          handleLabelSelection(name);
        }}
      >
        <span class="material-icons-outlined text-gray-600 mr-5 pt-1">
          label
        </span>
        {name}
      </div>
    );
  });

  return (
    <div className="mt-20 md:fixed md:block md:w-1/5 fixed left-0 overflow-auto h-screen hidden w-56">
      <div
        className="hover:bg-gray-200 text-lg p-1 cursor-pointer pl-5"
        onClick={() => navigate("/")}
      >
        All Notes
      </div>
      {labelListContainer}
    </div>
  );
};
