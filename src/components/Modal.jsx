export const Modal = ({ children, setModal }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50  bg-gray-300 backdrop-opacity-80 flex h-full">
      <div className="relative bg-white w-full max-w-md m-auto flex-col flex">
        <div className="flex-horizontal center-align space-between">
          <div>
            <button onClick={() => setModal(false)} className=" btn-box ">
              <span className=" material-icons-outlined icon-color-gray ">
                close
              </span>
            </button>
          </div>
        </div>
        <div className="padding-right">{children}</div>
      </div>
    </div>
  );
};
