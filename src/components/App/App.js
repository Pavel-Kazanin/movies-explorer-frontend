import { useState } from 'react';
import './App.css';
//import Header from "../Header/Header";
//import Main from "../Main/Main";
//import Footer from '../Footer/Footer';
import Register from '../Register/Register';

function App() {

  const [isBurgerOpen, setBurgerOpen] = useState(false);

  function toggleBurger() {
    setBurgerOpen(!isBurgerOpen);
  }

  return (
    <div className="App">
      {/*<Header isBurgerOpen={isBurgerOpen} toggleBurger={toggleBurger} />
      <Main />
      <Footer />*/}
      <Register />
    </div>
  );
}

export default App;
