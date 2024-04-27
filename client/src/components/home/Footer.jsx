import React from "react";

function Footer() {
  return (
    <footer>
      <div className="container padding-vertical-medium">
        <div className="row">
          <div className="col-12 col-md-4">
            <h5>About Us</h5>
            <p>Short description about the digital art gallery, its mission, or background.</p>
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

export default Footer;
