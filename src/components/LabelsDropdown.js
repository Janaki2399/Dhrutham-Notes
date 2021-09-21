import { useState } from "react";
import { useNotes } from "../contexts/notes-context";
import { LabelCheckBox } from "./LabelCheckbox";
import { useDebounce } from "../hooks/useDebounce";
import { API_STATUS } from "../constants";
import { Loader } from "./Loader";

export const LabelsDropdown = ({
  isLabelDropDownOpen,
  labelCreationAction,
  checkboxTogglingAction,
  isLabelInList,
  labelStatus,
}) => {
  const {
    notesState: { labelsList },
  } = useNotes();

  const [input, setInput] = useState("");

  const debouncedQuery = useDebounce(input, 300);
  const filteredLabelList = labelsList.filter((label) =>
    label.name.toLowerCase().includes(debouncedQuery)
  );

  const getLabelDropDownStyles = () => {
    if (isLabelDropDownOpen) {
      return "block flex flex-col absolute border-2 z-10 h-44 w-44 bg-white -bottom-48  left-10 shadow-xl";
    }
    return "hidden ";
  };

  const checkboxList = filteredLabelList.map((item) => (
    <LabelCheckBox
      key={item._id}
      item={item}
      checkboxTogglingAction={checkboxTogglingAction}
      isLabelInList={isLabelInList}
    />
  ));

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  if (labelStatus === API_STATUS.LOADING) {
    return (
      <div className={getLabelDropDownStyles()}>
        <div className="mx-auto">
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <div className={getLabelDropDownStyles()}>
      <div className="drop-down w-30 h-36 overflow-y-auto">
        {checkboxList.length > 0 ? (
          checkboxList
        ) : (
          <div className="text-gray-600 text-center">No Labels</div>
        )}
      </div>

      <div className="w-full ">
        <input
          className="w-full px-5 mt-2 h-4 focus:outline-none focus:ring focus:border-blue-300 py-2 "
          value={input}
          onChange={handleInputChange}
          placeholder="Enter label name"
          maxlength="18"
        ></input>
        {filteredLabelList.length === 0 && (
          <button
            className="border-t-2 w-full bg-gray-200 break-words"
            disabled={filteredLabelList.length !== 0}
            onClick={() => labelCreationAction(input, setInput)}
          >
            + create {filteredLabelList.length === 0 && input}
          </button>
        )}
      </div>
    </div>
  );
};
