import { useContext, useEffect, useState } from 'react';
import AuthForm from "../AuthForm/AuthForm";
import useFormValidation from '../../hooks/useForm';
import CurrentUserContext from "../../contexts/CurrentUserContext";


function Profile({ onUpdateUser, loggedIn, onSignOut, serverError, isEdit, setEditState }) {  

  const currentUser = useContext(CurrentUserContext);
   

  let fields = [
    {
        name: 'name',
        valid: /^[a-zA-Zа-яА-Я\s]*$/,
        errors: 'Имя введено неправильно',
        value: currentUser.name
    },
    {
        name: 'email',
        valid: /^$|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
        errors: 'Email введен неправильно',
        value: currentUser.email
    }    
];
  
  const { values, setValues, errors, handleChange, isFormValid } = useFormValidation(fields);  

  function allowEdit() {    
    setEditState(true);
    setValues(currentUser);       
  }
  
  function handleSubmit(e) {   
    e.preventDefault();        
  
    onUpdateUser({
      name: values.name,      
      email: values.email
    });
    
  }

  return (
    <div className="auth auth-profile">
      <AuthForm title={`Привет, ${currentUser.name}!`} buttonText="Сохранить" page="auth-profile" isEdit={isEdit} allowEdit={allowEdit} onSubmit={handleSubmit} loggedIn={loggedIn} isValid={isFormValid} serverError={serverError}>
        <div className="inputs-block">
          <label className="form-auth__label auth-profile__label" htmlFor="name-input">Имя</label>
          <input id="name-input" className="form-auth__text form-auth__text_value_name auth-profile__text" defaultValue={currentUser.name ?? ''} type="text" name="name" minLength="2" maxLength="30" onChange={handleChange} disabled={!isEdit} />
        </div>
        <span className="name-input-error form-auth__text-error">{errors.name}</span>
        <div className="inputs-block">
          <label className="form-auth__label auth-profile__label" htmlFor="email-input">E-mail</label>
          <input id="email-input" className="form-auth__text form-auth__text_value_email auth-profile__text" defaultValue={currentUser.email ?? ''} type="email" name="email" onChange={handleChange} disabled={!isEdit} />
        </div>
        <span className="email-input-error form-auth__text-error">{errors.email}</span>
      </AuthForm>
      {!isEdit &&
      <button className="auth-profile__signout-button"type="button" onClick={onSignOut}>Выйти из аккаунта</button>
      }
    </div>
  )
}

export default Profile;