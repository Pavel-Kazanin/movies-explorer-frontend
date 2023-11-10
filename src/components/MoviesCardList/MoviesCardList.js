import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from 'react-router-dom';

function MoviesCardList({ visibleItems, items, selector, isLoading }) {
  
  const link = useLocation();

  return (
    <>
      {
        isLoading ?
          <Preloader />
          :
          <ul className="movies__cards">
            {
              link.pathname === '/movies' ?
                items.slice(0, visibleItems).map((card) => <MoviesCard key={card.id} card={card} selector={selector} />)
                :
                items.map((card) => <MoviesCard selector="saved-card" key={card._id} card={card} />)
            }
          </ul>
      }
    </>
  )
}

export default MoviesCardList;