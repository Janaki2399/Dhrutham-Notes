import { useState } from "react";
export const ColorPalette = ({
  changeColor,
  currentColor,
  colorChangeStatus,
}) => {
  const colors = ["#f1d1d0", "#ffd384", "#c6fced", "#F9FAFB"];
  const [selectedColor, setSelectedColor] = useState(currentColor);

  const colorPalette = colors.map((color) => {
    return (
      <div
        key={color}
        className={
          selectedColor !== color
            ? "rounded-full w-5 h-5 cursor-pointer mr-1 "
            : "rounded-full w-5 h-5 cursor-pointer mr-1 border-2 border-gray-500"
        }
        onClick={() => {
          setSelectedColor(color);
          changeColor(color);
        }}
        style={{ backgroundColor: color }}
      ></div>
    );
  });
  return <div className="flex">{colorPalette}</div>;
};
