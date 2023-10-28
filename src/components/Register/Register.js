import headerLogo from "../../images/logo.svg";
import AuthForm from "../AuthForm/AuthForm";
import { Link } from 'react-router-dom';

function Register() {    

  return (
    <div className="auth">
      <Link className="header__logo" to="/"><img className="header__logo-image" alt="Логотип" src={headerLogo} /></Link>
      <AuthForm title="Добро Пожаловать!" buttonText="Зарегистрироваться">
        <label className="form-auth__label" htmlFor="name-input">Имя</label>
        <input id="name-input" className="form-auth__text form-auth__text_value_name" defaultValue="" type="text" name="name" minLength="2" maxLength="30" required />
        <span className="name-input-error form-auth__text-error"></span>
        <label className="form-auth__label" htmlFor="email-input">E-mail</label>
        <input id="email-input" className="form-auth__text form-auth__text_value_email" defaultValue="" type="email" name="email" required />
        <span className="email-input-error form-auth__text-error"></span>
        <label className="form-auth__label" htmlFor="password-input">Пароль</label>
        <input id="password-input" className="form-auth__text form-auth__text_value_password" defaultValue="" type="password" name="password" required />
        <span className="password-input-error form-auth__text-error"></span>
      </AuthForm>
      <p className="form-auth__signin-text">Уже зарегистрированны? <Link to="/signin" className="form-auth__signin-link">Войти</Link></p>
    </div>
  )
}

export default Register;