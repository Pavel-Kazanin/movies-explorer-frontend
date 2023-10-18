import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const link = useLocation();

  return (
    <nav className="navigation">
      <div className="navigation__movies">
        <Link className={`navigation__element ${link.pathname === "/" && 'navigation__element_content'} ${link.pathname === "/movies" && 'navigation__element_active'}`} to="movies">Фильмы</Link>
        <Link className={`navigation__element ${link.pathname === "/" && 'navigation__element_content'} ${link.pathname === "/saved-movies" && 'navigation__element_active'}`} to="saved-movies">Сохраненные фильмы</Link>
      </div>
      <Link to="profile" className="navigation__profile navigation__element profile">
        <div className={`profile__button button ${link.pathname === "/" && 'profile__button_content'}`}>
          <span className="button__text">Аккаунт</span>
          <div className="button__icon"></div>
        </div>
      </Link>
    </nav>
  )
}

export default Navigation;