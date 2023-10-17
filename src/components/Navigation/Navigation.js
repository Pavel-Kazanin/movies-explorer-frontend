import { Link } from 'react-router-dom';

function Navigation() {

  return (
    <nav className="navigation">
      <div className="navigation__movies">
        <Link className="navigation__element" to="movies">Фильмы</Link>
        <Link className="navigation__element" to="saved-movies">Сохраненные фильмы</Link>
      </div>
      <Link to="profile" className="navigation__profile navigation__element profile">
        <div className="profile__button button">
          <span className="button__text">Аккаунт</span>
          <div className="button__icon"></div>
        </div>
      </Link>
    </nav>
  )
}

export default Navigation;