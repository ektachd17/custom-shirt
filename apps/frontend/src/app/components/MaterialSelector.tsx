import React from "react";

interface MaterialSelectorProps {
  material: string;
  setMaterial: (material: string) => void;
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({ material, setMaterial }) => {
  return (
    <div className="form-group">
      <label htmlFor="material-select">Material:</label>
      <select id="material-select" value={material} onChange={(e) => setMaterial(e.target.value)}>
        <option value="light">Light Cotton</option>
        <option value="heavy">Heavy Cotton (+$3)</option>
      </select>
    </div>
  );
};

export default MaterialSelector;
