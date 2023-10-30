import {useEffect} from 'react';
import AuthForm from "../AuthForm/AuthForm";
import useForm from "../../hooks/useForm";


function Profile({ isEdit, allowEdit, currentUser, onUpdateUser }) {  

  const formInputs = useForm({});
  const user = currentUser;

  useEffect(() => {
    formInputs.setValues({name: currentUser.name, about: currentUser.about});    
  }, [user]); 
  
  function handleSubmit(e) {    
    e.preventDefault();
    console.log("click")
  
    onUpdateUser({
      name: formInputs.values.name,      
      email: formInputs.values.email
    });
  }

  return (
    <div className="auth auth-profile">
      <AuthForm title="Привет, Виталий!" buttonText="Сохранить" page="auth-profile" isEdit={isEdit} allowEdit={allowEdit} handleSubmit={handleSubmit}>
        <div className="inputs-block">
          <label className="form-auth__label auth-profile__label" htmlFor="name-input">Имя</label>
          <input id="name-input" className="form-auth__text form-auth__text_value_name auth-profile__text" defaultValue={currentUser.name ?? ''} type="text" name="name" minLength="2" maxLength="30" onChange={formInputs.handleChange} required disabled={!isEdit} />
        </div>
        <span className="name-input-error form-auth__text-error"></span>
        <div className="inputs-block">
          <label className="form-auth__label auth-profile__label" htmlFor="email-input">E-mail</label>
          <input id="email-input" className="form-auth__text form-auth__text_value_email auth-profile__text" defaultValue={currentUser.email ?? ''} type="email" name="email" required onChange={formInputs.handleChange} disabled={!isEdit} />
        </div>
        <span className="email-input-error form-auth__text-error"></span>
      </AuthForm>
      {!isEdit &&
      <button className="auth-profile__signout-button">Выйти из аккаунта</button>
      }
    </div>
  )
}

export default Profile;