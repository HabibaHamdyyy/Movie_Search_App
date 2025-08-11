import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { FavoritesProvider, FavoritesContext } from "./context/FavoritesContext";
import './styles/styles.css';

// Component to display the favorites list in a sidebar
const FavoritesBar = () => {
  // Accessing the 'favorites' array from the context
  const { favorites } = React.useContext(FavoritesContext);

  return (
    <div className="favorites-bar">
      <h3>Favorites</h3>
      {/* If there are no favorite movies, display a message */}
      {favorites.length === 0 && <p>No favorites yet.</p>}
      <ul>
        {/* Loop through each favorite movie and display a link to its details */}
        {favorites.map((movie) => (
          <li key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>
              {movie.Title} ({movie.Year})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main application component
const App = () => {
  return (
    // Wrap the entire app with FavoritesProvider to provide favorites context
    <FavoritesProvider>
      <Router>
        <header>
          {/* Application title that links back to the home page */}
          <h1><Link to="/">Movie Search App</Link></h1>
        </header>
        <div className="app-container">
          {/* Sidebar showing list of favorite movies */}
          <FavoritesBar />
          <main>
            <Routes>
              {/* Route for the home page with search functionality */}
              <Route path="/" element={<Home />} />
              {/* Route for displaying details of a selected movie */}
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
