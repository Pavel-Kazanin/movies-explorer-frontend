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

function App() {

  const navigate = useNavigate();
  const link = useLocation();
  const { width } = useResize();  

  const [loggedIn, setLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isEdit, setEditState] = useState(false); 
  const [serverError, setServerError] = useState(''); 
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]); 
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [currentMovies, setCurrentMovies] = useState([]);   
  const [searchValue, setSearchValue] = useState('');   

  useEffect(() => {
    if (width > 768) {
      closeBurger();
    }    
  }, [width]);

  useEffect(() => {
    if (localStorage.searchRequest && localStorage.checkboxState && localStorage.movies) { 
      setCurrentMovies(JSON.parse(localStorage.movies));
      setSearchValue(JSON.parse(localStorage.searchRequest));
      setCheckboxChecked(JSON.parse(localStorage.checkboxState));   
      filterMovies(JSON.parse(localStorage.searchRequest), JSON.parse(localStorage.checkboxState), JSON.parse(localStorage.movies));
    }   
  }, [])

  useEffect(() => {    
    handleTokenCheck();     
  },[loggedIn]);

  const handleTokenCheck = () => {
    mainApi.checkToken()
      .then((res) => {              
        if (res.ok) {          
          setLoggedIn(true);
          return res.json();
        } else {
          setLoggedIn(false);
        }
      })
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleRegistrationSubmit(password, email, name) {
    mainApi.registerUser(password, email, name)
    .then((res) => {                            
      if (res.ok) {
        handleAuthSubmit(password, email);
        setServerError('');                                
        return res.json();
      } else {
        return res.json();                                   
      }      
    })
    .then((res) => { 
      setServerError(res.message);
      return Promise.reject(`Ошибка: ${res.message}`); 
    })
    .catch((err) => {      
      console.log(err);
    })
  }

  function handleAuthSubmit(password, email) {
    mainApi.authorizeUser(password, email)           
      .then((res) => { 
          if(res.ok) {
            return res.json();
          } else {
            return res.json();
          }       
      })
      .then((res) => {
        if (res.data) {          
          setCurrentUser(res.data);       
          setLoggedIn(true);          
          navigate('/movies', { replace: true });                 
        } else {   
          setServerError(res.message);       
          return Promise.reject(`Ошибка: ${res.message}`);
        }
      })  
      .catch((err) => {
        console.error(err);
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
    mainApi.setUserInfo(info.name, info.email)
    .then((res) => { 
      if(res.ok) {   
        setServerError('Данные успешно обновлены');
        setEditState(false);                   
        return res.json();                  
      } else {             
        return res.json();
      }                 
    })
    .then((data) => {
      if (data.message) {          
        setServerError(data.message);       
        return Promise.reject(`Ошибка: ${data.message}`);               
      } else {   
        setCurrentUser(data);
      }
    })  
    .catch((err) => {
      console.log(err);
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
      const filteredMovies = name.toLowerCase().includes(search);
      return checkboxStatus ? (filteredMovies && item.duration <= 40) : filteredMovies;
    }))
  };
  
  function getMovies() {
    setIsLoading(true);
    if (movies.length === 0){
      moviesApi.getMovies()    
      .then((res) => {
        if(res.ok) {
          setServerError(false);          
          return res.json();          
        } else {
          setServerError('Jib,rf');
        }
      })
      .then((data) => {
        setMovies(data); 
        filterMovies(searchValue, checkboxChecked, data);        
      })
      .catch((err) => {
        setServerError(true);
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
          <Route path="/signin" element={<Login serverError={serverError} onAuthSubmit={handleAuthSubmit} />} />
          <Route path="/signup" element={<Register serverError={serverError} onRegisterUser={handleRegistrationSubmit} />} />
          <Route path="/movies" element={<ProtectedRoute element={Movies} getShortMovies={getShortMovies} checkboxChecked={checkboxChecked} setCheckboxChecked={setCheckboxChecked} serverError={serverError} searchValue={searchValue} setSearchValue={setSearchValue} isLoading={isLoading} tokenCheck={handleTokenCheck} loggedIn={loggedIn}  width={width} getSearchMovies={getMovies} currentMovies={currentMovies} />} />
          <Route path="/saved-movies" element={<ProtectedRoute element={SavedMovies} filterMovies={filterMovies} loggedIn={loggedIn}  width={width} />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} isEdit={isEdit} setEditState={setEditState} loggedIn={loggedIn} onUpdateUser={handleUpdateUser} onSignOut={handleSignOut} serverError={serverError} />} />
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
