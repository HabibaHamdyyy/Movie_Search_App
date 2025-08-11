import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { FavoritesProvider, FavoritesContext } from "./context/FavoritesContext";
import './styles/styles.css';

const FavoritesBar = () => {
  const { favorites } = React.useContext(FavoritesContext);

  return (
    <div className="favorites-bar">
      <h3>Favorites</h3>
      {favorites.length === 0 && <p>No favorites yet.</p>}
      <ul>
        {favorites.map((movie) => (
          <li key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>{movie.Title} ({movie.Year})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <header>
          <h1><Link to="/">Movie Search App</Link></h1>
        </header>
        <div className="app-container">
          <FavoritesBar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
