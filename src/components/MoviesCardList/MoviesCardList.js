import MoviesCard from "../MoviesCard/MoviesCard";
import NoResult from "../NoResult/NoResult";

function MoviesCardList({ visibleItems, items, selector }) {

  return (
    <>
      {
        items ?
          <NoResult />
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