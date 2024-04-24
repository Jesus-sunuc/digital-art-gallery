// import React, { useState } from 'react';

// function Collections({ collections, addCollection }) {
//   const [collectionName, setCollectionName] = useState('');

//   const handleAddCollection = () => {
//     if (!collectionName) return;
//     addCollection({ name: collectionName, photos: [] });
//     setCollectionName('');
//   };

//   return (
//     <div className="collections">
//       <h1>Collections</h1>
//       <input 
//         type="text" 
//         value={collectionName} 
//         onChange={(e) => setCollectionName(e.target.value)} 
//         placeholder="New Collection Name" 
//       />
//       <button onClick={handleAddCollection}>Create Collection</button>
//       {collections.map((collection, index) => (
//         <div key={index}>
//           <a>{collection.name}</a>
//           <div>
//             {collection.photos.length > 0 ? (
//               collection.photos.map(photo => <img key={photo.id} src={photo.url} alt={photo.title} />)
//             ) : (
//               <p>No photos in this collection.</p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Collections;
import React, { useState } from 'react';

function Collections({ collections, addCollection }) {
  const [collectionName, setCollectionName] = useState('');

  const handleAddCollection = () => {
    if (!collectionName) return;
    addCollection({ name: collectionName, photos: [] });
    setCollectionName('');
  };

  return (
    <div className="collections">
      <h1>Collections</h1>
      <input 
        type="text" 
        value={collectionName} 
        onChange={(e) => setCollectionName(e.target.value)} 
        placeholder="New Collection Name" 
      />
      <button onClick={handleAddCollection}>Create Collection</button>
      {collections.map((collection, index) => (
        <div key={index}>
          <a>{collection.name}</a>
          <div>
            {collection.photos.length > 0 ? (
              collection.photos.map(photo => <img key={photo.id} src={photo.urls?.small || photo.url} alt={photo.description || photo.title} />)
            ) : (
              <p>No photos in this collection.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Collections;
