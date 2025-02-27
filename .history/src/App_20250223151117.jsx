import React, { useEffect ,useState } from "react";
import Search from "./components/Search.jsx";

const API_BASE_URL= 'https://api.themoviedb.org/3';

const API_KEY=import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS={
  method : 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const[searchTerm,setSearchTerm]=useState('');
  const[errorMessage , setErrorMessage]=useState('');
  const [movieList, setMovielist]=useState([]);
  const [isLoading, setIsLoading]=useState(false);

  const fetchMovies = async ()=>{
    setIsLoading(true); 
    setErrorMessage('');
    try{
      const endpoint=`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      

      const response=await fetch(endpoint , API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }

      const data = await response.jason();

      if(!data.results || data.results.lenght === 0){
        setErrorMessage('Failed to fetch movies' );
        setMovielist([]); 
        return;
      }

      setMovielist(data.results || []);
    }
    catch(error){
      console.error(`Error Fetching Movies: ${error}`);
      setErrorMessage(`Error Fetching Movies: Try Again Later.`);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    fetchMovies();
  },[]);
  

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

          <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
      </div>

      <section className="all-movies">
        <h2> All Movies </h2>
        { isLoading ? (
          <p className="text-white">Loading...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <ul>
            {movieList.map((movie)=>(
              <p className="text-white">{movie.title}</p>
            ))} 
          </ul>
        )}

      </section>

      
    </main>
  );
};

export default App;
