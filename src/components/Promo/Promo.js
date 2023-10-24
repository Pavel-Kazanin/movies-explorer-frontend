import landingLogo from "../../images/landing-logo.svg";

function Promo() {    

  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
      <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <img className="promo__logo" src={landingLogo} alt="Логотип страницы"></img>
      <a href="#about-project" className="promo__nav-button">Узнать больше</a>
    </section>
  )
}

export default Promo;