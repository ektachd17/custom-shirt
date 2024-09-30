import React, { useMemo } from "react";

interface PreviewSectionProps {
  productType: string;
  color: string;
  customText: string;
  imagePreviewUrl: string | null;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  productType,
  color,
  customText,
  imagePreviewUrl,
}) => {
  // Common style for all rectangles
  const commonStyle = useMemo(
    () => ({ fill: color, stroke: "black", strokeWidth: 2 }),
    [color]
  );

  return (
    <svg
      width="380"
      height="220"
      viewBox="0 0 380 220"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sleeves */}
      <rect x="50" y="15" width="80" height="50" rx="10" style={commonStyle} />
      <rect x="235" y="15" width="80" height="50" rx="10" style={commonStyle} />
      
      {/* T-shirt Body */}
      <rect x="110" y="10" width="150" height="200" rx="10" style={commonStyle} />
      
      {/* Image Preview */}
      {imagePreviewUrl && (
        <image
          href={imagePreviewUrl}
          x="135"
          y="70"
          width="100"
          height="100"
          preserveAspectRatio="xMidYMid slice"
        />
      )}

      {/* Custom Text */}
      <text
        x="50%"
        y="60"
        dominantBaseline="middle"
        textAnchor="middle"
        style={{ fontSize: 13, fill: color==="black"?"white":"black" }}
      >
        {customText}
      </text>
    </svg>
  );
};

export default PreviewSection;
