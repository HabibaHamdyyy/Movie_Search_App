import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);

  const handleDetails = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="movie-card" onClick={handleDetails}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
        alt={movie.Title}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
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

export default MovieCard;
