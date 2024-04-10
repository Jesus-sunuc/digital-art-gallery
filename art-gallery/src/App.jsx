import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

  return (
    <BrowserRouter>
      <>
        <header>
          <div class="container text-center">
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
                  aria-label="Search"
                />
              </div>
              <div class="col-12 col-md-3 text-md-end">
                <button class="btn btn-success" type="button">
                  Upload
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <ul class="navigation d-none d-md-flex flex-wrap justify-content-around">
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
        <footer className="bg-dark text-white mt-4">
          <div className="container text-center py-3">
            <div className="row">
              <div className="col-12 col-md-4">
                <h5>About Us</h5>
                <p>
                  Short description about the digital art gallery, its mission,
                  or background.
                </p>
              </div>
              <div className="col-12 col-md-4">
                <h5>Contact</h5>
                <p>Email: contact@digitalart.com</p>
                <p>Phone: +123 456 7890</p>
              </div>
              <div className="col-12 col-md-4">
                <h5>Follow Us</h5>
                <a href="#" className="text-white me-2">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-white me-2">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p className="my-2">
                  &copy; {new Date().getFullYear()} Digital Art Gallery. All
                  rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </>
    </BrowserRouter>
  );
}

export default App;
