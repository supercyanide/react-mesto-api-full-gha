import React from 'react';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((item) => item._id === currentUser._id);

    function handleClick() {
      onCardClick(card)
    }

    function handleDeleteClick () {
        onCardDelete(card);
    }
      
    function handleLikeClick () {
        onCardLike(card);
    }
  
    return (
        <div className="element">
            <img className="element__image" 
            src={card.link} 
            alt={card.name} 
            onClick={handleClick}
            />
            {isOwn && <button className="element__bin-button" aria-label="Удалить" type="button" onClick={handleDeleteClick}/>}
            <div className="element__place">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__likes-group">
                    <button 
                    className={`element__like-button ${isLiked ? "element__like-button_active":""}`} 
                    type="button" 
                    title="Нравится"
                    onClick={handleLikeClick} 
                    />
                    <span className="element__likes">{card.likes.length}</span>
                </div>
            </div>
        </div>
    )
  }
  
  export default Card;