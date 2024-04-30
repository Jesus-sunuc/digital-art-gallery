import React, { useState, useEffect, useRef } from "react";
import "../components/collections/collections.scss";
import CollectionFormModal2 from "../components/collections/FormModalCol.jsx";

function Collections({ collections, setCollections, addCollection }) {
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [draggedId, setDraggedId] = useState(null);
  const deleteRef = useRef(null);

  useEffect(() => {
    const selectedCollection = collections.find(
      (col) => col.id === selectedCollectionId
    );
    if (selectedCollection) {
      setSelectedPhotos(selectedCollection.photos);
    } else {
      setSelectedPhotos([]);
    }
  }, [selectedCollectionId, collections]);

  const handleDeletePhoto = (photoId) => {
    const updatedCollections = collections.map((collection) => {
      if (collection.id === selectedCollectionId) {
        return {
          ...collection,
          photos: collection.photos.filter((photo) => photo.id !== photoId),
        };
      }
      return collection;
    });
    setCollections(updatedCollections);
  };

  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
      if (deleteRef.current) {
        deleteRef.current.style.backgroundColor = "#998a8a";
      }
    };

    const handleDropToDelete = (event) => {
      event.preventDefault();
      if (draggedId !== null) {
        const updatedCollections = collections.filter(
          (col) => col.id !== draggedId
        );
        setCollections(updatedCollections);
        setDraggedId(null);
      }
      if (deleteRef.current) {
        deleteRef.current.style.backgroundColor = "";
      }
    };

    const deleteElement = deleteRef.current;
    if (deleteElement) {
      deleteElement.addEventListener("dragover", handleDragOver);
      deleteElement.addEventListener("drop", handleDropToDelete);
    }

    return () => {
      if (deleteElement) {
        deleteElement.removeEventListener("dragover", handleDragOver);
        deleteElement.removeEventListener("drop", handleDropToDelete);
      }
    };
  }, [draggedId, collections, setCollections]);

  const handleSelectCollection = (id) => {
    setSelectedCollectionId(id);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleDragStart = (id) => {
    setDraggedId(id);
  };
  return (
    <div className="collections-page container">
      <h2 className="styleh2">Collections</h2>
      <button onClick={openModal} className="new-collection-button">
        New Collection
      </button>
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
          <div ref={deleteRef} className="delete-icon">
            <i className="bi bi-trash-fill"></i>
            <br />
            <span>Drop here to delete</span>
          </div>
        </div>
      </div>
      {selectedPhotos.length > 0 && (
        <div className="photos-fit">
          {selectedPhotos.map((photo) => (
            <figure key={photo.id}>
              <img src={photo.urls.small} alt={photo.description || "Photo"} />
              <div className="text-left">
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="delete-button"
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </figure>
          ))}
        </div>
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
