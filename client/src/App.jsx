import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import unsplashService from "./service/externalAPIService.jsx";
import Header from "./components/home/Header.jsx";
import MainContent from "./components/home/MainContent.jsx";
import Footer from "./components/home/Footer.jsx";
import Favorites from "./pages/Favorites.jsx";
import MyPics from "./pages/MyPics.jsx";
import Collections from "./pages/Collections.jsx";
import LoadingSpinner from "./components/spinner/LoadingSpinner.jsx";
import CollectionFormModal from "./components/collections/FormModal.jsx"; // New component for the form
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [collections, setCollections] = useState([]);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [selectedPhotoForCollection, setSelectedPhotoForCollection] = useState(null);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await unsplashService.searchPhotos(searchQuery);
      setPhotos(results);
    } catch (error) {
      console.error("Search error:", error);
    }
    setIsLoading(false);
  };
  
  const handleToggleFavorite = (photo) => {
    const exists = favorites.some(f => f.id === photo.id);
    setFavorites(exists ? favorites.filter(f => f.id !== photo.id) : [...favorites, photo]);
  };

  const handleAddToCollection = (name, description) => {
    if (!name) return;
    const newCollection = {
      id: Date.now(),
      name,
      description,
      photos: [selectedPhotoForCollection]
    };
    setCollections(colls => [...colls, newCollection]);
    setShowCollectionModal(false);
  };
  

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className={`text-center ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
          <Header
            darkMode={darkMode}
            toggleTheme={toggleTheme}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
          {isLoading && <LoadingSpinner />}
          <Routes>
            <Route path="/" element={<MainContent photos={photos} favorites={favorites} collections={collections} handleToggleFavorite={handleToggleFavorite} setCollections={setCollections} />} />
            <Route path="/Favorites" element={<Favorites photos={favorites} />} />
            <Route path="/MyPics" element={<MyPics />} />
            <Route path="/Collections" element={<Collections collections={collections} addCollection={handleAddToCollection} />} />
          </Routes>
          {showCollectionModal && (
            <CollectionFormModal addCollection={handleAddToCollection} closeModal={() => setShowCollectionModal(false)} />
          )}
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;