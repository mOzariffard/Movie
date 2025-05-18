import React, { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MoveCard from "./components/MoveCard.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        setErrorMessage('No movies found');
        setMovieList([]);
        return;
      }
      setMovieList(data.results);
    } catch (error) {
      console.error(`Error Fetching Movies: ${error}`);
      setErrorMessage(`Error Fetching Movies: Try Again Later.`);
    } finally {
      setIsLoading(false);
    }
  };

  const searchMovies = async () => {
    if (!searchTerm.trim()) {
      fetchMovies();
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to search movies');
      }
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        setErrorMessage('No movies found matching your search');
        setMovieList([]);
        return;
      }
      setMovieList(data.results);
    } catch (error) {
      console.error(`Error Searching Movies: ${error}`);
      setErrorMessage(`Error Searching Movies: Try Again Later.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // Handle search when searchTerm changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchMovies();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero Img" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without The Hassle
          </h1>
          <Search 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            onSearch={searchMovies}
          />
        </header>
      </div>
      <section className="all-movies">
        <h2 className="mt-8"> All Movies </h2>
        {isLoading ? (
          <Spinner/>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movieList.map((movie) => (
              <MoveCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default App;