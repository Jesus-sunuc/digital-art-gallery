import React from 'react';
import '../components/favorites/favorites.css';

function Favorites({ photos, onDelete }) {
  return (
    <div className="container">
      <h2 className='styleh2'>Favorites</h2>
      <div className="photos-fit">
        {photos.map(photo => (
          <div key={photo.id}>
            <img src={photo.urls.small} alt={photo.description || 'Photo'}/>
            <div className='text-left'>
              <button onClick={() => onDelete(photo.id)} className="delete-button">
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export default Favorites;
