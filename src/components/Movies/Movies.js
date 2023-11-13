import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import NoResult from "../NoResult/NoResult";
import Preloader from '../Preloader/Preloader';
import { MAX_WIDTH, INTERMEDIATE_MAX_WIDTH, INTERMEDIATE_MD_WIDTH, INTERMEDIATE_MIN_WIDTH, MIN_WIDTH, MAX_VB_ITEMS, MD_VB_ITEMS, MDMIN_VB_ITEMS, MIN_VB_ITEMS, MAX_ADD_CARD, MD_ADD_CARD, MIN_ADD_CARD } from '../../utils/constants';

function Movies({ width, addToSavedMovies, deleteSavedMovies, savedMovies, apiMovies, getSearchMovies, currentMovies, isLoading, serverError, searchValue, setSearchValue, checkboxChecked, setCheckboxChecked, getShortMovies }) {   
  
  const [visibleItems, setVisibleItems] = useState();
  const [additionalCard, setAdditionalCard] = useState();
  const [visibleButton, setVisibleButton] = useState(false);  
  
  useEffect(() => {       
    if (width >= MAX_WIDTH) {
      setVisibleItems(MAX_VB_ITEMS);
      setAdditionalCard(MAX_ADD_CARD);
    } else if (width < MAX_WIDTH && width > INTERMEDIATE_MAX_WIDTH) {
      setVisibleItems(MD_VB_ITEMS);
      setAdditionalCard(MD_ADD_CARD);
    } else if (width >= INTERMEDIATE_MD_WIDTH && width <= INTERMEDIATE_MAX_WIDTH) {
      setVisibleItems(MDMIN_VB_ITEMS);
      setAdditionalCard(MIN_ADD_CARD);
    } else if (width <= INTERMEDIATE_MIN_WIDTH && width>= MIN_WIDTH) {
      setVisibleItems(MIN_VB_ITEMS);
      setAdditionalCard(MIN_ADD_CARD);
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
          <NoResult serverError={serverError} />
      }
    </section>
  )
}

export default Movies;