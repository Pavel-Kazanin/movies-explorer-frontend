import { useState, useEffect} from 'react';

const useFormValidation = (fields) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [required, setRequired] = useState([])
    const [isFormValid, setIsFormValid] = useState(false);   
    
    useEffect(() => {
        if (fields[0].value) {
            setValues({name: fields[0].value, email: fields[1].value})
        }
    }, []);
    
    useEffect(() => {
        if (!fields[0].value) {
            setIsFormValid((Object.keys(errors).length === 0) && (required.length === fields.length));
        } else {
            setIsFormValid((Object.keys(errors).length === 0)  && ((values['name'] !== fields[0].value) || (values['email'] !== fields[1].value)));
        }
    }, [errors, values]);    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues((prevData) => ({...prevData, [name]: value}));
        validateField(name, value)
    };

    const validateField = (name, value) => {
        const field = fields.find((f) => f.name === name);
        if (!required.some((el) => el === field.name)) {
            setRequired((prev) => [...prev, field.name])
        }
        if (field && field.valid && !field.valid.test(value)) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: field.errors }));
        } else {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
        if (field && required.some((el) => el === field.name) && value === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: 'Поле не может быть пустым',
            }));
        }
    };

    return { values, setValues, errors, handleChange, isFormValid, setIsFormValid };
};

export default useFormValidation;