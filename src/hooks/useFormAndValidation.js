/*import {useState, useCallback } from 'react';

function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [ isValid, setIsValid ] = useState(false); 
  
  const emailPattern = /^\S+@\S+\.\S+$/;
  const namePattern = /^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\-\s]*$/;*/
  
  /*function validation(iputsValue) {
    let errorsMy = {
      name: '',
      email: '',
      password: ''
    };    
    
    if (iputsValue.email === "") {
      errorsMy.email = "Это поле не может быть пустым";
    }
    if (!/^((^$)|(\w+@\w+\.\w+)$)/.test(iputsValue.email)) {
      errorsMy.email = "Неверный формат электронной почты";
    }  
    if (iputsValue.name === "") {
      errorsMy.name = "Это поле не может быть пустым";
    }
    if (!/^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\-\s]*$/.test(iputsValue.name)) {
      errorsMy.name = "Имя может содержать только латиницу, кириллицу, пробел или дефис";
    }   
    if (iputsValue.password === "") {
      errorsMy.password = "Это поле не может быть пустым";
    } 
  
    return errorsMy;
  }   

  useEffect(() => {     
    setErrors(validation(values));    
  }, [values]);

  const handleChange = (e) => {        

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

export default useFormAndValidation;*/