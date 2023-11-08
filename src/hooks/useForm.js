import { useState } from 'react';

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false); 
  
  function validation(values) {
    let errorsMy = {
      name: '',
      email: ''
    };
  
    const emailPattern = /^\S+@\S+\.\S+$/;
    const namePattern = /^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\-\s]*$/;
  
    if (values.name === "") {
      errorsMy.name = "Not be empty";
    }
    if (!namePattern.test(values.name)) {
      errorsMy.name = "Incorrect format name";
    }
    if (!emailPattern.test(values.email)) {
      errorsMy.email = "Incorrect format";
    }
    if (values.email === "") {
      errorsMy.email = "Not be empty";
    }
  
  
    return errorsMy;
  }
  
  const handleChange = (event) => {
    console.log("123");
     
    const {value, name} = event.target;
    setValues({...values, [name]: value}); 
    setErrors(validation(values));
        
  };

  return {values, handleChange, setValues, errors, setErrors, isValid, setIsValid };
}

export default useForm;