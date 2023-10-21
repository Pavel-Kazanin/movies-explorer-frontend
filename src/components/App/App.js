import { useState } from 'react';
import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";

function App() {

  const [isBurgerOpen, setBurgerOpen] = useState(false);

  function toggleBurger() {
    setBurgerOpen(!isBurgerOpen);
  }

  return (
    <div className="App">
      <Header isBurgerOpen={isBurgerOpen} toggleBurger={toggleBurger} />
      <Main />
    </div>
  );
}

export default App;
