import { useState } from 'react';
import './App.css';
//import Header from "../Header/Header";
//import Main from "../Main/Main";
//import Footer from '../Footer/Footer';
//import Register from '../Register/Register';
import Movies from '../Movies/Movies';
//import Login from '../Login/Login';
//import Profile from '../Profile/Profile';

function App() {

  const loggedIn = true;
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isEdit, setEditState] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: "Виталий", email: "pochta@yandex.ru"}); 

  function toggleBurger() {
    setBurgerOpen(!isBurgerOpen);
  }

  function allowEdit() {
    setEditState(true);
  }

  function handleUpdateUser(userInfo) {    
    setCurrentUser(userInfo);
    setEditState(false);
  }

  return (
    <div className="App">
      {/*<Header isBurgerOpen={isBurgerOpen} toggleBurger={toggleBurger} loggedIn={loggedIn} />
      
      <Main />
      <Footer />
      <Login /> 
      <Register />  
      <Profile loggedIn={loggedIn} isEdit={isEdit} allowEdit={allowEdit} currentUser={currentUser} onUpdateUser={handleUpdateUser} />*/} 
      <Movies />  
    </div>
  );
}

export default App;
