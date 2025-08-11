import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { FavoritesContext } from "../context/FavoritesContext";

// API key for OMDB API
const API_KEY = "d96dd4e5"; 

const MovieDetails = () => {
  // Extract the movie ID from the URL parameters
  const { id } = useParams();
  const navigate = useNavigate();

  // State for storing movie details, loading status, and errors
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Access favorites context to check/add/remove favorites
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);

  // Fetch movie details when the component mounts or `id` changes
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch full plot details for the selected movie
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );
        const data = await response.json();

        // If response is successful, store movie data
        if (data.Response === "True") {
          setMovie(data);
        } else {
          // Otherwise, set an error message
          setError(data.Error);
        }
      } catch {
        // Catch any network or fetch errors
        setError("Failed to fetch movie details");
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  // Show loading spinner while fetching data
  if (loading) return <LoadingSpinner />;
  // Show error message if something went wrong
  if (error) return <p className="error">{error}</p>;

  // Toggle between adding/removing a movie from favorites
  const toggleFavorite = () => {
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
      });
    }
  };

  return (
    <div className="movie-details">
      {/* Go back to the previous page */}
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      {/* Movie title and year */}
      <h2>{movie.Title} ({movie.Year})</h2>

      <div className="details-container">
        {/* Display poster or a placeholder image */}
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
        />

        {/* Movie details section */}
        <div className="details-info">
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>

          {/* Favorite toggle button */}
          <button onClick={toggleFavorite} className="fav-btn">
            {isFavorite(movie.imdbID) ? "Remove from Favorites ★" : "Add to Favorites ☆"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
