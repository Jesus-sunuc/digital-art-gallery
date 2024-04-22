// Services for handling API requests
const baseURL = 'http://localhost:5078'; // Base URL for API

// Function to fetch list of images
const fetchImages = async () => {
  try {
    const response = await fetch(`${baseURL}/listImages`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const imageList = await response.json();
    return imageList.map(image => `${baseURL}/uploads/${image}`);
  } catch (error) {
    console.error("Failed to fetch images:", error);
    throw error; // Re-throwing the error to be handled by the component
  }
};

export default fetchImages;
