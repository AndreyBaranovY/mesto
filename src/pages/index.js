import './index.css';
import{ Api } from '../components/Api.js';
import {formObj } from '../components/dataFile.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import { PopupDeleteCard } from "../components/PopupDeleteCard.js";


const api = new Api({
  srcUrl: "https://mesto.nomoreparties.co/v1/cohort-16",
  headers: {
    authorization: "ad56f72d-8a85-4e1a-b4c5-5c53a036b975",
    "Content-Type": "application/json",
  },
});


 const cardsSection = document.querySelector('.cards-section');
 const editButton = document.querySelector('.profile__edit-button');
 const formElementProfile = document.querySelector('.popup__form-profile');
 const profileNameInput = formElementProfile.querySelector('.popup__input_type_name');
 const profileJobInput = formElementProfile.querySelector('.popup__input_type_job');
 const addButton = document.querySelector('.profile__add-button');
 const formElementCard = document.querySelector('.popup__form-card');
 const formElementAvatar = document.querySelector('.form-avatar');
 const editAvatarButton = document.querySelector('.profile__avatar');
 const myAvatar = document.querySelector('.profile__avatar');
 let defaultSection = {};
 let myId = '';
const deleteSubmitButton = document.querySelector('.popup-delete-card').querySelector('.popup__button');
const newCardSubmitButton = document.querySelector('.popup-card').querySelector('.popup__button');
const profileSubmitButton = document.querySelector('.popup-profile').querySelector('.popup__button');
const updateAvatarSubmitButton = document.querySelector('.popup-avatar').querySelector('.popup__button');


  Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
  ])
  .then(([data, initialCards,]) => {
    defaultSection = new Section(
      {
        data: initialCards.reverse(),
        renderer: newCard,
      },
      cardsSection
      );
      defaultSection.renderItems();
      myId = data._id;
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        avatar: data.avatar,
        id: data._id,
     });
      myAvatar.style.background = `url('${data.avatar}') 0 0 / 100% 100% no-repeat`;
  })
  .catch(error => console.log(error));


 function newCard(obj) {
  const card = new Card(
    {
      data: obj,
      handleCardClick: () => {
        popupWithImage.open(obj.link, obj.name);
      },
      handleLikeClick: () => {
        if (
          !cardElement
            .querySelector('.card__like-button')
            .classList.contains('card__like-button_active')
        ) {
          api.likeCard(obj._id)
          .then((data) => {
            cardElement.querySelector('.card__counter').textContent =
              data.likes.length;
            })
            .catch((res) => {
              console.log(res);
          });
          cardElement
            .querySelector('.card__like-button')
            .classList.add('card__like-button_active');
        } else {
          api.unLikeCard(obj._id)
          .then((data) => {
            cardElement.querySelector('.card__counter').textContent =
              data.likes.length;
            })
            .catch((res) => {
              console.log(res);
          });
          cardElement
            .querySelector('.card__like-button')
            .classList.remove('card__like-button_active');
        }
      },
      handleDeleteIconClick: () => {
        deletePopup.id = obj._id;
        deletePopup.cardElement = cardElement;
        document
        .querySelector(".popup-delete-card")
        .querySelector(".popup__button").textContent = "Да";
        deletePopup.open();
      },
    },
   '.card-template'
  );

  const cardElement = card.generateCard();
    if (obj.owner._id != myId) {
       cardElement.querySelector('.card__trash-btn').remove();
    }

    if (obj.likes.find((item) => item._id === myId)) {
      cardElement
        .querySelector('.card__like-button')
        .classList.add('card__like-button_active');
    }
  defaultSection.addItem(cardElement);
  cardElement.querySelector('.card__counter').textContent = obj.likes.length;

}


const deletePopup = new PopupDeleteCard(".popup-delete-card", () => {  // попап удаления карточки
  deleteSubmitButton.textContent = "Удаление...";
  api
    .deleteCard(deletePopup.id)
    .then(() => {
      deletePopup.close();
      deletePopup.cardElement.remove();
      deletePopup.cardElement = null;
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      deleteSubmitButton.textContent = "Да";
    });
});

const popupWithImage = new PopupWithImage(".popup-photo");

const cardPopup = new PopupWithForm(".popup-card", (obj) => {  // попап добавления новой карточки
  newCardSubmitButton.textContent = "Сохранение...";
  api
    .addNewCard(obj)
    .then((obj) => {
      newCard(obj);
      cardPopup.close();
    })
    .catch((res) => {
      console.log(res);
   })
    .finally(() => {
        newCardSubmitButton.textContent = "Создать";
    });
});

const userInfo = new UserInfo({
  userName: '.profile__name',
  userJob: '.profile__job',
  userAvatar: '.profile__avatar',
});

const profilePopup = new PopupWithForm(".popup-profile", (obj) => {  // попап ред. профиля
  profileSubmitButton.textContent = "Сохранение...";
  console.log(obj);
    api
    .updateUserInfo(obj)
    .then((obj) => {
      userInfo.setUserInfo({
        name: obj.name,
        job: obj.about,
      });
      profilePopup.close();
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      profileSubmitButton.textContent = "Сохранить";
    });
});

const avatarPopup = new PopupWithForm(".popup-avatar", (obj) => {   // попап ред. аватара
  updateAvatarSubmitButton.textContent = "Сохранение...";
api
  .updateAvatar(obj.link)
  .then(() => {
    myAvatar.style.background = `url('${obj.link}') 0 0 / 100% 100% no-repeat`;
    myAvatar.style.backgroundSize = "fit";
    // avatarPopup.close();
  })
  .catch((res) => {
    console.log(res);
  })
  .finally(() => {
    avatarPopup.close();
    updateAvatarSubmitButton.textContent = "Сохранить";
  });
  myAvatar.style.background = `url('${obj.link}') 0 0 / 100% 100% no-repeat`;
  myAvatar.style.backgroundSize = "fit";
});

// - СЛУШАТЕЛИ попапов - //
cardPopup.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();
deletePopup.setEventListeners();
popupWithImage.setEventListeners();

// - ВАЛИДАЦИЯ - //
const editFormProfile = new FormValidator(formObj, formElementProfile);
const editFormCard = new FormValidator(formObj, formElementCard);
const editFormAvatar = new FormValidator(formObj, formElementAvatar);
editFormProfile.enableValidation();
editFormCard.enableValidation();
editFormAvatar.enableValidation();

 //-- СЛУШАТЕЛИ  кнопок --//
editButton.addEventListener("click", () => {
  const actualUserProfile = userInfo.getUserInfo();
  profileNameInput.value = actualUserProfile.userName;
  profileJobInput.value = actualUserProfile.userJob;
  editFormProfile.clearInputErrors();
  profilePopup.open();
  editFormProfile.validate();
});
addButton.addEventListener('click', () => {
  editFormCard.clearInputErrors();
  cardPopup.open();
  editFormCard.validate();

});
editAvatarButton.addEventListener("click", () => {
  updateAvatarSubmitButton.textContent = 'Сохранить';
  editFormAvatar.clearInputErrors();
  avatarPopup.open();
  editFormAvatar.validate();
});






