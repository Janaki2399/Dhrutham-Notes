export const Toast = ({ message }) => {
  return (
    <div className="h-12 w-60 fixed bottom-2 left-0 bg-gray-500 text-white p-2.5">
      {message}
    </div>
  );
};
