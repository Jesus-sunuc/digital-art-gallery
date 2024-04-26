import React, { useState, useEffect } from "react";
import fetchImages from "../service/imageService.jsx";

function MyPics({ onDelete1 }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const handleFetchImages = async () => {
    try {
      const images = await fetchImages();
      console.log("Fetched images:", images); // Log fetched images to verify their structure
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
      <h2 className="favoriteh2">My Pictures</h2>
      <div className="photos-fit">
      {images.map((img, index) => (
          <div key={index}>
            <img src={img.url || img} alt="Uploaded content" /> {/* Adjust depending on structure */}
            <div className="text-left">
              <button onClick={() => onDelete1(index)} className="delete-button">
              <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default MyPics;
