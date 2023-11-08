import {useState, useCallback, useEffect } from 'react';

function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(false); 
  
  const emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const namePattern = /^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\-\s]*$/;
  
  function validation(values) {
    let errorsMy = {
      name: '',
      email: '',
      password: ''
    };    
  
    if (values.name === "") {
      errorsMy.name = "Это поле не может быть пустым";
    }
    if (!namePattern.test(values.name)) {
      errorsMy.name = "Имя может содержать только латиницу, кириллицу, пробел или дефис";
    }
    if (!emailPattern.test(values.email)) {
      errorsMy.email = "Неверный формат электронной почты";
    }
    if (values.email === "") {
      errorsMy.email = "Это поле не может быть пустым";
    }
    if (values.password === "") {
      errorsMy.password = "Это поле не может быть пустым";
    } 
  
    return errorsMy;
  }

  useEffect(() => {
    console.log(errors); 
    setErrors(validation(values));
    console.log(errors);     
  }, [values]);

  const handleChange = (e) => { 
    
    console.log(errors);    

    const {name, value} = e.target;
    setValues({...values, [name]: value });     
    
    setIsValid(e.target.closest('form').checkValidity());   
    
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, setErrors, isValid, resetForm, setValues, setIsValid };
}

export default useFormAndValidation;