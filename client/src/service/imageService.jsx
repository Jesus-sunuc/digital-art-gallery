const baseURL = "http://localhost:5078";

const fetchImages = async () => {
  try {
    const response = await fetch(`${baseURL}/listImages`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const imageList = await response.json();
    return imageList.map((image) => `${baseURL}/uploads/${image}`);
  } catch (error) {
    console.error("Failed to fetch images:", error);
    throw error;
  }
};

export default fetchImages;
