import React from "react";
import MovieCard from "./MovieCard";

// Component to display a list of movies
const MovieList = ({ movies }) => {
  // If there are no movies, show a "No movies found" message
  if (!movies.length) return <p>No movies found.</p>;

  return (
    // Container for the movie list
    <div className="movie-list">
      {/* Loop through the movies array and render a MovieCard for each movie */}
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
