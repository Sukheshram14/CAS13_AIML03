// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--bg-200)',
      color: 'var(--text-100)',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      zIndex: 1000,
      borderTop: '1px solid var(--bg-300)'
    }} className="py-3">
      <div className="container text-center">
        <p className="mb-2">© 2025 Sental</p>
        <p className="mb-2">
          <a href="/terms" style={{ 
            color: 'var(--primary-100)',
            textDecoration: 'none',
            marginRight: '1rem'
          }}>Terms</a> | 
          <a href="/privacy" style={{ 
            color: 'var(--primary-100)',
            textDecoration: 'none',
            marginLeft: '1rem'
          }}>Privacy Policy</a>
        </p>
        <p style={{ color: 'var(--text-200)' }} className="mb-0">Developed by Dare Pirates </p>
      </div>
    </footer>
  );
};

export default Footer;
