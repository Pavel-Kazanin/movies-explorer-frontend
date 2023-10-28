import { Link } from 'react-router-dom';

function NotFound() {    

  return (
    <article className="not-found">
      <p className="not-found__status">404</p>
      <p className="not-found__message">Страница не найдена</p>
      <Link to="/" className="not-found__back">Назад</Link>
    </article>
  )
}

export default NotFound;