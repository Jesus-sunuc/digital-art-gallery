import React, { useRef } from 'react';

function FileUploadForm({ uploadUrl }) {
  const fileInputRef = useRef(null);

  // Function to trigger the hidden file input when the button is clicked
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input before opening the dialog
      fileInputRef.current.click();
    }
  };

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
          console.log("File uploaded successfully.");
        } else {
          console.error("File upload failed:", response.status);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected for upload.");
    }
    // Reset the file input after processing to allow for new file selections
    event.target.value = '';
  };

  return (
    <>
      <input
        type="file"
        id="fileUpload"
        name="fileUpload"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
      />
      <button
        type="button"
        className="btn btn-success btn_space"
        onClick={handleButtonClick}
      ><i class="bi bi-cloud-arrow-up-fill iconsSize icon-space "></i>
        Upload File
      </button>
    </>
  );
}

export default FileUploadForm;
