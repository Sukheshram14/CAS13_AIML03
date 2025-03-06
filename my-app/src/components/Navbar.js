// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'var(--bg-200)' }}>
      <div className="container">
        <Link className="navbar-brand font-roboto" to="/" style={{ color: 'var(--text-100)' }}>
          Sental
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{ 
            borderColor: 'var(--primary-100)',
            backgroundColor: 'var(--bg-300)'
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link font-roboto" to="/" style={{ 
                color: 'var(--text-100)',
                '&:hover': {
                  color: 'var(--primary-200)'
                }
              }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link font-roboto" to="/sentiment" style={{ 
                color: 'var(--text-100)',
                '&:hover': {
                  color: 'var(--primary-200)'
                }
              }}>Sentiment Analysis</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link font-roboto" to="/about" style={{ 
                color: 'var(--text-100)',
                '&:hover': {
                  color: 'var(--primary-200)'
                }
              }}>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link font-roboto" to="/contact" style={{ 
                color: 'var(--text-100)',
                '&:hover': {
                  color: 'var(--primary-200)'
                }
              }}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
