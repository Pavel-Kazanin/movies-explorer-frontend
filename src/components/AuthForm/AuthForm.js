function AuthForm(props) {

  return (
    <form className={`form form-auth form-${props.page}`} onSubmit={props.handleSubmit} name="authorization" noValidate>
      <h2 className={`form-auth__title ${props.page}__title`}>{props.title}</h2>
      <div className="form-auth__inputs">{props.children}</div>
      {props.loggedIn && !props.isEdit ?
        <button className="auth-profile__submit-button" onClick={props.allowEdit} type="button">Редактировать</button>
        :
        <input className={`form-auth__submit-button ${props.isDisableButton && 'form-auth__submit-button_disable'}`} type="submit" value={props.buttonText} disabled={props.isDisableButton} />
      }      
    </form>
  )
}

export default AuthForm;