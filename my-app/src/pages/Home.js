// src/pages/Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (query.trim()) {
      navigate(`/sentiment?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4" style={{ color: 'var(--text-100)' }}>
          Discover What People Think About Your Favorite Brand
        </h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter a Brand / Product / Hashtag (e.g., iPhone 15 or #Tesla)"
              style={{
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto',
                backgroundColor: 'var(--text-100)',
                color: 'var(--bg-300)',
              }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <br />
 
        <button onClick={handleAnalyze} className="btn btn-gradient ">
          Analyze Sentiment
        </button>
      </div>
    </div>
  );
};

export default Home;
