import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import LoadingSpinner from "../components/LoadingSpinner";

const API_KEY = "d96dd4e5"; // Your OMDb API key

const Home = () => {
  // State for the search query
  const [query, setQuery] = useState("");
  // State for storing fetched movies
  const [movies, setMovies] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(false);
  // State for error messages
  const [error, setError] = useState(null);

  // Function to fetch movies from OMDb API
  const fetchMovies = async (searchTerm) => {
    setLoading(true); // Show loading spinner
    setError(null); // Reset error state
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        // Movies found
        setMovies(data.Search);
      } else {
        // No movies found or API returned an error
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      // Network or other error
      setError("Failed to fetch data");
      setMovies([]);
    }
    setLoading(false); // Hide loading spinner
  };

  // Function to handle search from SearchBar component
  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    fetchMovies(searchTerm);
  };

  return (
    <div className="home-page">
      {/* Search input component */}
      <SearchBar onSearch={handleSearch} />
      
      {/* Show loading spinner when fetching data */}
      {loading && <LoadingSpinner />}

      {/* Show error message if there is one */}
      {error && <p className="error">{error}</p>}

      {/* Show movie list if no loading and no error */}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
};

export default Home;
