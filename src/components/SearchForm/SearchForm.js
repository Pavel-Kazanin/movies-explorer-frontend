function SearchForm({ getMovies }) { 
  
  function handleSubmit(e) {
    e.preventDefault();
    getMovies();
  }

  return (
    <section className="movies__search-container search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form__global-search global-search">
          <input type="text" name="text" className="global-search__text" placeholder="Фильм" />
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