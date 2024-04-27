import React, { useState, useEffect } from 'react';
import '../collections/FormModal.css'; 

function CollectionFormModal({ addCollection, addPhotoToCollection, collections, closeModal, photo }) {
  const [isNewCollection, setIsNewCollection] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setIsNewCollection(true);
    setName('');
    setDescription('');
    setSelectedCollectionId('');
    setError('');
    resetForm();
  }, [photo]);

  const resetForm = () => {
    setIsNewCollection(true);
    setName('');
    setDescription('');
    setSelectedCollectionId('');
    setError('');
  };

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
    resetForm(); // Call resetForm to reset state
    closeModal();
};

  const handleRadioChange = (event) => {
    setIsNewCollection(event.target.value === 'new');
  };

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h3>{isNewCollection ? "Add New Collection" : "Add to Existing Collection"}</h3>

          <div>
            <label className='someSpace'>
              <input
                type="radio"
                value="new"
                checked={isNewCollection}
                onChange={handleRadioChange}
              />
              New Collection
            </label>
            <label>
              <input
                type="radio"
                value="existing"
                checked={!isNewCollection}
                onChange={handleRadioChange}
              />
              Existing Collection
            </label>
          </div>

          {isNewCollection ? (
            <>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="modal-buttons">
                <button type="submit" className="modal-button submit">Add Collection</button>
                <button type="button" className="modal-button cancel" onClick={closeModal}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <label>Select a collection:</label>
              <select
                value={selectedCollectionId}
                onChange={(e) => setSelectedCollectionId(e.target.value)}
                required
              >
                <option value="">Select a collection</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
              <div className="modal-buttons">
                <button type="submit" className="modal-button submit">Add Photo</button>
                <button type="button" className="modal-button cancel" onClick={closeModal}>Cancel</button>
              </div>
            </>
          )}

          {error && <p className="error-message">{error}</p>}

        </form>
      </div>
    </div>
  );
}

export default CollectionFormModal;