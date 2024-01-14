import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {useResize} from "../../hooks/useResize";
import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { SUCCESS_EDIT_PROFILE, MD_WIDTH, BASE_SERVER_ERROR, API_IMAGE_LINK } from '../../utils/constants';

function App() {

  const navigate = useNavigate();
  const link = useLocation();
  const { width } = useResize();  

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isEdit, setEditState] = useState(false); 
  const [serverError, setServerError] = useState(''); 
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]); 
  const [savedMovies, setSavedMovies] = useState([]);  
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [currentMovies, setCurrentMovies] = useState([]);   
  const [searchValue, setSearchValue] = useState('');
  const [isBlockedForm, setIsBlockedForm] = useState(false); 

  useEffect(() => {
    if (width > MD_WIDTH) {
      closeBurger();
    }    
  }, [width]) 

  useEffect(() => {
    if (loggedIn && (link.pathname === "/signup" || link.pathname === "/signin")) {
      navigate("/", { replace: true });
    }
    const path = "/";
    if (link.pathname !== path) {
      setServerError('');
      setEditState(false);
    }    
  }, [link]);

  useEffect(() => {
    if (localStorage.searchRequest && localStorage.checkboxState && localStorage.movies) { 
      setCurrentMovies(JSON.parse(localStorage.movies));
      setSearchValue(JSON.parse(localStorage.searchRequest));
      setCheckboxChecked(JSON.parse(localStorage.checkboxState));   
      filterMovies(JSON.parse(localStorage.searchRequest), JSON.parse(localStorage.checkboxState), JSON.parse(localStorage.movies));
    }   
  }, []);

  useEffect(() => {
    setServerError('');
  }, []);

  useEffect(() => {   
    handleTokenCheck();
    getSavedMovies();     
  },[loggedIn]);  

  const handleTokenCheck = () => {    
    mainApi.checkToken()
      .then((data) => {
          setLoggedIn(true);
          navigate(link.pathname, { replace: true });          
          setCurrentUser(data);
      })      
      .catch((err) => {        
        err.then((body) => {          
          console.log(body.message);
        })
      })
  }

  function handleRegistrationSubmit(password, email, name) {
    setIsBlockedForm(true);
    mainApi.registerUser(password, email, name)
      .then(() => {
        handleAuthSubmit(password, email);
        setServerError('');
      })
      .catch((err) => {        
        err.then((body) => {
          setServerError(body.message);
        })
      })
      .finally(() => {
        setIsBlockedForm(false);
      }) 
  }

  function handleAuthSubmit(password, email) {
    setIsBlockedForm(true);
    mainApi.authorizeUser(password, email)
      .then((res) => {
        setCurrentUser(res.data);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
        setServerError('');
      })
      .catch((err) => {        
        err.then((body) => {
          setServerError(body.message);
        })
      })
      .finally(() => {
        setIsBlockedForm(false);
      }) 

  } 

  function handleSignOut() {
    mainApi.signOut()    
    .then(() => {
      setLoggedIn(false);
      localStorage.clear();
      setMovies([]);
      setCurrentMovies([]);
      setSearchValue('');
      setCheckboxChecked(false);
      navigate('/', { replace: true });
    }) 
    .catch((err) => {
      console.log(err);
    })   
  }

  function handleUpdateUser(info) {
    setIsBlockedForm(true);       
    mainApi.setUserInfo(info.name, info.email)    
    .then((data) => {        
      setCurrentUser(data); 
      setEditState(false);
      setServerError(SUCCESS_EDIT_PROFILE);
      setTimeout(() => {
        setServerError('')
      }, 1000)    
    })
    .catch((err) => {            
      err.then((body) => {        
        setServerError(body.message);
      })
      .catch((err) => {
        console.log(err);
      })      
    })
    .finally(() => {
      setIsBlockedForm(false);
    })         
  }

  function openBurger() {
    setBurgerOpen(true);
  }

  function closeBurger() {
    setBurgerOpen(false);
  }

  function setLocalStorage(films, search, checkboxStatus) {
    localStorage.setItem('movies', JSON.stringify(films));
    localStorage.setItem('searchRequest', JSON.stringify(search));
    localStorage.setItem('checkboxState', JSON.stringify(checkboxStatus));
  }

  const filterMovies = (search, checkboxStatus, films) => {
    setSearchValue(search);
    setLocalStorage(films, search, checkboxStatus);    
    setCurrentMovies(films.filter((item) => {
      const name = item.nameRU +  item.nameEN;            
      const filteredMovies = name.toLowerCase().includes(search.toLowerCase());
      return checkboxStatus ? (filteredMovies && item.duration <= 40) : filteredMovies;
    }))
  };
  
  function getMovies() {
    setIsLoading(true);
    if (movies.length === 0){
      moviesApi.getMovies()      
      .then((data) => {
        setServerError('');
        setMovies(data); 
        filterMovies(searchValue, checkboxChecked, data);        
      })
      .catch((err) => {
        setServerError(BASE_SERVER_ERROR);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);          
      });
    } else {
      filterMovies(searchValue, checkboxChecked, movies);
      setIsLoading(false);
    }    
  }

  function getSavedMovies() {
    mainApi.getSavedMovies()      
      .then((data) => {
        setSavedMovies(data);                        
      })
      .catch((err) => {        
        console.log(err);      
      })         
  }

  function addToSavedMovies(movieCard, likeCard) { 
    const movieCardImage = API_IMAGE_LINK + movieCard.image.url;
    const thumbnail = API_IMAGE_LINK + movieCard.image.formats.thumbnail.url;  
    mainApi.setSavedMovies(movieCard.country, movieCard.director, movieCard.duration, movieCard.year, movieCard.description, movieCardImage, movieCard.trailerLink, thumbnail, movieCard.id, movieCard.nameRU, movieCard.nameEN, )
    .then((newCard) => {  
      likeCard();        
      setSavedMovies([newCard, ...savedMovies]);      
    })
    .catch((err) => {            
      err.then((body) => {        
        setServerError(body.message);
      })
      .catch((err) => {
        console.log(err);
      })      
    }) 
  }

  function deleteSavedMovies(movieCard, deleteLike) {
    mainApi.deleteMovie(movieCard).then(() => {
      const newCards = savedMovies.filter(item => item._id !== movieCard);
      deleteLike();
      setSavedMovies(newCards);
    })
      .catch((err) => {
        err.then((body) => {
          setServerError(body.message);
        })
          .catch((err) => {
            console.log(err);
          })
      })
  }

  function getShortMovies() {        
    if(checkboxChecked) {
      setCheckboxChecked(false);
      filterMovies(searchValue, false, movies);
    } else {  
      setCheckboxChecked(true);    
      filterMovies(searchValue, true, movies);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {
          (link.pathname === "/" || link.pathname === "/movies" || link.pathname === "/saved-movies" || link.pathname === "/profile") &&
          <Header isBurgerOpen={isBurgerOpen} openBurger={openBurger} closeBurger={closeBurger} loggedIn={loggedIn} />
        }
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signin" element={<Login serverError={serverError} isBlockedForm={isBlockedForm} onAuthSubmit={handleAuthSubmit} />} />
          <Route path="/signup" element={<Register serverError={serverError} isBlockedForm={isBlockedForm} onRegisterUser={handleRegistrationSubmit} />} />
          <Route path="/movies" element={<ProtectedRoute loggedIn={loggedIn} element={Movies} deleteSavedMovies={deleteSavedMovies} addToSavedMovies={addToSavedMovies} apiMovies={movies} savedMovies={savedMovies} getShortMovies={getShortMovies} checkboxChecked={checkboxChecked} setCheckboxChecked={setCheckboxChecked} serverError={serverError} searchValue={searchValue} setSearchValue={setSearchValue} isLoading={isLoading} tokenCheck={handleTokenCheck} width={width} getSearchMovies={getMovies} currentMovies={currentMovies} />} />
          <Route path="/saved-movies" element={<ProtectedRoute element={SavedMovies} deleteSavedMovies={deleteSavedMovies} filterMovies={filterMovies} loggedIn={loggedIn}  width={width} savedMovies={savedMovies} />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} isBlockedForm={isBlockedForm} isEdit={isEdit} setEditState={setEditState} loggedIn={loggedIn} onUpdateUser={handleUpdateUser} onSignOut={handleSignOut} serverError={serverError} />} />
        </Routes>
        {
          (link.pathname === "/" || link.pathname === "/movies" || link.pathname === "/saved-movies") &&
          <Footer />
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
