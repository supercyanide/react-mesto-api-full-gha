import React from 'react';
import Card from './Card.js';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

export default function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }){
  const { name, about, avatar } = useContext(CurrentUserContext);
    return(
        <main className="content">
          <section className="profile">
            <div className="profile__personal-data">
              <div className="profile__avatar-block">
                <img onClick={onEditAvatar} alt="Аватар" className="profile__avatar" src={avatar}/>
              </div>
              <div className="profile__info">
                <div className="profile__group">
                  <h1 className="profile__name">{name}</h1>
                  <p className="profile__description">{about}</p>
                </div>
                <button type="button" onClick={onEditProfile} className="profile__edit-button" aria-label="Редактировать профиль"></button>
              </div>
            </div>
            <button type="button" onClick={onAddPlace} className="profile__add-button" aria-label="Добавить карточку"></button>
          </section>
          <section className="elements">
          {
            cards.map((card) => (
              <Card
                card={card} 
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))
          }
          </section>
        </main>

    );
}