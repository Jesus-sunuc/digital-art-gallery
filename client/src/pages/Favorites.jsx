import React from 'react';

function Favorites({ photos }) {
  return (
    <div className="container">
      <h2 className='favoriteh2'>Favorites</h2>
      <div className="photos-fit">
        {photos.map(photo => (
          <div key={photo.id}>
            <img src={photo.urls.small}
                 alt={photo.description || 'Photo'}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
