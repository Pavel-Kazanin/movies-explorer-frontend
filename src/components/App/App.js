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

function App() {

  const navigate = useNavigate();
  const link = useLocation();
  const { width } = useResize();  

  const [loggedIn, setLoggedIn] = useState(false);
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isEdit, setEditState] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: "Виталий", email: "pochta@yandex.ru"}); 

  useEffect(() => {
    if (width > 768) {
      closeBurger();
    }
  }, [width]);

  function openBurger() {
    setBurgerOpen(true);
  }

  function closeBurger() {
    setBurgerOpen(false);
  }

  function allowEdit() {
    setEditState(true);
  }

  function handleUpdateUser(userInfo) {    
    setCurrentUser(userInfo);
    setEditState(false);
  }
  
  function logIn() {
    setLoggedIn(true);
    navigate('/movies', { replace: true });
  }

  function logOut() {
    setLoggedIn(false);
    navigate('/', { replace: true });
  }

  return (
    <div className="App">
      {
        (link.pathname === "/" || link.pathname === "/movies" || link.pathname === "/saved-movies" || link.pathname === "/profile") &&
          <Header isBurgerOpen={isBurgerOpen} openBurger={openBurger} closeBurger={closeBurger} loggedIn={loggedIn} />
      }      
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signin" element={<Login loggedIn={loggedIn} logIn={logIn} />} />
        <Route path="/signup" element={<Register />} /> 
        <Route path="/movies" element={<Movies width={width} />} /> 
        <Route path="/saved-movies" element={<SavedMovies width={width} />} /> 
        <Route path="/profile" element={<Profile allowEdit={allowEdit} isEdit={isEdit} logOut={logOut} currentUser={currentUser} onUpdateUser={handleUpdateUser} loggedIn={loggedIn} />} />     
      </Routes>
      {
        (link.pathname === "/" || link.pathname === "/movies" || link.pathname === "/saved-movies") &&
          <Footer />
      }        
    </div>
  );
}

export default App;
