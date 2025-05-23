import React from 'react'

const MoveCard = ({movie: 
  title , vote_average , poster_path, release_date, orginal_language}
) => {
  return (
    <div className='move-card'>
      <img 
      src={poster_path ? 
        `https://image.tmdb.org/t/p/w500/${poster_path}`: '/no-movie.png'} 
         alt={title} 
         />

         <div className='mt-4'>
          <h3>{title}</h3>

          <div className='content'>
            <div className='rating'>
              <img src="start.svg" alt="Start Icon" />
              <p>{{vote_average} ? vote_average.toFixed(1): 'N/A' }</p>
            </div>

            <span>•</span>
          </div>
          </div> 
    </div>
  )
}

export default MoveCard