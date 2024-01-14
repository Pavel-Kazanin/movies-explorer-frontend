import { Link, useLocation } from 'react-router-dom';

function Navigation({ isBurgerOpen, closeBurger }) {
  
  const link = useLocation();
  
  return (    
    <div className={`navigation-container ${isBurgerOpen && 'navigation-container_opened'}`}>
      <nav className={`navigation ${isBurgerOpen && 'navigation-burger'}`}>
        <button className="navigation-burger__close-button" onClick={closeBurger}></button>
        <Link className={`navigation__element ${link.pathname === "/" && 'navigation__element_active'} element-main`} to="/" onClick={closeBurger}>Главная</Link>
        <div className="navigation__movies">
          <Link className={`navigation__element ${link.pathname === "/" && 'navigation__element_main'} ${link.pathname === "/movies" && 'navigation__element_active'}`} to="movies" onClick={closeBurger}>Фильмы</Link>
          <Link className={`navigation__element ${link.pathname === "/" && 'navigation__element_main'} ${link.pathname === "/saved-movies" && 'navigation__element_active'}`} to="saved-movies" onClick={closeBurger}>Сохранённые фильмы</Link>
        </div>
        <Link to="profile" className="navigation__profile navigation__element profile" onClick={closeBurger}>
          <div className={`profile__button button ${link.pathname === "/" && 'profile__button_content'}`}>
            <span className="button__text">Аккаунт</span>
            <div className="button__icon"></div>
          </div>
        </Link>
      </nav>
    </div>
  )
}

export default Navigation;