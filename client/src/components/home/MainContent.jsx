import React, { useState } from 'react';
import CollectionFormModal from '../collections/FormModal.jsx';

function MainContent({ photos, favorites, collections, handleToggleFavorite, setCollections }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openCollectionModal = (photo) => {
    setSelectedPhoto(photo);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addPhotoToCollection = (collectionId, photo) => {
    const updatedCollections = collections.map(collection => {
      if (collection.id === collectionId) {
        return { ...collection, photos: [...collection.photos, photo] };
      }
      return collection;
    });
    setCollections(updatedCollections);
  };

  const isInCollection = (photo) => {
    return collections.some(collection => collection.photos.some(p => p.id === photo.id));
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
      <i className={isInCollection(photo) ? "icons-fit-active icons-fit bi bi-plus-circle-fill" : "icons-fit bi bi-plus-circle-fill"}></i>
    </button>
  </div>
))}

      </div>
      {showModal && (
        <CollectionFormModal
          addCollection={(name, description) => {
            const newCollection = {
              id: Date.now(),
              name,
              description,
              photos: [selectedPhoto]
            };
            collections.push(newCollection);
            closeModal();
          }}
          addPhotoToCollection={addPhotoToCollection}
          collections={collections}
          closeModal={closeModal}
          photo={selectedPhoto}
          setCollections={setCollections}
        />
      )}
    </main>
  );
}

export default MainContent;
