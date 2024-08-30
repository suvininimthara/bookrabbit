import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container">
        <div className="row ">
          <div className="col-md-4 mb-4">
            <h6>About the company</h6>
            <p>Welcome to Bookrabbit, your ultimate destination for discovering and purchasing the best books. Whether you're looking for your next great read or personalized recommendations, Bookrabbit has you covered.</p>

            <div className="input-group input-group-sm"> {/* Small input group */}
              <input type="email" className="form-control" placeholder="Enter Email Address" aria-label="Enter Email Address" />
              <button className="btn btn-teal btn-sm" type="button"> {/* Small button */}
                <i className="bi bi-envelope"></i>
              </button>
            </div>
          </div>
          <div className="col-md-1">
            </div>
          <div className="col-md-2 mb-4">
            <h6>Home</h6>
            <ul className="list-unstyled" >
              <li><a href="/" className="text-light">Profile</a></li>
              <li><a href="/" className="text-light">Book List</a></li>
              <li><a href="/" className="text-light">About</a></li>
              <li><a href="/" className="text-light">Wishlist</a></li>
            </ul>
          </div>
          <div className="col-md-2 mb-4">
            <h6>Product</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Update</a></li>
              <li><a href="/" className="text-light">Security</a></li>
              <li><a href="/" className="text-light">Beta test</a></li>
              <li><a href="/" className="text-light">Pricing product</a></li>
            </ul>
          </div>
          <div className="col-md-2 mb-4">
            <h6>Help and Solution</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Talk to support</a></li>
              <li><a href="/" className="text-light">Support docs</a></li>
              <li><a href="/" className="text-light">System status</a></li>
              <li><a href="/contact" className="text-light">Contact us</a></li>
            </ul>
          </div>
          
        </div>
        <hr className="bg-light" />
        <div className="d-flex justify-content-between">
          <p className="mb-0">© 2024 bookrabbit.com. All rights reserved.</p>
          <div>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
