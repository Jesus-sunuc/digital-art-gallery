import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import unsplashService from "./service/service.jsx";
import Favorites from "./assets/pages/Favorites";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState([]); // Moved here

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  const handleSearch = async () => {
    setIsLoading(true);
    const results = await unsplashService.searchPhotos(searchQuery);
    setPhotos(results);
    setIsLoading(false);
  };

  // Moved from MainContent
  const handleToggleFavorite = (photo) => {
    if (favorites.find((f) => f.id === photo.id)) {
      setFavorites(favorites.filter((f) => f.id !== photo.id)); // Remove from favorites
    } else {
      setFavorites([...favorites, photo]); // Add to favorites
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {isLoading && <div>Loading...</div>}
        <div
          className={`text-center ${
            darkMode ? "bg-dark text-white" : "bg-light text-dark"
          }`}
        >
          <header>
            <div className="container">
              <div className="row justify-content-between align-items-center mb-3">
                <div className="col-12 col-md-3 text-md-start">
                  <a href="#" className="logo">
                    DA
                  </a>
                </div>
                <div id="space" className="col-12 col-md-6">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    aria-label="Search"
                  />
                </div>
                <div className="col-12 col-md-3 text-md-end">
                  <button className="btn btn-success btn_space" type="button">
                    Upload
                  </button>
                  <i
                    className={`bi ${
                      darkMode ? "bi-toggle-on" : "bi-toggle-off"
                    }`}
                    onClick={toggleTheme}
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      color: darkMode ? "#fff" : "#000",
                    }}
                  ></i>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <nav className="navigation flex-wrap justify-content-around">
                    <Link to="/" className="btn btn-info">
                      Home
                    </Link>
                    <Link to="/Favorites" className="btn btn-info">
                      Favorites
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </header>
          <Routes>
            <Route
              path="/"
              element={
                <MainContent
                  photos={photos}
                  favorites={favorites}
                  handleToggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route
              path="/Favorites"
              element={<Favorites photos={favorites} />}
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function MainContent({ photos, favorites, handleToggleFavorite }) {
  const [droppedPhotos, setDroppedPhotos] = useState([]);

  const handleDragStart = (event, photo) => {
    const dragData = JSON.stringify(photo);
    event.dataTransfer.setData("photo", dragData);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary to allow the drop
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const photoData = event.dataTransfer.getData("photo");
    const photo = JSON.parse(photoData);
    setDroppedPhotos((prev) => [...prev, photo]); // Add the dropped photo to the state
  };

  return (
    <main>
      <div className="container">
        <section id="images">
          <div
            className="drop-zone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              height: "300px",
              width: "100%",
              backgroundColor: "#ddd",
              textAlign: "center",
              padding: "10px",
            }}
          >
            Drop here
            {droppedPhotos.map((photo, index) => (
              <img
                key={index}
                src={photo.urls.small}
                alt={photo.description}
                style={{ width: "100px", height: "100px", margin: "5px" }}
              />
            ))}
          </div>
          <div className="photos-fit">
            {photos.map((photo) => (
              <div key={photo.id}>
                <img
                  src={photo.urls.small}
                  alt={photo.description}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, photo)}
                />
                <button onClick={() => handleToggleFavorite(photo)}>
                  {favorites.find((f) => f.id === photo.id) ? (
                    <i class="iconsSize bi bi-plus-square-fill"></i>
                  ) : (
                    <i class="iconsSize bi bi-plus-square"></i>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container text-align-center padding-vertical-medium">
        <div className="row">
          <div className="col-12 col-md-4">
            <h5>About Us</h5>
            <p>
              Short description about the digital art gallery, its mission, or
              background.
            </p>
          </div>
          <div className="col-12 col-md-4">
            <h5>Contact</h5>
            <p>Email: contact@digitalart.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
          <div className="col-12 col-md-4">
            <h5>Follow Us</h5>
            <a href="#" className="footer-text-color margin-end-small">
              <i className="bi bi-twitter footer-text-color"></i>
            </a>
            <a href="#" className="footer-text-color margin-end-small">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="footer-text-color">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="margin-vertical-small">
              &copy; {new Date().getFullYear()} Digital Art Gallery. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
