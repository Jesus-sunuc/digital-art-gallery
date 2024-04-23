import React, { useState } from 'react';
import '../collections/FormModal.css'; 

function CollectionFormModal({ addCollection, closeModal }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) {
      alert('Please enter a valid collection name.');
      return;
    }
    addCollection(name, description);
    setName('');
    setDescription('');
    closeModal(); // Close the modal after submitting the form
  };

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}> {/* Prevent modal from closing when clicking inside */}
        <form onSubmit={handleSubmit}>
          <h3>Add New Collection</h3>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="modal-buttons">
            <button type="submit" className="modal-button submit">Add Collection</button>
            <button type="button" className="modal-button cancel" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CollectionFormModal;
