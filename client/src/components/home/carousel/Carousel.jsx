import React, { useState, useEffect } from "react";
import photo1 from "../../../assets/img/carousel1.jpg";
import photo2 from "../../../assets/img/carousel2.jpg";
import photo3 from "../../../assets/img/carousel3.jpg";

function PhotoCarousel() {
  const photos = [photo1, photo2, photo3];
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const nextPhoto = () => {
    setCurrent((current) => (current + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrent((current) => (current - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovering) {
        nextPhoto();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovering]);

  return (
    <div
      className="photo-carousel"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button className="prev" onClick={prevPhoto}>
        <i className="bi bi-caret-left"></i>
      </button>
      <img src={photos[current]} alt={`Slide ${current + 1}`} />
      <button className="next" onClick={nextPhoto}>
        <i className="bi bi-caret-right"></i>
      </button>
    </div>
  );
}

export default PhotoCarousel;
