export default function ImagePopup({ card, isOpen, onClose }) {
    return (
      <div className={`popup popup-img popup_type_image ${isOpen ? 'popup_opened' : ''}`} id='popup-img'>
        <div className='popup__img-container'>
          <button className='popup__close-button' id='popup-img-close' onClick={onClose}></button>
          <img className='popup__img' src={card.link} alt={card.name}/>
          <h2 className='popup__img-caption'>{card.name}</h2>
        </div>
      </div>
    )
}