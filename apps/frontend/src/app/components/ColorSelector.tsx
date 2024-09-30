import React from "react";

interface ColorSelectorProps {
  productType: string;
  color: string;
  setColor: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ productType, color, setColor }) => {
  const tShirtColors = [
    { color: "black", price: 16.95 },
    { color: "white", price: 16.95 },
    { color: "green", price: 18.95 },
    { color: "red", price: 18.95 },
  ];

  const sweaterColors = [
    { color: "black", price: 28.95 },
    { color: "white", price: 28.95 },
    { color: "pink", price: 32.95 },
    { color: "yellow", price: 32.95 },
  ];
  
  const colors = productType === "t-shirt" ? tShirtColors : sweaterColors;

  return (
    <div className="form-group">
      <label htmlFor="color-select">Color:</label>
      <select id="color-select" value={color} onChange={(e) => setColor(e.target.value)}>
        {colors.map((c) => (
          <option key={c.color} value={c.color}>
            {c.color.charAt(0).toUpperCase() + c.color.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColorSelector;
