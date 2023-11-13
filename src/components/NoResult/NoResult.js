import { NO_RESULT } from "../../utils/constants";

function NoResult({serverError}) {    

  return (
    <section className="no-result">
      <p className="no-result__text">{serverError ? serverError : NO_RESULT}</p>
    </section>
  )
}

export default NoResult;