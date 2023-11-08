import {useState, useCallback } from 'react';

function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(false);  

  const handleChange = (e) => {

    const regex =/^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
    

    const {name, value} = e.target
    setValues({...values, [name]: value }); 

    if (!regex.test(name.value)) {
      setErrors( {email: "некорректный email"});
    } else {
      setErrors('');
    }    
    
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());


    
  };


  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}

export default useFormAndValidation;