// import React, { useState } from 'react';
// import '../collections/FormModal.css'; 

// function CollectionFormModal({ addCollection, closeModal }) {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!name.trim()) {
//       alert('Please enter a valid collection name.');
//       return;
//     }
//     addCollection(name, description);
//     setName('');
//     setDescription('');
//     closeModal(); 
//   };

//   return (
//     <div className="modal-background" onClick={closeModal}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <form onSubmit={handleSubmit}>
//           <h3>Add New Collection</h3>
//           <label>Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//           <label>Description:</label>
//           <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
//           <div className="modal-buttons">
//             <button type="submit" className="modal-button submit">Add Collection</button>
//             <button type="button" className="modal-button cancel" onClick={closeModal}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CollectionFormModal;

import React, { useState, useEffect } from 'react';
import '../collections/FormModal.css'; 

function CollectionFormModal({ addCollection, addPhotoToCollection, collections, closeModal, photo }) {
  const [isNewCollection, setIsNewCollection] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Reset form when opening modal
    setIsNewCollection(true);
    setName('');
    setDescription('');
    setSelectedCollectionId('');
    setError('');
  }, [photo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isNewCollection) {
      if (!name.trim()) {
        setError('Please enter a valid collection name.');
        return;
      }
      addCollection(name, description, photo);
    } else {
      if (!selectedCollectionId) {
        setError('Please select a collection.');
        return;
      }
      addPhotoToCollection(selectedCollectionId, photo);
    }
    setName('');
    setDescription('');
    setSelectedCollectionId('');
    setError('');
    closeModal();
  };
  

  const handleModalClick = (e) => {
    e.stopPropagation();  // Prevents the modal from closing when clicking inside
  }

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-content" onClick={handleModalClick}>
        <form onSubmit={handleSubmit}>
          <h3>{isNewCollection ? "Add New Collection" : "Add to Existing Collection"}</h3>

          <div>
            <label>
              <input type="radio" checked={isNewCollection} onChange={() => setIsNewCollection(true)} />
              New Collection
            </label>
            <label>
              <input type="radio" checked={!isNewCollection} onChange={() => setIsNewCollection(false)} />
              Existing Collection
            </label>
          </div>

          {isNewCollection ? (
            <>
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              <label>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </>
          ) : (
            <select value={selectedCollectionId} onChange={(e) => setSelectedCollectionId(e.target.value)} required>
              <option value="">Select a collection</option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
          )}

          {error && <p className="error-message">{error}</p>}

          <div className="modal-buttons">
            <button type="submit" className="modal-button submit">{isNewCollection ? "Add Collection" : "Add Photo"}</button>
            <button type="button" className="modal-button cancel" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CollectionFormModal;
