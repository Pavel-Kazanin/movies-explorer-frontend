import landingLogo from "../../images/landing-logo.svg";
import { Link } from 'react-router-dom';

function Promo() {    

  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб&minus;разработки.</h1>
      <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <img className="promo__logo" src={landingLogo} alt="Логотип страницы"></img>
      <Link to="#" className="promo__nav-button">Узнать больше</Link>
    </section>
  )
}

export default Promo;