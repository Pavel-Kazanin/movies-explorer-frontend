import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import NoResult from '../NoResult/NoResult';
import { BASE_SERVER_ERROR, NO_RESULT } from '../../utils/constants';

function SavedMovies({ isLoading, serverError, savedMovies, deleteSavedMovies }) {
  
  const [currentSavedMovies, setCurrentSavedMovies] = useState([]);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [searchValue, setSearchValue] = useState('');  

  useEffect(() => {
    filterMovies(searchValue, checkboxChecked, savedMovies);        
  }, [savedMovies]);  

    const filterMovies = (search, checkboxStatus, films) => {
    setSearchValue(search);        
    setCurrentSavedMovies(films.filter((item) => {
      const name = item.nameRU +  item.nameEN;      
      const filteredMovies = name.toLowerCase().includes(search);
      return checkboxStatus ? (filteredMovies && item.duration <= 40) : filteredMovies;
    }))
  };

  function getMovies() {
    filterMovies(searchValue, false, savedMovies);
  }

  function getShortMovies() {
    if(checkboxChecked) {
      setCheckboxChecked(false);
      filterMovies(searchValue, false, savedMovies);
    } else {  
      setCheckboxChecked(true);    
      filterMovies(searchValue, true, savedMovies);
    }    
  } 
  
  return (
    <section className="movies">
      <SearchForm getMovies={getMovies} searchValue={searchValue} setSearchValue={setSearchValue} checkboxChecked={checkboxChecked} setCheckboxChecked={setCheckboxChecked} getShortMovies={getShortMovies} />
      {
        currentSavedMovies.length ?
          <MoviesCardList selector="card" items={currentSavedMovies} getShortMovies={getShortMovies} savedMovies={savedMovies} deleteSavedMovies={deleteSavedMovies} />
          :
          isLoading ?
            <Preloader />
            :
            <NoResult serverError={serverError ? BASE_SERVER_ERROR : NO_RESULT} />
      }
    </section>
  )
}

export default SavedMovies;