import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setSelectedCard(null)
  }
  function handleCardClick(value) {
    setSelectedCard(value)
  }


  return (
    <div className="page">
      <div className="content">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
        <Footer />
      </div>
     <ImagePopup card={selectedCard} onClose={closeAllPopups}> </ImagePopup>

      <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} button="Сохранить">
        <input type="url" name="link" placeholder="Введите адрес ссылки." className="popup__input popup__input_type_link" id="popup__input-avatar-link" required />
        <span className=" " id="url-avatar-input-error"></span>
      </PopupWithForm>

      <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} button="Сохранить">
        <input
          type="text"
          name="userName"
          className="popup__input popup__input_type_name"
          id="name-input"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className=" " id="name-input-error">Вы пропустили это поле</span>
        <input
          type="text"
          name="userJob"
          className="popup__input popup__input_type_job"
          id="popup__input-title" required minLength="2"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="" id="job-input-error">Вы пропустили это поле</span>
      </PopupWithForm>

      <PopupWithForm name="cards" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} button="Создать">
        <input
          type="text"
          name="name"
          className="popup__input popup__input_type_card-name"
          id="place-input"
          placeholder="Название"
          minLength="1"
          maxLength="30"
          required />
        <span className=" " id="popup__input-card-name-error"></span>
        <input id="url-input" type="url"  placeholder="Введите адрес сайта." name="link" className="popup__input popup__input_type_link"  required />
        <span className=" " id="url-input-error">Не ссылка</span>
      </PopupWithForm>

      <PopupWithForm name="popup-delete-card" title="Вы уверены?" isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} button="Удалить"></PopupWithForm>
</div>
  );
}

export default App;
