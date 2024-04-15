import React, { useState } from 'react';

function Favorites({ photos }) {
  const [droppedPhotos, setDroppedPhotos] = useState([]);

  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary to allow the drop
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const photoData = event.dataTransfer.getData("photo");
    const photo = JSON.parse(photoData);
    setDroppedPhotos((prev) => [...prev, photo]); // Add the dropped photo to the state
  };

  return (
    <div className="container">
      <h2>Favorites</h2>
      <div className="drop-zone"
           onDragOver={handleDragOver}
           onDrop={handleDrop}
           style={{
             height: "300px",
             width: "100%",
             backgroundColor: "#ddd",
             textAlign: "center",
             padding: "10px",
             marginBottom: "20px"
           }}>
        Drop here
        {droppedPhotos.map((photo, index) => (
          <img key={index}
               src={photo.urls.small}
               alt={photo.description}
               style={{ width: "100px", height: "100px", margin: "5px" }} />
        ))}
      </div>
      <div className="photos-fit">
        {photos.map(photo => (
          <div key={photo.id}>
            <img src={photo.urls.small}
                 alt={photo.description}
                 draggable="true"
                 onDragStart={(e) => {
                   const dragData = JSON.stringify(photo);
                   e.dataTransfer.setData("photo", dragData);
                 }}
                 style={{ margin: "10px", cursor: "grab" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
