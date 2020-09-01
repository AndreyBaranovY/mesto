const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const overlay = document.querySelector('.page');
const cards = document.querySelector('.cards');
const editButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup-profile');
const formElementProfile = document.querySelector('.popup__form-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_job');
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
       photoTitle.textContent = clickedCardTitle.textContent;
       openPopup(photoPopup);
    }
}

  function createCard (cardName, cardLink) {  // 1)создаёт элемент карточки из шаблона 2)добавляет обработчики событий на дочерние эл-ты входящие в состав карточки
   const cardTemplate = document.querySelector('#card-template').content;
   const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__name').textContent = cardName;
    cardElement.querySelector('.card__image').src = cardLink;

    cardElement.querySelector('.card__like-button').addEventListener('click',likeAction);       // слушатель на переключение лайков
    cardElement.querySelector('.card__trash-btn').addEventListener('click', deleteCardAction);  // слушатель на удаление карточки
    cardElement.querySelector('.card__image').addEventListener('click',seeBigPicAction );      // слушатель на открытие фото попапа
   return cardElement;
  }

  function addCard (cardName, cardLink) {   // добавляет созданный элемент из шаблона в начало списка
    const newCard = createCard(cardName, cardLink);
      cards.prepend(newCard);
  }

  function renderCards () {                // рендерит каточки на экран
    initialCards.forEach(cardItem => {
      addCard(cardItem.name, cardItem.link);
    });
  }


  function formSubmitHandler (evt) {  // заносит изменения данных в профиль пользователя
    evt.preventDefault();
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
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
}
function closePopup (popupElement) {        // закрывает попапы
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
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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
  if(event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
});

overlay.addEventListener('keydown', keyHandler );  // на закрытие любого попапа кнопкой Esc
overlay.removeEventListener('keyup', keyHandler);  // снимаем слушателя с кнопки Esc



formElementProfile.addEventListener('submit', formSubmitHandler);  // сабмит на изменения в профайл пользвателя
formElementCard.addEventListener('submit', userAddCards);     // сабмит надобавление новой карты пользователя

renderCards ();   // добавление готовых карточек из массива








/*function togglePopup (popupElement) { // октрывает и закрывает попапы
  if(!popupElement.classList.contains('popup_opened')) {
  }
  popupElement.classList.toggle('popup_opened');
}




overlay.addEventListener('keydown', function (evt) {  // на закрытие любого попапа кнопкой Esc
  if(evt.key === 'Escape') {
    const popupElement = evt.currentTarget.querySelector('.popup_opened');
    closePopup(popupElement);
  }
});
*/
