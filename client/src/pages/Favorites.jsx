import React from "react";
import "../components/favorites/favorites.scss";

function Favorites({ photos, onDelete }) {
  return (
    <div className="container">
      <h2 className="styleh2">Favorites</h2>
      <div className="photos-fit">
        {photos.map((photo) => (
          <figure key={photo.id}>
            <img src={photo.urls.small} alt={photo.description || "Photo"} />
            <div className="text-left">
              <button
                onClick={() => onDelete(photo.id)}
                className="delete-button"
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
