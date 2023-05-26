import React from "react";
import { Link } from "react-router-dom";

export default function Form({title, text, loginLink, formValue, handleChange, onSubmit}) {
    return (
        <div className="auth">
            <h2 className="auth__title">{title}</h2>
            <form action="submit" className="auth-form" onSubmit={onSubmit}>
                <input className="auth-form__input" id="email-input" type="email" name="email" placeholder="Email"
                required value={formValue.email} onChange={handleChange}/>
                <input className="auth-form__input" id="password-input" type="password" name="password" placeholder="Пароль"
                required value={formValue.password} onChange={handleChange}/>
                <button className="auth-form__button">{text}</button>
                {loginLink && <Link to="/sign-in" className="auth-form__login">
                    Уже зарегистрированы? Войти
                </Link>}
            </form>
        </div>
    );
}
