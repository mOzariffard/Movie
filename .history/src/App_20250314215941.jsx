import React, { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
// import MovieCard from "./components/MovieCard.jsx";


const API_BASE_URL = 'https://api.themoviedb.org/3';  // Remove /discover/movie from base URL
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',  // Fixed typo in 'json'
    Authorization: `Authorization: Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovielist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query='') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query 
      ? `${API_BASE_URL}/discover/movie?query=${encodeURIComponent}` 
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;  // Fixed endpoint URL
      const response = await fetch(endpoint, API_OPTIONS);
      
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      
      const data = await response.json();  // Fixed typo in 'json'
      
      if (!data.results || data.results.length === 0) {  // Better error checking
        setErrorMessage('No movies found');
        setMovielist([]);
        return;
      }
      setMovielist(data.results || []);

    } catch (error) {
      console.error(`Error Fetching Movies: ${error}`);
      setErrorMessage(`Error Fetching Movies: Try Again Later.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero Img" />
          <h1>
            {" "}
            Find <span className="text-gradient">Movie</span> You'll Enjoy
            Without The Hastle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
      </div>
      <section className="all-movies">
        <h2> All Movies </h2>
        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : 
        (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movieList.map((movie) => (
                // <MovieCard key={movie.id} movie={movie} />                
              ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default App;