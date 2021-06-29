export function LabelCheckBox({ item, checkboxTogglingAction, isLabelInList }) {
  const handleToggling = (event) => {
    checkboxTogglingAction(event, item);
  };
  return (
    <div className="flex cursor-pointer ml-2">
      <input
        type="checkbox"
        id={item._id}
        className="mr-1 h-4 "
        checked={isLabelInList(item._id)}
        onChange={handleToggling}
      />
      <label className="w-full font-size-5 ml-3" htmlFor={item._id}>
        {item.name}
      </label>
    </div>
  );
}
