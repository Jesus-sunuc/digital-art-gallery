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
              <div
                key={photo.id}
                style={{ position: "relative", margin: "10px" }}
              >
                <img
                  src={photo.urls.small}
                  alt={photo.description}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, photo)}
                  style={{ cursor: "grab", width: "100px", height: "100px" }}
                />
                <button
                  onClick={() => handleToggleFavorite(photo)}
                  style={{ position: "absolute", top: 0, right: 0 }}
                >
                  {favorites.find((f) => f.id === photo.id) ? (
                    <i
                      className="bi bi-heart-fill"
                      style={{ color: "red" }}
                    ></i>
                  ) : (
                    <i className="bi bi-heart" style={{ color: "grey" }}></i>
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
