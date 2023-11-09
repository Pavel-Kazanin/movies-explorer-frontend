function NoResult({serverError}) {    

  return (
    <section className="no-result">
      <p className="no-result__text">{serverError}</p>
    </section>
  )
}

export default NoResult;