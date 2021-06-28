export function LabelCheckBox({ item, checkboxTogglingAction, isLabelInList }) {
  return (
    <div className="flex cursor-pointer">
      <input
        type="checkbox"
        id={item._id}
        className="mr-1 checkbox-size "
        checked={isLabelInList(item._id)}
        onChange={(event) => checkboxTogglingAction(event, item)}
      />
      <label className="w-full font-size-5" htmlFor={item._id}>
        {item.name}
      </label>
    </div>
  );
}
