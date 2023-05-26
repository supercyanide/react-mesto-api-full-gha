import React from 'react';
import { useState } from 'react';
import Form from './Form.js';


export default function Register({handleRegister}) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(formValue);
    }

    return (
        <Form
            title="Регистрация"
            text="Зарегистрироваться"
            loginLink={true}
            formValue={formValue}
            handleChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}