import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import CardDeletePopup from '../CardDeletePopup/CardDeletePopup';
import ImagePopup from '../ImagePopup/ImagePopup';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { FormValidator } from '../FormValidator/FormValidator';
import { api } from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CardsContext } from '../../contexts/CardsContext';
import { RegistrationDataContext } from '../../contexts/RegistrationDataContext';
import * as auth from '../../utils/Auth.js';

function getUserInfo(setCurrentUser) {
  api.getUserInfo()
  .then((res) => {
    setCurrentUser(res);
  })
  .catch((err) => {
    alert(`${err} Данные пользователя не загружены`);
  })
}

function setUserInfo(user, setCurrentUser, setLoading) {
  setLoading(true);

  api.setUserInfo(user)
  .then((res) => {
    setCurrentUser(res);
  })
  .catch((err) => {
    alert(`${err} Данные пользователя не обновились`);
  })
  .finally(() => {
    setLoading(false);
  });
}

function setUserAvatar(avatar, setCurrentUser, setLoading) {
  setLoading(true);

  api.setAvatar(avatar)
  .then((res) => {
    setCurrentUser(res);
  })
  .catch((err) => {
    alert(`${err} Аватар не обновился`);
  })
  .finally(() => {
    setLoading(false);
  });
}

function getInitialCards(setCards) {
  api.getInitialCards()
  .then((res) => {
    setCards(res);
  })
  .catch((err) => {
    alert(`${err} Карточки не загружены`);
  })
}

// Отправляем запрос в API и получаем обновлённые данные карточки
function changeLikeCardStatus(card, isLiked, setCards) {
  api.changeLikeCardStatus(card._id, !isLiked)
  .then((newCard) => {
    setCards((state) =>
      state.map((c) => c._id === card._id ? newCard : c)
    )
  })
  .catch((err) => {
    alert(`${err} Лайк не изменился`);
  })
}

function deleteCard(card, setCards, setLoading) {
  setLoading(true);

  api.deleteCard(card._id)
  .then(() => {
    setCards((state) =>
      state.filter(c => c._id !== card._id)
    );
  })
  .catch((err) => {
    alert(`${err} Карточка не удалилась`);
  })
  .finally(() => {
    setLoading(false);
  });
}

function setNewCard(newCard, cards, setCards, setLoading) {
  setLoading(true);

  api.setNewCard(newCard)
  .then((res) => {
    setCards([res, ...cards]);
  })
  .catch((err) => {
    alert(`${err} Карточка не создана`);
  })
  .finally(() => {
    setLoading(false);
  });
}

function getEmail(jwt, setLoggedIn, history, setRegistrationData) {
  auth.getEmail(jwt)
    .then((res) => {
    if (res) {
      setLoggedIn(true);
      history.push('/mesto');
      setRegistrationData({email: res.data.email});
    }
  })
  .catch((err) => {
    alert(`${err} Проверка токена не пройдена`);
  })
}

function App() {
  const history = useHistory();

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isCardDeletePopupOpen, setCardDeletePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);  
  const [isLoading, setLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [deletedCard, setDeleteCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [registrationData, setRegistrationData] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLink, setLink] = React.useState(history.location.pathname);
    
  function handleValidation(form) {
    return new FormValidator(form);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setDeleteCard(card);
    setCardDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltipOpen() {
    setInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setCardDeletePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    changeLikeCardStatus(card, isLiked, setCards);
  }

  function handleCardDelete(card) {
    deleteCard(card, setCards, setLoading);
  }

  function handleUpdateUser(user) {
    setUserInfo(user, setCurrentUser, setLoading)
  }

  function handleUpdateAvatar(avatar) {
    setUserAvatar(avatar, setCurrentUser, setLoading)
  }

  function handleAddPlaceSubmit(newCard) {
    setNewCard(newCard, cards, setCards, setLoading);
  }

  function handleLogin(isLogged) {
    setLoggedIn(isLogged);
  }

  function handleLinkChange(link) {
    setLink(link);
  }

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      getEmail(jwt, setLoggedIn, history, setRegistrationData);
    }
  }

  //Закрытие popup по клику по overlay
  function setCloseByOverlayListener(popup) {
    popup.addEventListener('mousedown', (evt) => {
      const targetClasses = evt.target.classList;
      if (targetClasses.contains('popup_opened')) {
        closeAllPopups();
      }
    });
  }

  //Закрытие popup при нажатии на Esc
  function handleCloseByEsc(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    getUserInfo(setCurrentUser);
    getInitialCards(setCards);
    handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <RegistrationDataContext.Provider value={registrationData}>
    <CardsContext.Provider value={cards}>
      <Header loggedIn={loggedIn} handleLogin={handleLogin} Link={isLink} onLinkChange={handleLinkChange} />
        <Switch>
          <ProtectedRoute
            path="/mesto"
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onCardClick={handleCardClick} 
            setCards={setCards} 
            onCardLike={handleCardLike} 
            onCardDeleteClick={handleCardDeleteClick}
            onLinkChange={handleLinkChange}
            component={Main}
          />
          <Route path="/signin">
            <Login 
            handleLogin={handleLogin}
            onLinkChange={handleLinkChange}
             />
          </Route>
          <Route path="/signup">
            <Register
            onClose={closeAllPopups} 
            onCloseByOverlay={setCloseByOverlayListener} 
            onCloseByEsc={handleCloseByEsc} 
            onInfoTooltip={handleInfoTooltipOpen}
            isOpen={isInfoTooltipOpen}
            onLinkChange={handleLinkChange}
            Link={isLink}
            />
          </Route>
          <Route path="/">
            {loggedIn ? (
              <Redirect to="/mesto" />
            ) : (
              <Redirect to="/signin" />
            )}
          </Route>
        </Switch>
      <Footer />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onCloseByOverlay={setCloseByOverlayListener} onCloseByEsc={handleCloseByEsc} onUpdateAvatar={handleUpdateAvatar} onValidation={handleValidation} isLoading={isLoading} />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onCloseByOverlay={setCloseByOverlayListener} onCloseByEsc={handleCloseByEsc} onUpdateUser={handleUpdateUser} onValidation={handleValidation} isLoading={isLoading} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCloseByOverlay={setCloseByOverlayListener} onCloseByEsc={handleCloseByEsc} onAddPlace={handleAddPlaceSubmit} onValidation={handleValidation} isLoading={isLoading} />
      <CardDeletePopup card={deletedCard} isOpen={isCardDeletePopupOpen} onClose={closeAllPopups} onCloseByOverlay={setCloseByOverlayListener} onCloseByEsc={handleCloseByEsc} onCardDelete={handleCardDelete} onValidation={handleValidation} isLoading={isLoading} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} onCloseByOverlay={setCloseByOverlayListener} onCloseByEsc={handleCloseByEsc}/>
      </CardsContext.Provider>
    </RegistrationDataContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;