import React, { useState, useEffect } from 'react';
import '../components/collections/collections.css';
import CollectionFormModal2 from '../components/collections/FormModalCol.jsx';


function Collections({ collections, addCollection }) {
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("Collections updated:", collections);
  }, [collections]);
  

  useEffect(() => {
    const selectedCollection = collections.find(col => col.id === selectedCollectionId);
    if (selectedCollection) {
      setSelectedPhotos(selectedCollection.photos);
    }
  }, [selectedCollectionId, collections]);  // Depend on collections to update photos

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
      {selectedPhotos.length > 0 ? (
        <div className="photos-fit">
          {selectedPhotos.map((photo, photoIndex) => (
            <img 
              key={photo.id || photoIndex} 
              src={photo.urls?.small || photo.url || "./assets/img/logo.png"}
              alt={photo.description || 'No description available'}
            />
          ))}
        </div>
      ) : (
        <p>No photos in this collection.</p>
      )}
      {showModal && (
        <CollectionFormModal2 
          addCollection={addCollection}
          closeModal={closeModal}
          collections={collections}
        />
      )}
    </div>
  );
}

export default Collections;
