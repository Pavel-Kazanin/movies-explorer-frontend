function AuthForm(props) {  

  return (
    <form className={`form form-auth form-${props.page}`} onSubmit={props.onSubmit} name="authorization" noValidate>
      <h2 className={`form-auth__title ${props.page}__title`}>{props.title}</h2>
      <div className="form-auth__inputs">{props.children}</div>
      <span className="form-auth__server-error">{props.serverError}</span>
      {props.loggedIn && !props.isEdit ?
        <button className={`${props.page}__submit-button`} onClick={props.allowEdit} type="button">Редактировать</button>
        :
        <input className={`form-auth__submit-button ${!props.isValid && 'form-auth__submit-button_disable'}`} type="submit" value={props.buttonText} disabled={!props.isValid} />
      }      
    </form>
  )
}

export default AuthForm;