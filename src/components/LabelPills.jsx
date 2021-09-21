export const LabelPills = ({ labels }) => {
  const labelPills = labels?.map(({ _id, name }) => {
    return (
      <div key={_id} className="mr-1 bg-gray-200 rounded-md px-1 text-xs">
        {name}
      </div>
    );
  });
  return <div className="flex mt-3 flex-wrap">{labelPills}</div>;
};
