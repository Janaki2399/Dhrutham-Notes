import { Loader } from "./Loader";

export const Pin = ({ isPinned, pinAction, status }) => {
  const iconBtn = isPinned ? (
    <span className="material-icons">push_pin</span>
  ) : (
    <span className="material-icons-outlined text-gray-500">push_pin</span>
  );

  return (
    <div>
      {status === "loading" ? (
        <div>
          <Loader />
        </div>
      ) : (
        <button className="focus:outline-none" onClick={pinAction}>
          {iconBtn}
        </button>
      )}
    </div>
  );
};
