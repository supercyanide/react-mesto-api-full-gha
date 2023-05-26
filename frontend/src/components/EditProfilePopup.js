import React from 'react';
import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup ({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName (evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout (evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit (evt) {
    evt.preventDefault();
    onUpdateUser({ name, about: about })
  }

  return (
    <PopupWithForm 
      name={'edit'}
      isOpen={isOpen}
      onClose={onClose}  
      title='Редактировать профиль'
      text={isLoading ? `Сохранение` : `Сохранить`}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input 
          className="popup__input"
          id="input-name"
          type="text"
          name="name"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required
          onChange={handleChangeName}
          value={name || ""}
        />
        <span className="popup__error popup__input-error input-name-error" id="input-name-error"></span>    
      </label>
      <label className="popup__label">
        <input
          className="popup__input"
          id="input-about"
          type="text"
          name="about"
          placeholder="О себе"
          minLength={2}
          maxLength={200}
          required
          onChange={handleChangeAbout}
          value={about || ""}
        />
        <span className="popup__error popup__input-error input-about-error" id="input-about-error"></span>
      </label>
          
    </PopupWithForm>        
  )
}

export default EditProfilePopup;