export const ColorPalette = ({ changeColor, colorChangeStatus }) => {
  const colors = ["#c5d7bd", "#f1d1d0", "#ffd384", "#c6fced"];

  return (
    <div className="flex">
      {colors.map((color) => {
        return (
          <div
            className="rounded-full w-5 h-5 cursor-pointer mr-1"
            onClick={() => changeColor(color)}
            style={{ backgroundColor: color }}
          ></div>
        );
      })}
    </div>
  );
};
