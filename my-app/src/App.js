// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles/global.css";

const App = () => {
  return (
    <Router>
      <div style={{ 
        backgroundColor: 'var(--bg-100)',
        minHeight: '100vh',
        position: 'relative'
      }}>
        <Navbar />
        <div style={{ 
          paddingBottom: '160px'
        }}>
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sentiment" element={<SentimentAnalysis />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
