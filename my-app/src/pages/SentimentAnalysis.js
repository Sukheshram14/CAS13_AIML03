// src/pages/SentimentAnalysis.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components.
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Define constant sentiment colors.
const POSITIVE_COLOR = "green";
const NEUTRAL_COLOR = "grey";
const NEGATIVE_COLOR = "red";

const SentimentAnalysis = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryParam = params.get("query") || "";
  const [query, setQuery] = useState(queryParam);
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle global dark/light mode classes on the document body.
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // Automatically trigger analysis if a query is provided in the URL.
  useEffect(() => {
    if (queryParam) {
      handleAnalyzeQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set your API base URL (update this with your current ngrok URL)
  const API_BASE_URL = "https://b675-34-91-148-106.ngrok-free.app";

  // Function to analyze sentiment using a query.
  const handleAnalyzeQuery = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    setResults(null);

    try {
      const response = await fetch(`${API_BASE_URL}/analyze_query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const responseText = await response.text();
      console.log("Raw API response for query:", responseText);
      const data = JSON.parse(responseText);
      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze sentiment.");
      }
      setResults(data.results);
    } catch (err) {
      console.error("Error in handleAnalyzeQuery:", err);
      setError("Error processing query: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to analyze sentiment using a CSV file.
  const handleAnalyzeFile = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a CSV file.");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${API_BASE_URL}/analyze_file`, {
        method: "POST",
        body: formData,
      });
      const responseText = await response.text();
      console.log("Raw API response for file:", responseText);
      const data = JSON.parse(responseText);
      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze file.");
      }
      setResults(data.results);
    } catch (err) {
      console.error("Error in handleAnalyzeFile:", err);
      setError("Error processing file: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate sentiment counts.
  const getSentimentCounts = () => {
    if (!results) return { positive: 0, neutral: 0, negative: 0 };
    const positive = results.filter((t) => t.Sentiment === "positive").length;
    const neutral = results.filter((t) => t.Sentiment === "neutral").length;
    const negative = results.filter((t) => t.Sentiment === "negative").length;
    return { positive, neutral, negative };
  };

  const sentimentCounts = getSentimentCounts();

  // Data for the Bar chart using constant sentiment colors.
  const getBarChartData = () => ({
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Tweet Count",
        data: [sentimentCounts.positive, sentimentCounts.neutral, sentimentCounts.negative],
        backgroundColor: [POSITIVE_COLOR, NEUTRAL_COLOR, NEGATIVE_COLOR],
      },
    ],
  });

  // Data for the Doughnut chart using constant sentiment colors.
  const getDoughnutChartData = () => ({
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [sentimentCounts.positive, sentimentCounts.neutral, sentimentCounts.negative],
        backgroundColor: [POSITIVE_COLOR, NEUTRAL_COLOR, NEGATIVE_COLOR],
      },
    ],
  });

  // Function to get tweet background color based on sentiment.
  const getTweetBackgroundColor = (sentiment) => {
    return sentiment === "positive"
      ? POSITIVE_COLOR
      : sentiment === "neutral"
      ? NEUTRAL_COLOR
      : NEGATIVE_COLOR;
  };

  // Chart options with constant sentiment colors.
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "white" : "black",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const chartType = context.chart.config.type;
            if (chartType && chartType.toLowerCase() === "bar") {
              const rawValue = context.parsed.y !== undefined ? context.parsed.y : context.parsed;
              return `${context.label}: ${rawValue}`;
            } else {
              const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
              const currentValue = context.parsed;
              const percentage = total ? ((currentValue / total) * 100).toFixed(1) : 0;
              return `${context.label}: ${percentage}% (${currentValue})`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "white" : "black",
        },
      },
      y: {
        ticks: {
          color: darkMode ? "white" : "black",
        },
      },
    },
  };

  return (
    <div
      className={`container modern-page mt-4 ${darkMode ? "dark-mode" : "light-mode"}`}
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="font-roboto">Sentiment Analysis</h2>
        <button onClick={() => setDarkMode(!darkMode)} className="btn btn-sm btn-outline-modern">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Query-based Analysis Card */}
      <div className="card modern-card mb-4">
        <div className="card-body">
          <form onSubmit={handleAnalyzeQuery}>
            <div className="mb-3">
              <label htmlFor="query" className="form-label font-roboto">
                Brand / Product / Hashtag
              </label>
              <input
                type="text"
                id="query"
                className="form-control shadow-modern"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., iPhone 15 or #Tesla"
              />
            </div>
            <button type="submit" className="btn btn-gradient">
              Analyze Query
            </button>
          </form>
        </div>
      </div>

      {/* File-based Analysis Card */}
      <div className="card modern-card mb-4">
        <div className="card-body">
          <form onSubmit={handleAnalyzeFile}>
            <div className="mb-3">
              <label htmlFor="file" className="form-label font-roboto">
                Upload CSV File
              </label>
              <input
                type="file"
                id="file"
                className="form-control shadow-modern"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-gradient">
              Analyze File
            </button>
          </form>
        </div>
      </div>

      {loading && <p className="font-roboto">Loading...</p>}
      {error && <p className="text-danger mt-2 font-roboto">{error}</p>}

      {results && (
        <>
          {/* Brand Overview Card
          <div className="card modern-card mb-4">
            <div className="card-body" style={{ color: "black" }}>
              <h3 className="font-roboto">Brand Overview</h3>
              <div className="d-flex align-items-center">
                <img src="https://via.placeholder.com/50" alt="Brand Logo" className="me-3" />
                <div>
                  <h4 className="font-roboto">{query}</h4>
                  <p className="font-roboto">Short description about {query} goes here.</p>
                  <p className="font-roboto">
                    Sentiment Summary:{" "}
                    {sentimentCounts.positive > sentimentCounts.negative ? "😊" : "😐"}
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Charts Row: Bar Chart on Left, Doughnut Chart on Right */}
          <div className="row">
            {/* Bar Chart Card */}
            <div className="col-md-6 mb-4">
              <div className="card modern-card">
                <div className="card-body">
                  <h3 className="font-roboto">Sentiment Count (Bar Chart)</h3>
                  <div className="chart-container">
                    <Bar data={getBarChartData()} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
            {/* Doughnut Chart Card */}
            <div className="col-md-6 mb-4">
              <div className="card modern-card">
                <div className="card-body">
                  <h3 className="font-roboto">Sentiment Breakdown (Doughnut Chart)</h3>
                  <div className="chart-container">
                    <Doughnut data={getDoughnutChartData()} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Tweet Feed Card */}
          <div className="card modern-card mb-4">
            <div className="card-body">
              <h3 className="font-roboto" style={{ color: "black" }}>Live Tweet Feed</h3>
              <div className="tweet-feed" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {results.map((tweet, index) => (
                  <div
                    key={index}
                    className="tweet-item p-3 my-3 rounded modern-shadow"
                    style={{ backgroundColor: getTweetBackgroundColor(tweet.Sentiment) }}
                  >
                    <p className="font-roboto">
                      <strong>Tweet:</strong> {tweet.Tweet}
                    </p>
                    <p className="font-roboto">
                      Rating: {tweet.Rating} | Sentiment: {tweet.Sentiment} | Emotion:{" "}
                      {tweet.Emotion} ({tweet["Emotion Score"]})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default SentimentAnalysis;
