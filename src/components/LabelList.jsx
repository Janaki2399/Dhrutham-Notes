import { useNavigate } from "react-router";
import { useNotes } from "../contexts/notes-context";

export const LabelList = ({ isLabelListOpen }) => {
  const navigate = useNavigate();
  const {
    notesState: { labelsList },
  } = useNotes();

  const handleLabelSelection = (name, _id) => {
    navigate(`/labels/${name}`, { state: { id: _id } });
  };

  const labelListContainer = labelsList?.map(({ _id, name }) => {
    return (
      <div
        key={_id}
        className="hover:bg-gray-200 text-lg p-1 cursor-pointer flex pl-5"
        onClick={() => {
          handleLabelSelection(name, _id);
        }}
      >
        <span className="material-icons-outlined text-gray-600 mr-5 pt-1">
          label
        </span>
        {name}
      </div>
    );
  });

  return (
    <div
      className={
        isLabelListOpen
          ? " transform transition ease-in-out duration-150 mt-14 fixed w-3/5 md:w-1/5 left-0 overflow-y-auto h-screen  z-20 bg-white labelList-height"
          : "mt-16 md:fixed md:block md:w-1/5 fixed left-0 overflow-y-auto h-screen hidden w-56 labelList-height"
      }
    >
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
