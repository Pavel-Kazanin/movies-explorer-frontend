import headerLogo from "../../images/logo.svg";
import { Link, useLocation } from 'react-router-dom';
import Navigation from "../Navigation/Navigation";

function Header({ isBurgerOpen, toggleBurger }) {

  const loggedIn = false;
  const link = useLocation();

  return (
    <header className={`header ${link.pathname === "/" && 'header-main'}`}>
      <Link className="header__logo" to="/"><img className="header__logo-image" alt="Логотип" src={headerLogo} /></Link>
      {loggedIn ?
        <>
          <Navigation isBurgerOpen={isBurgerOpen} closeBurger={toggleBurger} />
          <button className={`header__burger-menu-button ${link.pathname === "/" && 'header__burger-menu-button_white'}`} type="button" onClick={toggleBurger}></button>
        </>
        :
        <nav className="header__user-unauthorized">
          <Link to="signup" className="header__signup">Регистрация</Link>
          <Link to="signin" className="header__signin"><button type="submit" className="header__signin-button">Войти</button></Link>
        </nav>
      }
    </header>
  )
}

export default Header;