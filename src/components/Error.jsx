import error from "../assets/error.svg";

export const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="flex-col relative">
        <img
          className="relative"
          src={error}
          alt="error"
          width="500"
          height="400"
        />
      </div>
      <div>
        <div className="text-xl text-gray-800">Something went wrong</div>
      </div>
    </div>
  );
};
