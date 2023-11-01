import {useState} from 'react';
import AuthForm from "../AuthForm/AuthForm";
import useFormAndValidation from '../../hooks/useFormAndValidation';


function Profile({ isEdit, allowEdit, currentUser, onUpdateUser, loggedIn }) {  

  const {values, handleChange, errors, isValid } = useFormAndValidation();
  const [isDisableButton, setDisableButton]= useState(false);
    
  function handleSubmit(e) {    
    e.preventDefault();    
  
    onUpdateUser({
      name: values.name,      
      email: values.email
    });
  }

  return (
    <div className="auth auth-profile">
      <AuthForm title="Привет, Виталий!" buttonText="Сохранить" page="auth-profile" isEdit={isEdit} allowEdit={allowEdit} handleSubmit={handleSubmit} loggedIn={loggedIn} isDisableButton={isDisableButton} isValid={isValid} setDisableButton={setDisableButton}>
        <div className="inputs-block">
          <label className="form-auth__label auth-profile__label" htmlFor="name-input">Имя</label>
          <input id="name-input" className="form-auth__text form-auth__text_value_name auth-profile__text" defaultValue={currentUser.name ?? ''} type="text" name="name" minLength="2" maxLength="30" onChange={handleChange} required disabled={!isEdit} />
        </div>
        <span className="name-input-error form-auth__text-error">{errors.name}</span>
        <div className="inputs-block">
          <label className="form-auth__label auth-profile__label" htmlFor="email-input">E-mail</label>
          <input id="email-input" className="form-auth__text form-auth__text_value_email auth-profile__text" defaultValue={currentUser.email ?? ''} type="email" name="email" required onChange={handleChange} disabled={!isEdit} />
        </div>
        <span className="email-input-error form-auth__text-error">{errors.email}</span>
      </AuthForm>
      {!isEdit &&
      <button className="auth-profile__signout-button">Выйти из аккаунта</button>
      }
    </div>
  )
}

export default Profile;