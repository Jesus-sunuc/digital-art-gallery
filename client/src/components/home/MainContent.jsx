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
    // Log incoming data to verify correctness
    console.log("Attempting to add photo to collection ID:", collectionId);
    console.log("Photo to add:", photo);

    setCollections(prevCollections => {
        const updatedCollections = prevCollections.map(collection => {
            if (collection.id === collectionId) {
                // Ensure new photo is not already in the collection
                if (!collection.photos.some(p => p.id === photo.id)) {
                    console.log("Adding new photo to collection:", collection.name);
                    return { ...collection, photos: [...collection.photos, photo] };
                } else {
                    console.log("Photo already exists in collection:", collection.name);
                    return collection;
                }
            }
            return collection;
        });

        // Log the updated collections to verify changes
        console.log("Updated collections after adding photo:", updatedCollections);
        return updatedCollections;
    });
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
           setCollections(prevCollections => [...prevCollections, newCollection]);
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
