import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import NoResult from '../NoResult/NoResult';


function SavedMovies({ isLoading, serverError }) {

  const [savedMovies, setSavedMovies] = useState([]); 
  const [currentSavedMovies, setCurrentSavedMovies] = useState([]);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getSavedMovies();    
  }, [])

  function getSavedMovies() {
    mainApi.getSavedMovies()    
      .then((res) => {
        if(res.ok) {                    
          return res.json();          
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setSavedMovies(data); 
        setCurrentSavedMovies(data);               
      })
      .catch((err) => {        
        console.log(err);
      })
      .finally(() => {                 
      });
  }

  const filterMovies = (search, checkboxStatus, films) => {
    setSearchValue(search);        
    setCurrentSavedMovies(films.filter((item) => {
      const name = item.nameRU +  item.nameEN;      
      const filteredMovies = name.toLowerCase().includes(search);
      return checkboxStatus ? (filteredMovies && item.duration <= 40) : filteredMovies;
    }))
  };

  function getShortMovies() {
    if(checkboxChecked) {
      setCheckboxChecked(false);
      filterMovies(searchValue, false, savedMovies);
    } else {  
      setCheckboxChecked(true);    
      filterMovies(searchValue, true, savedMovies);
    }   
    console.log(checkboxChecked); 
  }

  
  
 
  
  return (
    <section className="movies">
      <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} checkboxChecked={checkboxChecked} setCheckboxChecked={setCheckboxChecked} getShortMovies={getShortMovies} />
      {
        currentSavedMovies.length ?
          <MoviesCardList selector="card" items={currentSavedMovies} getShortMovies={getShortMovies} />
          :
          isLoading ?
            <Preloader />
            :
            <NoResult serverError={serverError ? "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" : "Ничего не найдено"} />
      }
    </section>
  )
}

export default SavedMovies;