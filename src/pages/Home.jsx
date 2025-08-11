import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import LoadingSpinner from "../components/LoadingSpinner";

const API_KEY = "d96dd4e5"; 

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch data");
      setMovies([]);
    }
    setLoading(false);
  };

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    fetchMovies(searchTerm);
  };

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
};

export default Home;
