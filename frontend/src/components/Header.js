import React from 'react';
import { Link } from 'react-router-dom';
import logoPath from '../../src/images/header-logo.svg';

export default function Header({text, email, linkTo, onClick, isLoggedIn}) {
    
    return (
        <header className="header">
            <img className="header__logo" src={logoPath} alt="Место"/>
            <div className="header__info">
                <p className="header__email">{email}</p>
                <Link to={linkTo} className={`header__button ${isLoggedIn ? 'header__button_exit' : ''}`} onClick={onClick}>
                    {text} 
                </Link>
            </div>
        </header>
    )
}
