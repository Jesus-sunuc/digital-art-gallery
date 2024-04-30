import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import unsplashService from "./service/externalAPIService.jsx";
import Header from "./components/home/Header.jsx";
import MainContent from "./components/home/MainContent.jsx";
import Footer from "./components/home/Footer.jsx";
import Favorites from "./pages/Favorites.jsx";
import MyPics from "./pages/MyPics.jsx";
import Contact from "./pages/Contact.jsx";
import Collections from "./pages/Collections.jsx";
import LoadingSpinner from "./components/spinner/LoadingSpinner.jsx";
import CollectionFormModal from "./components/collections/FormModalHome.jsx";
import ThemeManager from "./components/themeManager/ThemeManager.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.scss";

const queryClient = new QueryClient();

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [collections, setCollections] = useState([]);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [selectedPhotoForCollection, setSelectedPhotoForCollection] =
    useState(null);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

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
    const exists = favorites.some((f) => f.id === photo.id);
    setFavorites(
      exists
        ? favorites.filter((f) => f.id !== photo.id)
        : [...favorites, photo]
    );
  };

  const handleAddToCollection = (name) => {
    if (!name) return;
    const newCollection = {
      id: Date.now(),
      name,
      photos: [selectedPhotoForCollection],
    };
    setCollections((colls) => [...colls, newCollection]);
    setShowCollectionModal(false);
  };

  const addCollection = (name) => {
    const newCollection = {
      id: Date.now(),
      name: name,
      photos: [],
    };
    setCollections([...collections, newCollection]);
  };

  const deleteFav = (photoId) => {
    const newFavorites = favorites.filter((photo) => photo.id !== photoId);
    setFavorites(newFavorites);
  };

  const deleteMyPics = (index) => {
    setImages((currentImages) =>
      currentImages.filter((_, idx) => idx !== index)
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeManager setDarkMode={setDarkMode} />
        <div
          className={`text-center ${
            darkMode ? "bg-dark text-white" : "bg-light text-dark"
          }`}
        >
          <Header
            darkMode={darkMode}
            toggleTheme={toggleTheme}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
          <Routes>
            <Route
              path="/"
              element={
                <MainContent
                  photos={photos}
                  favorites={favorites}
                  collections={collections}
                  handleToggleFavorite={handleToggleFavorite}
                  setCollections={setCollections}
                />
              }
            />
            <Route
              path="/Favorites"
              element={<Favorites photos={favorites} onDelete={deleteFav} />}
            />
            <Route
              path="/MyPics"
              element={<MyPics onDelete1={deleteMyPics} />}
            />
            <Route
              path="/Collections"
              element={
                <Collections
                  collections={collections}
                  addCollection={addCollection}
                  setCollections={setCollections}
                />
              }
            />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
          {isLoading && <LoadingSpinner />}
          {showCollectionModal && (
            <CollectionFormModal
              addCollection={handleAddToCollection}
              closeModal={() => setShowCollectionModal(false)}
            />
          )}
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
