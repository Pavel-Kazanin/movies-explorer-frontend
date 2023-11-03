import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ visibleItems, items, selector }) {

  return (
    <ul className="movies__cards">
      {
        items.slice(0, visibleItems).map((card) => <MoviesCard key={card.id} card={card} selector={selector} />)
      }
    </ul>
  )
}

export default MoviesCardList;