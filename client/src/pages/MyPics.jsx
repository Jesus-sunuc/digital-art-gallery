import React, { useState, useEffect } from "react";
import fetchImages from "../service/imageService.jsx";

function MyPics({ onDelete1 }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const handleFetchImages = async () => {
    try {
      const images = await fetchImages();
      console.log("Fetched images:", images);
      setImages(images);
    } catch (error) {
      setError("Failed to load images.");
      console.error("Fetch images error:", error);
    }
  };

  useEffect(() => {
    handleFetchImages();
  }, []);

  return (
    <div className="container">
      <h2 className="styleh2">My Pictures</h2>
      <div className="photos-fit">
      {images.map((img, index) => (
          <div key={index}>
            <img src={img.url || img} alt="Uploaded content" />
          </div>
        ))}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default MyPics;
