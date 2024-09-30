import React, { useEffect, useState } from "react";

interface ImageUploaderProps {
  defaultImage?: string | null;  // Optional default image prop
  setUploadedImage: (base64Image: string | null) => void;  // Function to update the parent component
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ defaultImage, setUploadedImage }) => {
  const [uploadedImage, setLocalUploadedImage] = useState<string | null>(null);  // Local state for the image

  // Set the default image when the component mounts
  useEffect(() => {
    if (defaultImage) {
      setLocalUploadedImage(defaultImage);   // Set local state with the default image
      setUploadedImage(defaultImage);        // Inform parent about the default image
    }
  }, [defaultImage, setUploadedImage]);  // Dependencies ensure this runs only when these values change

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];  // Get the first selected file
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;  // Convert file to base64 string
        setLocalUploadedImage(base64Image);           // Set the local state with the uploaded image
        setUploadedImage(base64Image);                // Notify parent component of the new image
      };
      reader.readAsDataURL(file);  // Read the file as a data URL
    } else {
      alert("Please upload a valid image file (PNG or JPG).");
    }
  };

  return (
    <div className="form-group">
      <label>Upload Image (+$10):</label>
      <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageUpload} />

      {/* Conditionally render a message or image preview based on whether an image is uploaded */}
      {uploadedImage ? (
        <span>Image Exists</span>
      ) : (
        <span>No image uploaded yet</span>
      )}
    </div>
  );
};

export default ImageUploader;
