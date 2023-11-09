class MoviesApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._url}/`, {
      headers: this._headers,
      credentials: 'include'
    })    
  }   
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {    
    'Content-Type': 'application/json'    
  }  
});

export default moviesApi;