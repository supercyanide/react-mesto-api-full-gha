import React from 'react';
import { useState } from 'react';
import Form from './Form.js';

export default function Login({ handleLogin }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
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
        if (!formValue.email || !formValue.password) {
            return;
        }
        handleLogin(formValue.email, formValue.password)
    }

    return (
        <Form
            title="Вход"
            text="Войти"
            loginLink={false}
            formValue={formValue}
            handleChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}