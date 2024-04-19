import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import unsplashService from "./service/service.jsx";
import Header from "./components/home/Header.jsx";
import MainContent from "./components/home/MainContent.jsx";
import Footer from "./components/home/Footer.jsx";
import Favorites from "./pages/Favorites.jsx";
import LoadingSpinner from "./components/spinner/LoadingSpinner.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState([]);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  const handleSearch = async () => {
    setIsLoading(true);
    const results = await unsplashService.searchPhotos(searchQuery);
    setPhotos(results);
    setIsLoading(false);
  };

  const handleToggleFavorite = (photo) => {
    if (favorites.find((f) => f.id === photo.id)) {
      setFavorites(favorites.filter((f) => f.id !== photo.id));
    } else {
      setFavorites([...favorites, photo]);
    }
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
            { isLoading && <LoadingSpinner />}
          <Routes>
            <Route path="/" element={<MainContent photos={photos} favorites={favorites} handleToggleFavorite={handleToggleFavorite} />} />
            <Route path="/Favorites" element={<Favorites photos={favorites} />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
