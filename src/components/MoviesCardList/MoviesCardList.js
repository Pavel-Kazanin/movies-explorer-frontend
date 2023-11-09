import MoviesCard from "../MoviesCard/MoviesCard";
import NoResult from "../NoResult/NoResult";

function MoviesCardList({ visibleItems, movies, selector }) {

  return (
    <>
      {
        !movies ?
          <NoResult />
          :
          <ul className="movies__cards">
            {
              //movies.slice(0, visibleItems).map((card) => <MoviesCard key={card.id} card={card} selector={selector} />)
            }
          </ul>

      }
    </>
  )
}

export default MoviesCardList;