import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { FavoritesContext } from "../context/FavoritesContext";

const API_KEY = "d96dd4e5"; // Replace with your OMDb API key

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch {
        setError("Failed to fetch movie details");
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="error">{error}</p>;

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
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      <h2>{movie.Title} ({movie.Year})</h2>
      <div className="details-container">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
        />
        <div className="details-info">
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <button onClick={toggleFavorite} className="fav-btn">
            {isFavorite(movie.imdbID) ? "Remove from Favorites ★" : "Add to Favorites ☆"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
