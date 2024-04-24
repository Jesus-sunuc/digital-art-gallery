import React, { useState } from 'react';
import CollectionFormModal from '../components/collections/FormModal2.jsx';
import '../components/collections/collections.css'

function Collections({ collections, addCollection }) {
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [showModal, setShowModal] = useState(false);  // State to control modal display

  const handleSelectCollection = (id) => {
    setSelectedCollectionId(id);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h2 className='favoriteh2'>Collections</h2>
      <button onClick={openModal} className="new-collection-button">New Collection</button>
      <div className="collection-list">
        {collections.map((collection) => (
          <button 
            key={collection.id} 
            onClick={() => handleSelectCollection(collection.id)}
            className="collection-name-button"
          >
            {collection.name}
          </button>
        ))}
      </div>
      {selectedCollectionId && (
        <div className="photos-fit">
          {collections.find(col => col.id === selectedCollectionId)?.photos.length > 0 ? (
            collections.find(col => col.id === selectedCollectionId).photos.map((photo, photoIndex) => (
              <img 
                key={photo.id || photoIndex} 
                src={photo.urls?.small || photo.url || "./assets/img/logo.png"}
                alt={photo.description || 'No description available'}
              />
            ))
          ) : (
            <p>No photos in this collection.</p>
          )}
        </div>
      )}
      {showModal && (
        <CollectionFormModal 
          addCollection={addCollection}
          closeModal={closeModal}
          collections={collections}
        />
      )}
    </div>
  );
}

export default Collections;
