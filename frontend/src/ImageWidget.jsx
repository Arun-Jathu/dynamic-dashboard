import React, { useState, useEffect } from "react";

const ImageWidget = ({ imageUrl, onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState(imageUrl || "");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // When the imageUrl prop changes, update the selectedImage state
  useEffect(() => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
    }
  }, [imageUrl]);

  // Handle the file input change (image upload)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        onImageChange(reader.result); // Notify the parent about the updated image
      };
      reader.readAsDataURL(file); // Convert the image to base64
    }
  };

  // Function to deduce the image size once the image is loaded
  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setImageSize({ width: naturalWidth, height: naturalHeight });
  };

  return (
    <div className="image-widget">
      <div className="image-container">
        <img
          src={
            selectedImage ||
            "https://via.placeholder.com/300x200.png?text=Default+Image" // Default image URL
          }
          alt="Widget Image"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          onLoad={handleImageLoad} // Trigger size deduction once the image loads
        />
      </div>

      {/* File input for changing the image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
};

export default ImageWidget;
