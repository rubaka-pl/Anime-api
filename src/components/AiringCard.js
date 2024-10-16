import React, { useEffect, useState } from 'react'
import './airingCard.css'
const AiringCard = ({ anime }) => {
    const [genres, setGenres] = useState([])
    const getDetails = (anime) => {
        const genresSentence = anime.genres.map((genre) => genre.name).join(', ');
        setGenres(genresSentence);
    };

    useEffect(() => {
        getDetails(anime);
    }, [anime]);

    return (
        <div className="card">
            <img className='card-image' src={anime.images.jpg.image_url} alt={anime.title} />
            <div className="card-details">
                <div className="card-title">
                    <h3>{anime.newTitle}</h3>
                    <p>Genres: {genres}</p>
                    <p>Episodes: {anime.episodes || "--"}</p>
                    <p>Score: {anime.score}</p>
                    <p>Favorites:{anime.favorites}</p>
                </div>
            </div>
        </div>
    )
}

export default AiringCard