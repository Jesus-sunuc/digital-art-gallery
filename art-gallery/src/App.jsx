import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import unsplashService from "./service/service.jsx";
import "./App.css";

import Nature from "./assets/pages/Nature";
import Abstract from "./assets/pages/Abstract";
import Animals from "./assets/pages/Animals";
import Cultural from "./assets/pages/Cultural";
import Fantasy from "./assets/pages/Fantasy";
import Historical from "./assets/pages/Historical";
import Marine from "./assets/pages/Marine";
import Space from "./assets/pages/Space";
import Tech from "./assets/pages/Tech";
import Urban from "./assets/pages/Urban";

function App() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [droppedPhotos, setDroppedPhotos] = useState([]);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  const handleSearch = async () => {
    const results = await unsplashService.searchPhotos(searchQuery);
    setPhotos(results);
  };

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
    <BrowserRouter>
      <>
        <div
          className={`text-center ${
            darkMode ? "bg-dark text-white " : "bg-light text-dark"
          }`}
        >
          <header>
            <div class="container">
              <div class="row justify-content-between align-items-center mb-3">
                <div class="col-12 col-md-3 text-md-start">
                  <a href="#" class="logo">
                    DA
                  </a>
                </div>
                <div id="space" class="col-12 col-md-6">
                  <input
                    class="form-control"
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    aria-label="Search"
                  />
                </div>
                <div class="col-12 col-md-3 text-md-end">
                  <button class="btn btn-success btn_space" type="button">
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
              <div class="row">
                <div class="col-12">
                  <ul class="navigation flex-wrap justify-content-around">
                    <li>
                      <Link to="/nature">Nature</Link>
                    </li>
                    <li>
                      <Link to="/animals">Animals</Link>
                    </li>
                    <li>
                      <Link to="/space">Space</Link>
                    </li>
                    <li>
                      <Link to="/abstract">Abstract</Link>
                    </li>
                    <li>
                      <Link to="/urban">Urban</Link>
                    </li>
                    <li>
                      <Link to="/fantasy">Fantasy</Link>
                    </li>
                    <li>
                      <Link to="/cultural">Cultural</Link>
                    </li>
                    <li>
                      <Link to="/historical">Historical</Link>
                    </li>
                    <li>
                      <Link to="/marine">Marine</Link>
                    </li>
                    <li>
                      <Link to="/tech">Technology</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="container">
              <Routes>
                <Route path="/nature" element={<Nature />} />
                <Route path="/abstract" element={<Abstract />} />
                <Route path="/animals" element={<Animals />} />
                <Route path="/cultural" element={<Cultural />} />
                <Route path="/fantasy" element={<Fantasy />} />
                <Route path="/historical" element={<Historical />} />
                <Route path="/marine" element={<Marine />} />
                <Route path="/space" element={<Space />} />
                <Route path="/tech" element={<Tech />} />
                <Route path="/urban" element={<Urban />} />
              </Routes>
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
                    <img
                      key={photo.id}
                      src={photo.urls.small}
                      alt={photo.description}
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, photo)}
                      style={{ margin: "10px", cursor: "grab" }}
                    />
                  ))}
                </div>
              </section>
            </div>
          </main>
          <footer>
            <div class="container text-align-center padding-vertical-medium">
              <div class="row">
                <div class="col-12 col-md-4">
                  <h5>About Us</h5>
                  <p>
                    Short description about the digital art gallery, its
                    mission, or background.
                  </p>
                </div>
                <div class="col-12 col-md-4">
                  <h5>Contact</h5>
                  <p>Email: contact@digitalart.com</p>
                  <p>Phone: +123 456 7890</p>
                </div>
                <div class="col-12 col-md-4">
                  <h5>Follow Us</h5>
                  <a href="#" class="footer-text-color margin-end-small">
                    <i class="bi bi-twitter-x footer-text-color"></i>
                  </a>
                  <a href="#" class="footer-text-color margin-end-small">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a href="#" class="footer-text-color">
                    <i class="bi bi-instagram"></i>
                  </a>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p class="margin-vertical-small">
                    &copy; {new Date().getFullYear()} Digital Art Gallery. All
                    rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
