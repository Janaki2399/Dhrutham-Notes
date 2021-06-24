export const LabelPills = ({ labels }) => {
  return (
    <div className="flex">
      {labels.map((label) => {
        return <div>{label.name}</div>;
      })}
    </div>
  );
};
