import React from "react";

interface ProductTypeSelectorProps {
  productType: string;
  setProductType: (productType: string) => void;
}

const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({ productType, setProductType }) => {
  return (
    <div className="form-group">
      <label>Product Type:</label>
      <select value={productType} onChange={(e) => setProductType(e.target.value)}>
        <option value="t-shirt">T-shirt</option>
        <option value="sweater">Sweater</option>
      </select>
    </div>
  );
};

export default ProductTypeSelector;
