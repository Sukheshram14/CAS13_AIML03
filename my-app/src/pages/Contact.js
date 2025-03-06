// src/pages/Contact.js
import React from "react";

const Contact = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Your message"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn"
              style={{
                backgroundColor: 'var(--primary-100)',
                color: 'var(--text-100)'
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div className="mt-3">
        <p>Follow us on social media:</p>
        <p>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a> | 
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
