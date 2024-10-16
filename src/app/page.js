"use client";
import { useState, useEffect } from "react";
import Header from '../components/Header.js';
import UpcomingCard from "@/components/UpcomingCard.js";
import AiringCard from "@/components/AiringCard.js";

export default function App() {
  const [upcomingAnime, setUpcomingAnime] = useState([]);
  const [airingAnime, setAiringAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);

  // Передаем animeList как аргумент
  const formatAnimeTitles = (animeList) => {
    const updatedAnimeList = animeList.map((anime) => {
      const isLongTitle = anime.title.split(' ').length > 5;
      const newTitle = isLongTitle ? anime.title.slice(0, 25) + "..." : anime.title; // добавляем "..." для длинных названий
      return { ...anime, newTitle };
    });
    return updatedAnimeList; // Исправлено на updatedAnimeList
  };

  const getAnime = async (category) => {
    console.log("Getting Anime");

    try {
      const response = await fetch(`api/anime/${category}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch anime category: ${category}, Status: ${response.status}` // Исправлено на response.status
        );
      }

      const { data } = await response.json();
      updateAnimeState(category, data); // Передаем данные в обновление состояния

    } catch (err) {
      console.error("!Error", err.message);
    }
  };

  const updateAnimeState = (category, animeList) => {
    const formattedAnime = formatAnimeTitles(animeList);


    switch (category) {
      case "upcoming":
        setUpcomingAnime(formattedAnime.slice(0, 8));
        break;
      case "airing":
        setAiringAnime(formattedAnime.slice(0, 20));
        break;
      case "bypopularity":
        setPopularAnime(formattedAnime.slice(0, 15));
        break;
    }
  };

  useEffect(() => {
    const staggeredRequest = (category, delay) => {
      setTimeout(() => getAnime(category), delay);
    };
    staggeredRequest("upcoming", 0);
    staggeredRequest("airing", 500);
    staggeredRequest("bypopularity", 600);
  }, []);

  return (
    <div className='anime-app'>
      <div className="container">
        <Header />
        <div className="content">
          <div className="media-section">
            <div className="media-header">
              <div className="media-title">
                <img src="/images/Naruto.jpg" alt="Naruto" />
                <h2>UPCOMING</h2>
              </div>
              <div className="pagination">
                {
                  [1, 2, 3, 4, 5].map((num) => {
                    return <h2 key={num}>{num}</h2>;
                  })
                }
              </div>
            </div>
            <div className="anime-grid upcoming">
              {upcomingAnime.map((anime) => {
                return <UpcomingCard anime={anime} key={anime.mal_id} /> // Передаем данные аниме
              })}
            </div>
            <div className="media-header">
              <div className="media-title">
                <img src="/images/Naruto.jpg" alt="Naruto" />
                <h2>CURRENTLY AIRING</h2>
              </div>
            </div>
            <div className="anime-grid airing">
              {airingAnime.map((anime) => (
                <AiringCard key={anime.mal_id} anime={anime} /> // Передаем данные аниме
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
