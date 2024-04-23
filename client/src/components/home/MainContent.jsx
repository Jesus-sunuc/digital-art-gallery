import React, { useState } from 'react';
import CollectionFormModal from '../collections/FormModal.jsx'; // Ensure this path matches your project structure

function MainContent({ photos, favorites, collections, handleToggleFavorite }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Opens the modal for adding to collection with the selected photo
  const openCollectionModal = (photo) => {
    setSelectedPhoto(photo);
    setShowModal(true);
  };

  // Closes the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main className="container">
      <h2 className='favoriteh2'>Home</h2>
      <div className="photos-fit">
        {photos.map((photo) => (
          <div className="photos-fit-icon" key={photo.id}>
            <img src={photo.urls.small} alt={photo.description} />
            <button className="button-fit-icon-fav" onClick={() => handleToggleFavorite(photo)}>
              <i className={favorites.some(f => f.id === photo.id) ? "icons-fit-active icons-fit bi bi-heart-fill" : "icons-fit bi bi-heart-fill"}></i>
            </button>
            <button className="photos-fit-icon-add" onClick={() => openCollectionModal(photo)}>
              <i className="icons-fit bi bi-plus-circle-fill"></i>
            </button>
          </div>
        ))}
      </div>
      {showModal && (
        <CollectionFormModal
          addCollection={(name, description) => {
            // Implement adding to collections here or in the modal
            const newCollection = {
              id: Date.now(),
              name,
              description,
              photos: [selectedPhoto]
            };
            collections.push(newCollection);
            closeModal();
          }}
          closeModal={closeModal}
          photo={selectedPhoto}
        />
      )}
    </main>
  );
}

export default MainContent;
