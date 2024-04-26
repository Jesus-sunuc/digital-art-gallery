import React, { useState, useRef } from 'react';
import './FileUploadForm.css';

function FileUploadForm({ uploadUrl }) {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        displayMessage("Please upload an image file.", "warning");
        return;
      }

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
          const errorText = await response.text(); // Assuming the server sends back a plain text error message
          displayMessage(`File upload failed: ${response.status} - ${errorText}`, "error");
        }
      } catch (error) {
        displayMessage(`Error uploading file: ${error.message}`, "error");
      }
    } else {
      displayMessage("No file selected for upload.", "warning");
    }
    event.target.value = '';
  };

  const displayMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 2000); 
  };

  return (
    <>
      <input
        id="fileUpload"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="btn btn-success"
        onClick={() => fileInputRef.current.click()}
      >
        <i class="btn_space bi bi-cloud-arrow-up-fill"></i>
        Upload File
      </button>
      {message && (
        <div className={`alert alert-${messageType}`}>
          {message}
        </div>
      )}
    </>
  );
}

export default FileUploadForm;
