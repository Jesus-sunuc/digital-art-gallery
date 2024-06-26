import React, { useState } from "react";
import CollectionFormModal from "../collections/FormModalHome.jsx";
import PhotoCarousel from "../home/carousel/Carousel.jsx";

function MainContent({
  photos,
  favorites,
  collections,
  handleToggleFavorite,
  setCollections,
}) {
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
    setCollections((prevCollections) => {
      const updatedCollections = prevCollections.map((collection) => {
        if (collection.id === collectionId) {
          if (!collection.photos.some((p) => p.id === photo.id)) {
            return { ...collection, photos: [...collection.photos, photo] };
          } else {
            return collection;
          }
        }
        return collection;
      });
      return updatedCollections;
    });
  };

  const isInCollection = (photo) => {
    return collections.some((collection) =>
      collection.photos.some((p) => p.id === photo.id)
    );
  };

  return (
    <main>
      <div>
        <div className="carousel-container">
          <h2 className="homeh2">Home</h2>
          <PhotoCarousel />
        </div>
        {showModal && <CollectionFormModal closeModal={closeModal} />}
      </div>
      <div className="container">
        <div className="photos-fit">
          {photos.map((photo) => (
            <figure>
              <div className="photos-fit-icon" key={photo.id}>
                <img src={photo.urls.small} alt={photo.description} />
                <button className="button-fit-icon-fav"
                  onClick={() => handleToggleFavorite(photo)}>
                  <i className={
                      favorites.some((f) => f.id === photo.id)
                        ? "icons-fit-active icons-fit bi bi-heart-fill"
                        : "icons-fit bi bi-heart-fill"}>
                  </i>
                </button>
                <button
                  className="photos-fit-icon-add"
                  onClick={() => openCollectionModal(photo)}>
                  <i className={
                      isInCollection(photo)
                        ? "icons-fit-active icons-fit bi bi-plus-circle-fill"
                        : "icons-fit bi bi-plus-circle-fill"}>
                  </i>
                </button>
              </div>
            </figure>
          ))}
        </div>
        {showModal && (
          <CollectionFormModal
            addCollection={(name, description) => {
              const newCollection = {
                id: Date.now(),
                name,
                description,
                photos: [selectedPhoto],
              };
              setCollections((prevCollections) => [
                ...prevCollections,
                newCollection,
              ]);
              closeModal();
            }}
            addPhotoToCollection={addPhotoToCollection}
            collections={collections}
            closeModal={closeModal}
            photo={selectedPhoto}
            setCollections={setCollections}
          />
        )}
      </div>
    </main>
  );
}

export default MainContent;
