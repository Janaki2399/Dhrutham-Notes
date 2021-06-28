import { useState } from "react";
import { useNotes } from "../contexts/notes-context";
import { useAuth } from "../contexts/auth-context";
import { LabelCheckBox } from "./LabelCheckbox";

export const LabelsDropdown = ({
  isLabelDropDownOpen,
  labelsInNote,
  labelCreationAction,
  checkboxTogglingAction,
  isLabelInList,
}) => {
  const {
    notesState: { labelsList },
  } = useNotes();

  const [input, setInput] = useState("");

  return (
    <div
      className={
        isLabelDropDownOpen
          ? "block absolute border-2 z-10 bg-white right-0 shadow-xl"
          : "hidden"
      }
    >
      <div className="drop-down h-36 overflow-y-scroll">
        {labelsList.map((item) => (
          <LabelCheckBox
            key={item._id}
            item={item}
            checkboxTogglingAction={checkboxTogglingAction}
            isLabelInList={isLabelInList}
          />
        ))}
      </div>
      <div className="padding-bottom padding-right">
        <input
          className="border-bottom font-size-6 full-width margin-top"
          style={{ height: "1.3rem", outline: "0" }}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
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
