import headerLogo from "../../images/logo.svg";
import AuthForm from "../AuthForm/AuthForm";
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/useForm';
import { NAME_VALID_ERR, EMAIL_VALID_ERR, PASS_VALID_ERR } from '../../utils/constants';

function Register({ onRegisterUser, serverError, isBlockedForm }) {  
  
  let fields = [
    {
        name: 'name',
        valid: /^[a-zA-Zа-яА-Я\s]*$/,
        errors: NAME_VALID_ERR,
    },
    {
        name: 'email',
        valid: /^$|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
        errors: EMAIL_VALID_ERR,
    },
    {
        name: 'password',
        valid: /^$|^.{5,}$/,
        errors: PASS_VALID_ERR,
    },
];  
  
  const { values, errors, handleChange, isFormValid } = useFormValidation(fields);    

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterUser(values.password, values.email, values.name);
  }

  return (
    <div className="auth">
      <Link className="auth__logo" to="/"><img className="auth__logo-image" alt="Логотип" src={headerLogo} /></Link>
      <AuthForm title="Добро пожаловать!" buttonText="Зарегистрироваться" isBlockedForm={isBlockedForm} onSubmit={handleSubmit} serverError={serverError} isValid={isFormValid}>
        <label className="form-auth__label" htmlFor="name-input">Имя</label>
        <input id="name-input" className="form-auth__text form-auth__text_value_name" defaultValue={values.name} type="text" name="name" minLength="2" maxLength="30" required onChange={handleChange} disabled={isBlockedForm} />
        <span className="name-input-error form-auth__text-error">{errors.name}</span>
        <label className="form-auth__label" htmlFor="email-input">E-mail</label>
        <input id="email-input" className="form-auth__text form-auth__text_value_email" defaultValue={values.email} type="email" name="email" required onChange={handleChange} disabled={isBlockedForm} />
        <span className="email-input-error form-auth__text-error">{errors.email}</span>
        <label className="form-auth__label" htmlFor="password-input">Пароль</label>
        <input id="password-input" className="form-auth__text form-auth__text_value_password" defaultValue={values.password} type="password" name="password" required onChange={handleChange} disabled={isBlockedForm} />
        <span className="password-input-error form-auth__text-error">{errors.password}</span>
      </AuthForm>
      <p className="auth__signin-text">Уже зарегистрированны? <Link to="/signin" className="auth__signin-link">Войти</Link></p>
    </div>
  )
}

export default Register;