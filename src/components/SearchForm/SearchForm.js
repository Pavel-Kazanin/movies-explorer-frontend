import { useState } from "react";

function SearchForm({ getMovies }) { 

  const [searchValue, setSearchValue] = useState('');  

  function handleChange(e) {
    const {value} = e.target;
    setSearchValue(value);    
  }

  function handleFocus() {
    setSearchValue(''); 
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    if (searchValue === '') {
      setSearchValue('Нужно ввести ключевое слово');
    } else {
      getMovies();
      window.localStorage.setItem('searchRequest', searchValue);
      console.log(window.localStorage);
    }    
  }

  return (
    <section className="movies__search-container search-container">
      <form className="search-form" onSubmit={handleSubmit} noValidate>
        <div className="search-form__global-search global-search">
          <input type="text" name="text" className="global-search__text" placeholder="Фильм" onChange={handleChange} onFocus={handleFocus} required value={searchValue} />          
          <input type="submit" name="submit" className="global-search__submit-button" value="Найти" />
        </div>
        <div className="search-form__short-filter short-filter">
          <input id="checkbox-input" className="short-filter__checkbox" type="checkbox" name="checkbox" />
          <label className="short-filter__label" htmlFor="checkbox-input">Короткометражки</label>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;