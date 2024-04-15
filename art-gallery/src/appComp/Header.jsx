import React from 'react';
import { Link } from 'react-router-dom';

function Header({ darkMode, toggleTheme, searchQuery, setSearchQuery, handleSearch }) {
  return (
    <header>
      <div className="container">
        <div className="row justify-content-between align-items-center mb-3">
          <div className="col-12 col-md-3 text-md-start">
            <Link to="/" className="logo">DA</Link>
          </div>
          <div className="col-12 col-md-6">
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
            <button className="btn btn-success btn_space" type="button">Upload</button>
            <i className={`bi ${darkMode ? "bi-toggle-on" : "bi-toggle-off"}`}
              onClick={toggleTheme}
              style={{ cursor: "pointer", fontSize: "24px", color: darkMode ? "#fff" : "#000" }}></i>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <nav className="navigation flex-wrap justify-content-around">
              <Link to="/" className="btn btn-info">Home</Link>
              <Link to="/Favorites" className="btn btn-info">Favorites</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
