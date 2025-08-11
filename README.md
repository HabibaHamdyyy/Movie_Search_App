# Movie Search App

A simple React application to search for movies using the OMDb API.  
The app allows users to search for movies by title, view details, and add/remove favorites.

---

## Features
- Search for movies by title
- View movie details
- Add and remove movies from favorites
- Responsive design

---

## Technologies Used
- React.js
- React Router
- Context API
- CSS
- OMDb API

---

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/HabibaHamdyyy/Movie_Search_App.git

### 2. Navigate to the project folder

cd movie-search-app

### 3. Install dependencies

npm install

### 4. Add your OMDb API key

Open the file where the API URL is defined (e.g., SearchBar.jsx or config file).
Replace YOUR_API_KEY with your OMDb API key.

### 5. Run the application

npm start

---

## Folder Structure

/src

  /components
  
    SearchBar.jsx
    
    MovieCard.jsx
    
    MovieList.jsx
    
    LoadingSpinner.jsx
    
  /pages
  
    Home.jsx
    
    MovieDetails.jsx
    
  /context
  
    FavoritesContext.jsx
    
  /styles
  
    styles.css
    
  App.jsx
  
  index.js
  
