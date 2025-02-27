import React, { useEffect ,useState } from "react";
import Search from "./components/Search.jsx";

const API_BASE_URL= 'https://api.themoviedb.org/3/discover/movie';

const API_KEY=import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS={
  method : 'GET',
  headers: {
    accept: 'application/jason',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const[searchTerm,setSearchTerm]=useState('');

  const[errorMessage , setErrorMessage]=useState(null);

  const fetchMovies = async ()=>{
    try{
      const endpoint=`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      

      const response=await fetch(endpoint , API_OPTIONS);
    }
    catch(error){
      console.error(`Error Fetching Movies: ${error}`);
      setErrorMessage(`Error Fetching Movies: Try Again Later.`);
    }
  }

  useEffect(()=>{

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

        {errorMessage && <p className="text-red-500"> {errorMessage}</p>}
      </section>

      
    </main>
  );
};

export default App;
