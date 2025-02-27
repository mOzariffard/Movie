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

    }catch(error){
      console.error(`Error Fetching Movies: ${error}`);
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
        </header>
      </div>

      <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </main>
  );
};

export default App;
