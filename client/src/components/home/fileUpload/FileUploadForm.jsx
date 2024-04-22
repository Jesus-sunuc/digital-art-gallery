import React, { useState, useRef } from 'react';
import './FileUploadForm.css'; 

function FileUploadForm({ uploadUrl }) {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const fileInputRef = useRef(null);

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
          displayMessage("File uploaded successfully.", "success");
        } else {
          displayMessage(`File upload failed: ${response.status}`, "error");
        }
      } catch (error) {
        displayMessage(`Error uploading file: ${error.message}`, "error");
      }
    } else {
      displayMessage("No file selected for upload.", "warning");
    }
    event.target.value = ''; // Reset the file input
  };

  const displayMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000); // Remove the message after 3 seconds
  };

  return (
    <>
      <input
        id='fileUpload'
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="btn btn-success"
        onClick={() => fileInputRef.current.click()}
      >
        Upload File
      </button>
      {message && (
        <div className={`alert ${messageType}`}>
          {message}
        </div>
      )}
    </>
  );
}

export default FileUploadForm;
