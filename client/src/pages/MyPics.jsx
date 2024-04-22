import React, { useState, useEffect } from "react";
import fetchImages from "../service/imageService.jsx"

function MyPics() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const handleFetchImages = async () => {
    try {
      const images = await fetchImages();
      setImages(images);
    } catch (error) {
      setError("Failed to load images.");
    }
  };

  // UseEffect to call handleFetchImages when the component mounts
  useEffect(() => {
    handleFetchImages();
  }, []);

  return (
    <div className="container">
      <h2 className="favoriteh2">My Pictures</h2>
      <div className="photos-fit">
          {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt="Uploaded content" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPics;
