import { useState, useEffect } from "react";
import cardLink from "../../images/movies/33 слова о дизайне.jpg";

function MoviesCard({card, selector}) {

  const [isSaved, setSaved] = useState(false);

  console.log(card);

  useEffect(() => {
    if (card.saved) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [])

  function toggleLike() {
    setSaved(!isSaved);
  }

  return (
    <li className={`movies__card card ${selector}`}>
      <img className="card__image" alt="33 слова о дизайне" src={cardLink} />
      <div className="card__description">
        <h2 className="card__title">{card.nameRU}</h2>
        <button className={`${selector}__like ${isSaved && 'card__like_active'}`} name="card-like" type="button" value="add-like" onClick={toggleLike}></button>
      </div>
      <div className="card__separator"></div>
      <p className="card__duration">{card.duration}</p>
    </li>
  )
}

export default MoviesCard;