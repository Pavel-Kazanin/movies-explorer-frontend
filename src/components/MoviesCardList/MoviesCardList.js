import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ visibleItems, items, selector, isLoading }) {  

  return (
    <>
      {
        isLoading ?
          <Preloader />
          :
          <ul className="movies__cards">
            {
              items.slice(0, visibleItems).map((card) => <MoviesCard key={card.id} card={card} selector={selector} />)
            }
          </ul>

      }
    </>
  )
}

export default MoviesCardList;