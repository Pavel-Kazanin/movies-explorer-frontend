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
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [serverError, setServerError] = useState(''); 
  const [movies, setMovies] = useState({});
  const [currentUser, setCurrentUser] = useState({}); 

  useEffect(() => {
    if (width > 768) {
      closeBurger();
    }
  }, [width]);

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
          setServerError('');       
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
      navigate('/signin', { replace: true });
    }) 
    .catch((err) => {
      console.log(err);
    })   
  }

  function handleUpdateUser(info) {         
    mainApi.setUserInfo(info.name, info.email)
    .then((res) => { 
      if(res.ok) {
        setServerError('');
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
  
  function getMovies() {
    moviesApi.getMovies()
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          setServerError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
        }
      })
      .then((data) => {
        setMovies(data);        
      })
      .catch((err) => {
        console.log(err);
      })
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
          <Route path="/movies" element={<ProtectedRoute element={Movies} tokenCheck={handleTokenCheck} loggedIn={loggedIn}  width={width} getMovies={getMovies} movies={movies} />} />
          <Route path="/saved-movies" element={<ProtectedRoute element={SavedMovies} loggedIn={loggedIn}  width={width} />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} loggedIn={loggedIn} onUpdateUser={handleUpdateUser} onSignOut={handleSignOut} serverError={serverError} />} />
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
