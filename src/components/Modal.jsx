export const Modal = ({ children }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50  bg-gray-700 bg-opacity-50 flex h-full">
      <div className="relative bg-white w-full max-w-md m-auto flex-col flex">
        <div className="flex-horizontal center-align space-between"></div>
        <div className="padding-right">{children}</div>
      </div>
    </div>
  );
};
