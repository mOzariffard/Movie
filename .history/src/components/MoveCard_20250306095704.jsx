import React from 'react'

const MoveCard = ({movie: 
  title , vote_average , poster_path, release_date, orginal_language}
) => {
  return (
    <div>
        <p key={movie.id} className='text-white'> {movie.title}</p>
    </div>
  )
}

export default MoveCard