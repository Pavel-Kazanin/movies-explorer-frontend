import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

function MoviesCard({card, selector, savedMovies, addToSavedMovies, deleteSavedMovies }) {

  const [isSaved, setSaved] = useState(false);
  const link = useLocation();   
  
  useEffect(() => {
    savedMovies.forEach((item) => {
      if(item.movieId === card.id) {
        setSaved(true);
      }      
    })    
  }, [savedMovies]);

  function toggleLike() {
    if (!isSaved) {
      addToSavedMovies(card);
      setSaved(true);
    } else {      
      deleteSavedMovies(savedMovies.find(item => item.movieId === card.id)._id);
      setSaved(false);
    }

  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    if(minutes === 0) {
      return hours + 'ч'
    } else {
      return hours + 'ч:' + minutes + 'м';
    }    
};

  return (

    <li className={`movies__card card ${selector}`}>
      <a className="card__trailer-link" href={card.trailerLink} target="_blank" rel="noreferrer"><img className="card__image" alt={card.nameRU} src={link.pathname === "/movies" ? `https://api.nomoreparties.co/${card.image.url}` : card.image} /></a>
      <div className="card__description">
        <h2 className="card__title">{card.nameRU}</h2>
        <button className={`${selector}__like ${isSaved && 'card__like_active'}`} name="card-like" type="button" value="add-like" onClick={toggleLike}></button>
      </div>
      <div className="card__separator"></div>
      <p className="card__duration">{getTimeFromMins(card.duration)}</p>
    </li>

  )
}

export default MoviesCard;