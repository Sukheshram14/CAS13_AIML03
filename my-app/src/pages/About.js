// src/pages/About.js
import React from "react";

const About = () => {
  return (
    <div className="container modern-page mt-5">
      <h2 className="font-roboto">About BrandSentiment AI</h2>
      <p>
        Our AI analyzes sentiment using state-of-the-art machine learning models like BERT and VADER.
        We fetch data from Twitter via the Twitter API, and you can also upload your own dataset if needed.
      </p>
      <p>
        Data Sources: Twitter API, and optionally user-supplied CSV files.
      </p>
    </div>
  );
};

export default About;
