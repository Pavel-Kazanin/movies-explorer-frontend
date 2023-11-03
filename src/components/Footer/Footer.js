function Footer() {    

  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__information information">
        <p className="information__date">© {new Date().getFullYear()}</p>
        <ul className="information__contacts contacts">
          <li className="contacts__element"><a className="contacts__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
          <li className="contacts__element"><a className="contacts__link" href="https://github.com/topics/yandex-praktikum" target="_blank" rel="noreferrer">Github</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;