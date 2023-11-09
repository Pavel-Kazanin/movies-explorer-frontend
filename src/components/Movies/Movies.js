import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ width, getMovies, movies }) {  
  
  const [visibleItems, setVisibleItems] = useState();
  const [visibleButton, setVisibleButton] = useState(true);
  
  console.log(movies);

  useEffect(() => {       
    if (width >= 1280) {
      setVisibleItems(16);
    } else if (width < 1280 && width >= 768) {
      setVisibleItems(8);
    } else if (width < 768) {
      setVisibleItems(5);
    }
  }, [width])

  useEffect(() => {                
    if (movies.length > 0 && movies.length <= visibleItems) {
      setVisibleButton(false);
    };  
  }, [visibleItems]);

  function showMore() {
    setVisibleItems((previousValue) => previousValue + 4);                 
  }  
  
  return (
    <section className="movies">
      <SearchForm getMovies={getMovies} />
      <MoviesCardList selector="card" visibleItems={visibleItems} items={movies} />
      {
        !movies && <div className={`show-more ${!visibleButton && "show-more_hidden"}`}>
        <button className="show-more__button" type="buttuon" onClick={showMore}>Еще</button>
      </div>  
      }          
    </section>  
  )
}

export default Movies;