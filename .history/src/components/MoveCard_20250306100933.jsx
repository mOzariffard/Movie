import React from 'react'

const MoveCard = ({movie: 
  title , vote_average , poster_path, release_date, orginal_language}
) => {
  return (
    <div className='move-card'>
      <img 
      src={poster_path ? 
        `https://image.tmdb.org/t/p/w500/${poster_path}`: '/no-movie.png'} 
         /> 
    </div>
  )
}

export default MoveCard