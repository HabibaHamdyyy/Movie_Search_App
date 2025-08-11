import React, { createContext, useState } from "react";

// Create a context to store favorite movies globally
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // State to store all favorite movies
  const [favorites, setFavorites] = useState([]);

  // Function to add a movie to favorites (if it's not already there)
  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (!prev.find((m) => m.imdbID === movie.imdbID)) {
        return [...prev, movie]; // Add new favorite
      }
      return prev; // If already in favorites, return unchanged
    });
  };

  // Function to remove a movie from favorites by ID
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((movie) => movie.imdbID !== id));
  };

  // Check if a movie is already in favorites
  const isFavorite = (id) => favorites.some((movie) => movie.imdbID === id);

  return (
    // Provide the favorites state and functions to the whole app
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
