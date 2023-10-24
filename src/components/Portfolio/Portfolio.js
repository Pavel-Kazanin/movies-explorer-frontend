function Portfolio() {    

  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list list">
        <li className="list__item">
          <a className="list__link link" href="https://pavel-kazanin.github.io/russian-travel/" target="_blank" rel="noreferrer">Статичный сайт<span className="link__icon">↗</span></a>
        </li>
        <li className="list__item">
          <a className="list__link" href="https://pavel-kazanin.github.io/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт<span className="link__icon">↗</span></a>
        </li>
        <li className="list__item">
          <a className="list__link" href="https://pavelkazaninmesto.nomoredomainsicu.ru" target="_blank" rel="noreferrer">Одностраничное приложение<span className="link__icon">↗</span></a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;