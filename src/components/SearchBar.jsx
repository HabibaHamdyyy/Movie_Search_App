import React, { useState } from "react";

// Search bar component for user input
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // State to store the search query

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if (query.trim()) {
      onSearch(query.trim()); // Calls the search function passed as a prop
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      {/* Input field for the search term */}
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Updates query state on change
      />
      {/* Search button */}
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
