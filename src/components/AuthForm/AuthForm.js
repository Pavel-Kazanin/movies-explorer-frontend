function AuthForm(props) {

  function allowEdit() {
    props.allowEdit();
  }

  return (
    <form className="form form-auth" onSubmit={props.handleSubmit} name="authorization" noValidate>
      <h2 className={`form-auth__title ${props.page}__title`}>{props.title}</h2>
      <div className="form-auth__inputs">{props.children}</div>
      {props.isEdit ?
        <input className="form-auth__submit-button" type="submit" value={props.buttonText} />
        :
        <button className="auth-profile__submit-button" onClick={allowEdit}>Редактировать</button>        
      }
    </form>
  )
}

export default AuthForm;