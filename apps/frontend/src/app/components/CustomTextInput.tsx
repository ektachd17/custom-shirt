import React from "react";

interface CustomTextInputProps {
  customText: string;
  setCustomText: (customText: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ customText, setCustomText }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 16) {
      setCustomText(e.target.value);
    }
  };

  return (
    <div className="form-group">
      <label>Custom Text (max 16 characters):</label>
      <input
        type="text"
        value={customText}
        onChange={handleTextChange}
        placeholder="Add your custom text"
      />
    </div>
  );
};

export default CustomTextInput;
