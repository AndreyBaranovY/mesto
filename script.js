import Card from './Card.js'
import FormValidator from './FormValidator.js'

const overlay = document.querySelector('.page');
const cardsSection = document.querySelector('.cards-section');
const editButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup-profile');
const formElementProfile = document.querySelector('.popup__form-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileNameInput = formElementProfile.querySelector('.popup__input_type_name');
const profileJobInput = formElementProfile.querySelector('.popup__input_type_job');
const closeEditButton = editProfilePopup.querySelector('.popup__edit-btn');

const addButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup-card');
const formElementCard = document.querySelector('.popup__form-card');
const cardNameInput = formElementCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = formElementCard.querySelector('.popup__input_type_link');
const closeAddButton = document.querySelector('.popup__add-btn');

const photoPopup = document.querySelector('.popup-photo');
const closePhotoButton = document.querySelector('.popup__photo-btn');
const formObj = {                            // параметры ф-и валидации
  formSelector: `.popup__form`,
  inputSelector: `.popup__input`,
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
// ---------------ФУНКЦИИ------------------------ //
function formSubmitHandler (evt) {  // вносит изменения данных в профиль пользователя
  evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileJob.textContent = profileJobInput.value;
  closePopup(editProfilePopup);
}

  function userAddCards (evt) {  // добавляет новые каточки от пользователя
    evt.preventDefault();
    const userData = {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    };
    const userCard = new Card(userData, '.card-template');
    const cardElement = userCard.generateCard();
    cardsSection.prepend(cardElement);
    closePopup(addCardPopup);
}

function openPopup (popupElement) {         // открывает попапы
  popupElement.classList.add('popup_opened');
  overlay.addEventListener('keydown', keyHandler );  // добавляем слушатель на закрытие любого попапа кнопкой Esc
}
function closePopup (popupElement) {        // закрывает попапы
  overlay.removeEventListener('keyup', keyHandler);  // снимаем слушателя с кнопки Esc
  popupElement.classList.remove('popup_opened');
}
function keyHandler (evt) {        // реализует закрытие попапов кнопкой Esc
  if(evt.key === 'Escape') {
    const popupElement = evt.currentTarget.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}
  // ------ ОБРАБОТЧИКИ СОБЫТИЙ ------------ //
editButton.addEventListener('click', function () {  // на октрытие окна окна редактирования профайла
  openPopup(editProfilePopup);
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
});

closeEditButton.addEventListener('click', function () {  // на закрытие окна редактирования профайла
  closePopup(editProfilePopup);
});

 addButton.addEventListener('click', function () {  // на октрытие окна добавления карточки
  openPopup(addCardPopup);
  formElementCard.reset();  //очищаем ВСЕ поля карты
});

closeAddButton.addEventListener('click', function () {  // на закрытие окна добавления карточки
  closePopup(addCardPopup);
});

closePhotoButton.addEventListener('click', function () {  // на закрытие окна фото
  closePopup(photoPopup);
});

overlay.addEventListener('click', function (evt) {  // на закрытие любого попапа кликом
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
});

formElementProfile.addEventListener('submit', formSubmitHandler);  // сабмит на изменения в профайле пользвателя
formElementCard.addEventListener('submit', userAddCards);   // сабмит на добавление новой карты от пользователя

initialCards.forEach((item) => {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();
  cardsSection.prepend(cardElement);
});

const editFormProfile = new FormValidator(formObj, formElementProfile); // создаём объекты и запускаем валидацию форм
const editFormCard = new FormValidator(formObj, formElementCard);
editFormCard.enableValidation();
editFormProfile.enableValidation();







