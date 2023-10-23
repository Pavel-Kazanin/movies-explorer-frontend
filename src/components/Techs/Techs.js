function Techs() {    

  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__about about">
        <h3 className="about__title">7 технологий</h3>
        <p className="about__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <ul className="techs__list list">
        <li className="list__element">HTML</li>
        <li className="list__element">CSS</li>
        <li className="list__element">JS</li>
        <li className="list__element">React</li>
        <li className="list__element">Git</li>
        <li className="list__element">Express.js</li>
        <li className="list__element">mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs;