import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import * as auth from '../utils/auth.js'

import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';




function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isRegisterStatus, setIsRegisterStatus] = useState(true);

  const [userEmail, setUserEmail] = useState("");

  const [isLoggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const [isInfoTooltip, setIsInfoTooltip] = useState(false);

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen

  useEffect(() => {
    isLoggedIn &&
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch(err => {
          console.log(err);
        })
  }, [isLoggedIn]);
  
  useEffect(() => {
    handleTokenCheck();
  }, [])

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate("/", { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  function handleRegister(formValue) {
    auth.signup(formValue)
      .then(() => {
        setIsRegisterStatus(true);
        navigate('/sign-in', { replace: true });
      }
      )
      .catch((err) => {
        setIsRegisterStatus(false);
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltip(true);
      })
  }

  function handleLogin(email, password) {
    auth.signin(email, password)
      .then(() => {
        setUserEmail(email);
        setLoggedIn(true);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function signOut() {
    localStorage.removeItem('token');

    navigate('/sign-in');
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(!isImagePopupOpen);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setIsInfoTooltip(false)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((err) => {
          console.log(err)
        })
    } else {
      api
        .addLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((err) => {
          console.log(err)
        })
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
        closeAllPopups()
      }
      )
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateUser ({ name, about }) {
    setIsLoading(true);
    api.editUserInfo({name, about})
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser({ name, about, avatar, _id })
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))

  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.editAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/sign-up" element={
          <>
            <Header
              text="Войти"
              linkTo="/sign-in" />
            <Register handleRegister={handleRegister} />
          </>
        } />
        <Route path="/sign-in" element={
          <>
            <Header
              text="Регистрация"
              linkTo="/sign-up" />
            <Login handleLogin={handleLogin} />
          </>
        } />
        <Route path="/" element={
          <>
            <Header
              text="Выйти"
              linkTo="/sign-in"
              email={userEmail}
              onClick={signOut}
              isLoggedIn={isLoggedIn}
            />
            <ProtectedRouteElement element={Main} loggedIn={isLoggedIn}
              cards={cards && cards.data || []}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer />
          </>
        } />

      </Routes>
      <InfoTooltip
        isOpen={isInfoTooltip}
        onClose={closeAllPopups}
        status={isRegisterStatus}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />

      <PopupWithForm
        isOpened=''
        name='confirm'
        title='Вы уверены?'
        text='Да'
        />
    </CurrentUserContext.Provider>
  );
}

export default App;
