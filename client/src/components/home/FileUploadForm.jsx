import React, { useState, useRef } from 'react';

function FileUploadForm({ uploadUrl }) {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  // Function to handle the file upload immediately upon file selection
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("uploadedImage", file);

      try {
        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData
        });

        if (response.ok) {
          displayMessage("File uploaded successfully.");
        } else {
          displayMessage(`File upload failed: ${response.status}`);
        }
      } catch (error) {
        displayMessage(`Error uploading file: ${error.message}`);
      }
    } else {
      displayMessage("No file selected for upload.");
    }
    event.target.value = ''; // Reset the file input
  };

  // Function to display a message for 3 seconds
  const displayMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 3000); // Remove the message after 3 seconds
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the file input
      />
      <button
        type="button"
        className="btn btn-success"
        onClick={() => fileInputRef.current.click()}
      >
        Upload File
      </button>
      {message && <div style={{ color: 'green', marginTop: '10px' }}>{message}</div>}
    </div>
  );
}

export default FileUploadForm;
