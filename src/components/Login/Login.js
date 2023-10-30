import headerLogo from "../../images/logo.svg";
import AuthForm from "../AuthForm/AuthForm";
import { Link } from 'react-router-dom';

function Login() {    

  return (
    <div className="auth">
      <Link className="auth__logo" to="/"><img className="header__logo-image" alt="Логотип" src={headerLogo} /></Link>
      <AuthForm title="Рады видеть!" buttonText="Войти">        
        <label className="form-auth__label" htmlFor="email-input">E-mail</label>
        <input id="email-input" className="form-auth__text form-auth__text_value_email" defaultValue="" type="email" name="email" required />
        <span className="email-input-error form-auth__text-error"></span>
        <label className="form-auth__label" htmlFor="password-input">Пароль</label>
        <input id="password-input" className="form-auth__text form-auth__text_value_password" defaultValue="" type="password" name="password" required />
        <span className="password-input-error form-auth__text-error">Что-то пошло не так...</span>
      </AuthForm>
      <p className="form-auth__signin-text">Ещё не зарегистрированы? <Link to="/signup" className="form-auth__signin-link">Регистрация</Link></p>
    </div>
  )
}

export default Login;