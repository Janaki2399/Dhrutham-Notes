import { useState } from "react";
import { useNotes } from "../contexts/notes-context";
import { LabelCheckBox } from "./LabelCheckbox";

export const LabelsDropdown = ({
  isLabelDropDownOpen,
  labelCreationAction,
  checkboxTogglingAction,
  isLabelInList,
}) => {
  const {
    notesState: { labelsList },
  } = useNotes();

  const [input, setInput] = useState("");

  const getLabelDropDownStyles = () => {
    if (isLabelDropDownOpen) {
      return "block absolute border-2 z-10 bg-white right-0 shadow-xl";
    }
    return "hidden";
  };

  const checkboxList = labelsList.map((item) => (
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

  return (
    <div className={getLabelDropDownStyles()}>
      <div className="drop-down h-36 overflow-y-scroll">{checkboxList}</div>
      <div>
        <input
          className=" w-full mt-2 h-4 focus:outline-none"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter label name"
        ></input>

        {input !== "" && (
          <button
            className="border-t-2 w-full bg-gray-200"
            onClick={() => labelCreationAction(input, setInput)}
          >
            + create {input}
          </button>
        )}
      </div>
    </div>
  );
};
