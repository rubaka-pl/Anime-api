import React from 'react'
import './upcomingCard.css'

const UpcomingCard = ({ anime }) => {
    return (
        <div className='media-card'>
            <img className='image' src={anime.images.jpg.image_url} alt="card" />
            <div className="anime">
                <h3>{anime.newTitle}</h3>
            </div>
        </div>
    )
}

export default UpcomingCard