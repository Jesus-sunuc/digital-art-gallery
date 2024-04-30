import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FileUploadForm from "./fileUpload/FileUploadForm";

function Header({
  darkMode,
  toggleTheme,
  searchQuery,
  setSearchQuery,
  handleSearch,
}) {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <header>
      <div className="container">
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <div
          className="overlay"
          onClick={() => setMenuOpen(false)}
          style={{ display: isMenuOpen ? "block" : "none" }}
        ></div>
        <section id="first_half_header">
          <div className="row justify-content-between align-items-center mb-3">
            <div className="col-12 col-md-3 text-md-start">
              <Link to="/" className="logo">
                DA
              </Link>
            </div>
            {location.pathname === "/" && (
              <div className="col-12 col-md-6">
                <div className="search-container">
                  <input
                    className="search-input"
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    aria-label="Search"
                  />
                </div>
              </div>
            )}
            <div className="col-12 col-md-3 text-md-end">
              <FileUploadForm uploadUrl="http://localhost:5078/imageUpload" />
              <i
                className={`icon-space iconsSize bi ${
                  darkMode ? "bi-toggle-on" : "bi-toggle-off"
                }`}
                onClick={toggleTheme}
              ></i>
            </div>
          </div>
        </section>
        <section id="second-half_header">
          <div className={`off-canvas ${isMenuOpen ? "open" : " "}`}>
            <nav className="navigation flex-wrap justify-content-around">
              <Link to="/" className="btn-style" onClick={toggleMenu}>
                <i className="btn_space bi bi-house"></i>Home
              </Link>
              <Link to="/Favorites" className="btn-style" onClick={toggleMenu}>
                <i className="btn_space bi bi-heart"></i>Favorites
              </Link>
              <Link to="/MyPics" className="btn-style" onClick={toggleMenu}>
                <i className="btn_space bi bi-image"></i>My Pics
              </Link>
              <Link
                to="/Collections"
                className="btn-style"
                onClick={toggleMenu}
              >
                <i className="btn_space bi bi-collection"></i>Collections
              </Link>
              <Link to="/Contact" className="btn-style" onClick={toggleMenu}>
                <i className="btn_space bi bi-envelope-check"></i>Contact
              </Link>
            </nav>
          </div>
        </section>
      </div>
    </header>
  );
}

export default Header;
