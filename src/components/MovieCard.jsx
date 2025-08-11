import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

// Component to display a single movie card
// Shows movie poster, title, year, and a favorite button
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  // Get favorite-related functions and checks from context
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);

  // Navigate to movie details page when the card is clicked
  const handleDetails = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  // Toggle favorite status without triggering the card click event
  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevents opening details when clicking favorite button
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="movie-card" onClick={handleDetails}>
      {/* Display poster or a placeholder image */}
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
        alt={movie.Title}
      />

      {/* Movie title and year */}
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>

      {/* Favorite button: filled star if favorite, empty star if not */}
      <button
        className={`fav-btn ${isFavorite(movie.imdbID) ? "fav" : ""}`}
        onClick={toggleFavorite}
        title="Add to favorites"
      >
        {isFavorite(movie.imdbID) ? "★" : "☆"}
      </button>
    </div>
  );
};

export default MovieCard; // Export component to use in other files
