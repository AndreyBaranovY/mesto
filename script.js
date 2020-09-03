
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

function likeAction (evt) {                   // ф-я  переключения лайков for createCard
  evt.target.classList.toggle('card__like-button_active');
}

function deleteCardAction (evt) {             // ф-я удаления карточки for createCard
  const clickTrash = evt.target;
  const cardToDelete = clickTrash.closest('.card');
   cardToDelete.remove();
}

function seeBigPicAction (evt) {            //ф-я открытия фото попапа for createCard
  const clickedCardImg = evt.target;
  const clickedCard = clickedCardImg.parentElement;
    if (clickedCardImg) {
      const photoImg = document.querySelector('.popup__photo');
      const photoTitle = document.querySelector('.popup__photo-title');
      const clickedCardTitle = clickedCard.querySelector('.card__name');
       photoImg.src = clickedCardImg.src;
       photoImg.alt = " Изображение " + clickedCardTitle.textContent;
       photoTitle.textContent = clickedCardTitle.textContent;
       openPopup(photoPopup);
    }
}

  function createCard (cardName, cardLink) {  // 1)создаёт элемент карточки из шаблона 2)добавляет обработчики событий на дочерние эл-ты входящие в состав карточки
   const cardTemplate = document.querySelector('#card-template').content;
   const cardElement = cardTemplate.cloneNode(true);
   const cardElementImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__name').textContent = cardName;
    cardElementImage.src = cardLink;
    cardElementImage.alt = " Изображение " + cardName;
    cardElementImage.addEventListener('click',seeBigPicAction );                                // слушатель на открытие фото попапа
    cardElement.querySelector('.card__like-button').addEventListener('click',likeAction);       // слушатель на переключение лайков
    cardElement.querySelector('.card__trash-btn').addEventListener('click', deleteCardAction);  // слушатель на удаление карточки
    return cardElement;
  }

  function addCard (cardName, cardLink) {   // добавляет созданный элемент из шаблона в начало списка
    const newCard = createCard(cardName, cardLink);
      cardsSection.prepend(newCard);
  }

  function formSubmitHandler (evt) {  // заносит изменения данных в профиль пользователя
    evt.preventDefault();
      profileName.textContent = profileNameInput.value;
      profileJob.textContent = profileJobInput.value;

    closePopup(editProfilePopup);
  }

  function userAddCards (evt) {  // заносит новые каточки от пользователя
    evt.preventDefault();
    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;
    addCard(cardName, cardLink);
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

                                                 // ОБРАБОТЧИКИ СОБЫТИЙ
editButton.addEventListener('click', function () {  // на октрытие окна окна редактирования профайла
  openPopup(editProfilePopup);
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
    const inputList = Array.from(formElement.querySelectorAll(formObj.inputSelector));  // валидируем введённые данные в рекдакторе
    const buttonElement = formElement.querySelector(formObj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, formObj);
});

closeEditButton.addEventListener('click', function () {  // на закрытие окна редактирования профайла
  closePopup(editProfilePopup);
});

 addButton.addEventListener('click', function () {  // на октрытие окна добавления карточки
  openPopup(addCardPopup);
  formElementCard.reset();  //очищаем ВСЕ поля карты
  const buttonElement = formElementCard.querySelector('.popup__button'); // валидируем кнопку и данные при добавлении карты
  buttonElement.classList.add(formObj.inactiveButtonClass);
  buttonElement.setAttribute('disabled', '');

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
formElementCard.addEventListener('submit', userAddCards);     // сабмит на добавление новой карты от пользователя

initialCards.forEach(cardItem => {       // метод forEach рендерит карточки на экран ( не владываем в ф-ю: срабатывает сразу при загрузке страницы без доп вызовов ф-и)
  addCard(cardItem.name, cardItem.link);
});









