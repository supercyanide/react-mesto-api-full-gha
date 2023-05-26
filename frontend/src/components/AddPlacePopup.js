import React from 'react';
import { useState, useEffect } from 'react';

import PopupWithForm from './PopupWithForm.js';

export default function AddPlacePopup ({ isOpen, onClose, onAddPlace, isLoading}) {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }
  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name='add'
      title='Новое место'
      text={isLoading ? `Создание` : `Создать`}
    >        
      <label className="popup__label">
        <input 
        type="text" 
        name="title" 
        id="input-title" 
        className="popup__input" 
        placeholder="Название"
        value={placeName}
        onChange={handleChangePlaceName}
        minLength={2} 
        maxLength={30} 
        />
        <span className="popup__error popup__input-error input-title-error" id="input-title-error"></span>
      </label>
      <label className="popup__label">
        <input 
        type="url" 
        name="link" 
        id="input-link" 
        className="popup__input" 
        placeholder="Ссылка на картинку"
        value={placeLink}
        onChange={handleChangePlaceLink}
        />
        <span className="popup__error popup__input-error input-link-error" id="input-link-error"></span>
      </label>
    </PopupWithForm>  
  )
}
