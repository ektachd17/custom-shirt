import React from "react";
import html2canvas from "html2canvas";

interface SaveAsImageButtonProps {
  canvasRef: React.RefObject<HTMLDivElement>;
}
/*

*/
const SaveAsImageButton: React.FC<SaveAsImageButtonProps> = ({ canvasRef }) => {
  const saveAsImage = async () => {
    if (canvasRef.current) {
      const canvasElement = canvasRef.current;
      const canvas = await html2canvas(canvasElement);
      const link = document.createElement("a");
      link.download = "tshirt_design.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return <button className="btn btn-primary" onClick={saveAsImage}>Save T-shirt as Image</button>;
};

export default SaveAsImageButton;
