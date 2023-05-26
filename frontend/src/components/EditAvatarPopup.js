import React from 'react';
import { useRef } from 'react';

import PopupWithForm from './PopupWithForm.js';

export default function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();
  
  function handleSubmit (e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='avatar'
      title='Обновить аватар'
      text={isLoading ? `Сохранение` : `Сохранить`}
      onSubmit={handleSubmit}
    >
      <input 
        className="popup__input" 
        type="url" 
        id="input-avatar-link" 
        name="avatar" 
        placeholder="Ссылка на картинку" 
        required
        ref={avatarRef}
      />
      <span className="popup__error popup__input-error input-avatar-link-error"></span>
    </PopupWithForm>  
  )
}
