import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTNjNWRlMWJhZDcwNzZjYjA1YThjZTM4ZDBlZTQ5NCIsIm5iZiI6MTcyMzcwMTg0Mi4wNTA1MTMsInN1YiI6IjY2YmQ5OGE3NjE4N2IxNGI2M2MzODA1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KLDk213rINcZr8nQvgYfM_or4jm28lJ1D0wqNApWe8c'
    }
  };
  
  

  const handlewheel =(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  
  }
  
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));



    cardsRef.current.addEventListener('wheel', handlewheel);
  },[])
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>

        })}
      </div>
      
    </div>
  )
}

export default TitleCards
