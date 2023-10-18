import headerLogo from "../../images/logo.svg";
import { Link, useLocation } from 'react-router-dom';
import Navigation from "../Navigation/Navigation";

function Header() {

  const loggedIn = false;
  const link = useLocation();

  return (
    <header className={`header ${link.pathname === "/" && 'header-main'}`}>
      <Link className="header__logo" to="/"><img className="header__logo-image" alt="Логотип" src={headerLogo} /></Link>
      {loggedIn ?
        <Navigation />
        :
        <div className="header__user-info">
          <Link to="signup" className="header__signup">Регистрация</Link>
          <Link to="signin" className="header__signin"><button className="header__signin-button">Войти</button></Link>
        </div>
      }
    </header>
  )
}

export default Header;