import headerLogo from "../../images/logo.svg";
import AuthForm from "../AuthForm/AuthForm";
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/useForm';

function Login({ onAuthSubmit, serverError }) {  

  let fields = [    
    {
        name: 'email',
        valid: /^$|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
        errors: 'Email введен неправильно',
    },
    {
        name: 'password',
        valid: /^$|^.{5,}$/,
        errors: 'Пароль введен неправильно',
    },
];
  
  const { values, errors, handleChange, isFormValid } = useFormValidation(fields); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthSubmit(values.password, values.email);                
  }

  return (
    <div className="auth">
      <Link className="auth__logo" to="/"><img className="auth__logo-image" alt="Логотип" src={headerLogo} /></Link>
      <AuthForm title="Рады видеть!" buttonText="Войти" onSubmit={handleSubmit} isValid={isFormValid} serverError={serverError}>        
        <label className="form-auth__label" htmlFor="email-input">E-mail</label>
        <input id="email-input" className="form-auth__text form-auth__text_value_email" defaultValue={values.email} type="email" name="email" required onChange={handleChange} />
        <span className="email-input-error form-auth__text-error">{errors.email}</span>
        <label className="form-auth__label" htmlFor="password-input">Пароль</label>
        <input id="password-input" className="form-auth__text form-auth__text_value_password" defaultValue={values.password} type="password" name="password" minLength="2" required onChange={handleChange} />
        <span className="password-input-error form-auth__text-error">{errors.password}</span>
      </AuthForm>
      <p className="auth__signin-text">Ещё не зарегистрированы? <Link to="/signup" className="auth__signin-link">Регистрация</Link></p>
    </div>
  )
}

export default Login;