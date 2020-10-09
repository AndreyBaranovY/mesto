import './index.css';

import {initialCards, formObj } from '../components/dataFile.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

 const cardsSection = document.querySelector('.cards-section');
 const editButton = document.querySelector('.profile__edit-button');
 const formElementProfile = document.querySelector('.popup__form-profile');
 const profileNameInput = formElementProfile.querySelector('.popup__input_type_name');
 const profileJobInput = formElementProfile.querySelector('.popup__input_type_job');
 const addButton = document.querySelector('.profile__add-button');
 const formElementCard = document.querySelector('.popup__form-card');


function newCard(obj) {
  const card = new Card(obj, ".card-template", (link, name) => {
    popupWithImage.open(link, name);
    });
  const cardElement = card.generateCard();
  defaultSection.addItem(cardElement);
}

const defaultSection = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      newCard(item);
    },
  },
  cardsSection
);
const profilePopup = new PopupWithForm(".popup-profile", (obj) => {
  userinfo.setUserInfo(obj);
});
const userinfo = new UserInfo({
  userName: '.profile__name',
  userJob: '.profile__job',
});
const cardPopup = new PopupWithForm(".popup-card", (obj) => {
      newCard(obj);
});
const popupWithImage = new PopupWithImage(".popup-photo");
const editFormProfile = new FormValidator(formObj, formElementProfile); // создаём объекты и запускаем валидацию форм
const editFormCard = new FormValidator(formObj, formElementCard);
editFormProfile.enableValidation();
editFormCard.enableValidation();

cardPopup.setEventListeners();
profilePopup.setEventListeners();
defaultSection.renderItems();
editButton.addEventListener("click", () => {
      profilePopup.open();
      editFormProfile.clearInputErrors();

      profileNameInput.value = userinfo.getUserInfo().userName;
      profileJobInput.value = userinfo.getUserInfo().userJob;
    });
addButton.addEventListener('click', () => {
  cardPopup.open();
  editFormCard.clearInputErrors();
  editFormCard.validate();
});




