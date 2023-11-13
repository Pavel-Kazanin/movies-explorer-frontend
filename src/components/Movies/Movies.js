import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import NoResult from "../NoResult/NoResult";
import Preloader from '../Preloader/Preloader';

function Movies({ width, addToSavedMovies, deleteSavedMovies, savedMovies, apiMovies, getSearchMovies, currentMovies, isLoading, serverError, searchValue, setSearchValue, checkboxChecked, setCheckboxChecked, getShortMovies }) {   
  
  const [visibleItems, setVisibleItems] = useState();
  const [additionalCard, setAdditionalCard] = useState();
  const [visibleButton, setVisibleButton] = useState(false);  
  
  useEffect(() => {       
    if (width >= 1280) {
      setVisibleItems(16);
      setAdditionalCard(4);
    } else if (width < 1280 && width > 990) {
      setVisibleItems(12);
      setAdditionalCard(3);
    } else if (width >= 630 && width <= 989) {
      setVisibleItems(4);
      setAdditionalCard(1);
    } else if (width <= 480 && width>= 320) {
      setVisibleItems(5);
      setAdditionalCard(1);
    }    
  }, [width, additionalCard])    

  useEffect(() => {    
    if (currentMovies.length > 0 && currentMovies.length <= visibleItems) {
      setVisibleButton(false);
    } else {
      setVisibleButton(true);
    }  
  }, [currentMovies, visibleItems]);

  function showMore() {
    setVisibleItems((previousValue) => previousValue + additionalCard);                 
  }    

  return (
    <section className="movies">
      <SearchForm getMovies={getSearchMovies} getShortMovies={getShortMovies} searchValue={searchValue} setSearchValue={setSearchValue} checkboxChecked={checkboxChecked} setCheckboxChecked={setCheckboxChecked} />
      {
        currentMovies.length ?
          <>
            <MoviesCardList selector="card" deleteSavedMovies={deleteSavedMovies} addToSavedMovies={addToSavedMovies} savedMovies={savedMovies} apiMovies={apiMovies} visibleItems={visibleItems} additionalCard={additionalCard} items={currentMovies} isLoading={isLoading} searchValue={searchValue} />
            <div className={`show-more ${!visibleButton && "show-more_hidden"}`}>
              <button className="show-more__button" type="buttuon" onClick={showMore}>Еще</button>
            </div>
          </>
          :
          isLoading ?
          <Preloader />
          :
          <NoResult serverError={serverError ? "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" : "Ничего не найдено"} />
      }
    </section>
  )
}

export default Movies;