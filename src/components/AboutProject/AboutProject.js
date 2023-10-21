function AboutProject() {    

  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__description">
        <div className="description">
          <h3 className="description__title">Дипломный проект включал 5 этапов</h3>
          <p className="description__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="description">
          <h3 className="description__title">На выполнение диплома ушло 5 недель</h3>
          <p className="description__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__duration duration">
        <div className="duration__backend duration__text">1 неделя</div>
        <div className="duration__frontend duration__text">4 недели</div>
        <span className="duration__caption">Back-end</span>
        <span className="duration__caption">Front-end</span>
      </div>
    </section>
  )
}

export default AboutProject;