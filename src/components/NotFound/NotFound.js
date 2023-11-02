import { useNavigate } from "react-router";

function NotFound() { 
  
  const navigate = useNavigate();

  return (
    <article className="not-found">
      <p className="not-found__status">404</p>
      <p className="not-found__message">Страница не найдена</p>
      <button onClick={() => navigate(-1)} className="not-found__go-back" type="button">Назад</button>
    </article>
  )
}

export default NotFound;