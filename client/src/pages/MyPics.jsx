import React, { useState } from 'react';

function MyPics() {
    const [images, setImages] = useState([]);

    const handleFetchImages = async () => {
        try {
            const response = await fetch('http://localhost:5078/listImages'); // Adjust the URL/port as needed
            const imageList = await response.json();
            setImages(imageList.map(image => `http://localhost:5078/uploads/${image}`));
        } catch (error) {
            console.error('Failed to fetch images:', error);
        }
    };

    return (
        <div>
            <h1>My Pictures</h1>
            <button onClick={handleFetchImages}>Load Images</button>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {images.map((img, index) => (
                    <img key={index} src={img} alt="Uploaded content" style={{ width: '150px', height: '150px', margin: '10px' }} />
                ))}
            </div>
        </div>
    );
}

export default MyPics;
