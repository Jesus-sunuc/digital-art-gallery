import React from "react";

function MainContent({ photos, favorites, handleToggleFavorite }) {
  const handleDragStart = (event, photo) => {
    const dragData = JSON.stringify(photo);
    event.dataTransfer.setData("photo", dragData);
  };

  return (
    <main>
      <div className="container">
        <section id="images">
          <div className="photos-fit">
            {photos.map((photo) => (
              <div className="photos-fit-icon" key={photo.id}>
                <img
                  src={photo.urls.small}
                  alt={photo.description}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, photo)}
                />
                <button className="button-fit"
                  onClick={() => handleToggleFavorite(photo)}
                >
                  {favorites.find((f) => f.id === photo.id) ? (
                    <i class="icons-fit bi bi-plus-circle-fill"></i>
                  ) : (
                    <i class="icons-fit bi bi-plus-circle"></i>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default MainContent;
