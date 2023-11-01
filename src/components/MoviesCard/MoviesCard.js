import { useState } from "react";
import cardLink from "../../images/movies/33 слова о дизайне.jpg";

function MoviesCard() {

  const [isSaved, setSaved] = useState(false);

  function toggleLike() {
    setSaved(!isSaved);
  }

  return (
    <li className="movies__card card">
      <img className="card__image" alt="33 слова о дизайне" src={cardLink} />
      <div className="card__description">
        <h2 className="card__title">33 слова о дизайне 33 слова о дизайне</h2>
        <button className={`card__like ${isSaved && 'card__like_active'}`} name="card-like" type="button" value="add-like" onClick={toggleLike}></button>
      </div>
      <div className="card__separator"></div>
      <p className="card__duration">1ч 42м</p>
    </li>
  )
}

export default MoviesCard;