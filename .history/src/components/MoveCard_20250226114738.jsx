import React from 'react'

const MoveCard = ({movie}) => {
  return (
    <div>
        <p key={movie.id} className='text-white'> {movie.title}</p>
    </div>
  )
}

export default MoveCard