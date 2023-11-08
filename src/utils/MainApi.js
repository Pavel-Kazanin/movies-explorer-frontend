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

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._checkResponse)
  }

  /*getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._checkResponse)
  }*/

  setUserInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name, email })
    })    
  }

  /*addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ name, link })
    })
    .then(this._checkResponse)
  }*/

  /*getLikes() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }*/

  /*deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._checkResponse)
  }*/

  /*addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._checkResponse)
  }*/

  /*deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._checkResponse)
  }*/

  /*changeAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ avatar })
    })
    .then(this._checkResponse)
  }*/

  registerUser(password, email, name) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({password, email, name})
    })     
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
  }
}

const mainApi = new MainApi({
  url: 'https://api.pavelkazaninmovies.nomoredomainsrocks.ru',
  headers: {    
    'Content-Type': 'application/json'    
  }  
});

export default mainApi;