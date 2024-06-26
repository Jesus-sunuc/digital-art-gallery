import React, { useState, useEffect } from "react";
import "../collections/FormModal.scss";

function CollectionFormModal2({ addCollection, closeModal, photo }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setName("");
    setError("");
  }, [photo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Please enter a valid collection name");
      return;
    }
    addCollection(name, photo);
    setName("");
    setError("");
    closeModal();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-content" onClick={handleModalClick}>
        <form onSubmit={handleSubmit}>
          <h3>Add New Collection</h3>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}

          <div className="modal-buttons">
            <button type="submit" className="modal-button submit">
              Add Collection
            </button>
            <button
              type="button"
              className="modal-button cancel"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CollectionFormModal2;
