class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }      
    return Promise.reject(res.json());
  }

  setUserInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name, email })
    })
    .then(this._checkResponse)   
  }  

  registerUser(password, email, name) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({password, email, name})
    })
    .then(this._checkResponse)    
  }

  authorizeUser(password, email) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },      
      body: JSON.stringify({password, email})
    })
    .then(this._checkResponse)      
  }

  signOut() {
    return fetch(`${this._url}/signout`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(this._checkResponse)     
  }

  checkToken() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include'      
    })
    .then(this._checkResponse)       
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      credentials: 'include'     
    })
    .then(this._checkResponse) 
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._checkResponse)    
  }

  setSavedMovies(country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers, 
      body: JSON.stringify({country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN})    
    })
    .then(this._checkResponse) 
  }
}

const mainApi = new MainApi({
  url: 'https://api.pavelkazaninmovies.nomoredomainsrocks.ru',
  headers: {    
    'Content-Type': 'application/json'    
  }  
});

export default mainApi;