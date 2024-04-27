import React, { useState, useEffect } from 'react';
import '../components/collections/collections.css';
import CollectionFormModal2 from '../components/collections/FormModalCol.jsx';

function Collections({ collections, setCollections, addCollection }) {
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [draggedId, setDraggedId] = useState(null);

  useEffect(() => {
    const selectedCollection = collections.find(col => col.id === selectedCollectionId);
    if (selectedCollection) {
      setSelectedPhotos(selectedCollection.photos);
    }
  }, [selectedCollectionId, collections]);

  const handleSelectCollection = (id) => {
    setSelectedCollectionId(id);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDragStart = (id) => {
    setDraggedId(id);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  const handleDropToDelete = (event) => {
    event.preventDefault();
    // Perform the delete action only if an item is being dragged
    if (draggedId !== null) {
      // Check if the deleted collection is currently selected
      if (selectedCollectionId === draggedId) {
        // Reset the selected photos since the current collection is being deleted
        setSelectedPhotos([]);
        // Also reset the selected collection ID
        setSelectedCollectionId(null);
      }
      // Filter out the collection that needs to be deleted
      const updatedCollections = collections.filter(col => col.id !== draggedId);
      setCollections(updatedCollections); // Update the state with the new collection list
      setDraggedId(null); // Reset the dragged item
    }
  };
  
  // Define a ref for the delete area
  const deleteRef = React.createRef();

  // Highlight the delete area when dragging over it
  const handleDragEnter = () => {
    if(deleteRef.current) {
      deleteRef.current.style.backgroundColor = 'red'; // or any highlight color
    }
  };

  // Remove highlight from delete area when dragging leaves it
  const handleDragLeave = () => {
    if(deleteRef.current) {
      deleteRef.current.style.backgroundColor = ''; // reset to original color
    }
  };

  return (
    <div className="collections-page container">
      <h2 className='styleh2'>Collections</h2>
      <button onClick={openModal} className="new-collection-button">New Collection</button>
      <div className="control-area">
        <div className="collection-list">
          {collections.map((collection) => (
            <div 
              key={collection.id}
              draggable
              onClick={() => handleSelectCollection(collection.id)}
              onDragStart={() => handleDragStart(collection.id)}
              className="collection-name-button"
            >
              {collection.name}
            </div>
          ))}
        </div>
        <div className="button-group">
          <div className="delete-icon"
               onDragOver={handleDragOver}
               onDrop={handleDropToDelete}
               onDragEnter={handleDragEnter}
               onDragLeave={handleDragLeave}>
            <i className="bi bi-trash-fill"></i>
          </div>
        </div>
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
  
