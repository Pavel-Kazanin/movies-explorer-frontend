import myPhoto from "../../images/my-photo.jpg";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {    

  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__information">
        <div className="information">
          <h3 className="information__name">Виталий</h3>
          <p className="information__career">Фронтенд-разработчик, 30 лет</p>
          <p className="information__myself">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по веб&#8209;разработке, начал заниматься фриланс&#8209;заказами&nbsp;и&nbsp;ушёл с&nbsp;постоянной работы.</p>
          <a className="information__portfolio" href="https://github.com/Pavel-Kazanin" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className="my-photo" src={myPhoto} alt="Фото студента" />               
      </div>
      <Portfolio /> 
    </section>
  )
}

export default AboutMe;