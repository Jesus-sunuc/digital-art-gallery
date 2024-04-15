import React from 'react';

function Favorites({ photos }) {
  return (
    <div className="container">
      <h2>Favorites</h2>
      <div className="photos-fit">
        {photos.map(photo => (
          <img key={photo.id} src={photo.urls.small} alt={photo.description} style={{ margin: "10px" }} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
