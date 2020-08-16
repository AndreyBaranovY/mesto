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

const cards = document.querySelector('.cards');
const editButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup-profile');
let formElementProfile = document.querySelector('.popup__form-profile');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = formElementProfile.querySelector('.popup__input_type_name');
let jobInput = formElementProfile.querySelector('.popup__input_type_job');
const closeEditButton = editProfilePopup.querySelector('.popup__edit-btn');

const addButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup-card');
let formElementCard = document.querySelector('.popup__form-card');
let cardNameInput = formElementCard.querySelector('.popup__input_type_card-name');
let cardLinkInput = formElementCard.querySelector('.popup__input_type_link');
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

function seeBigFotoAction (evt) {            //ф-я открытия фото попапа for createCard
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
    cardElement.querySelector('.card__image').addEventListener('click',seeBigFotoAction );      // слушатель на открытие фото попапа
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
    cardNameInput.value = '';
    cardLinkInput.value = '';
}

function openPopup (popupElement) {         // открывает попапы
  popupElement.classList.add('popup_opened');
}
function closePopup (popupElement) {        // закрывает попапы
  popupElement.classList.remove('popup_opened');
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
});
closeAddButton.addEventListener('click', function () {  // на закрытие окна добавления карточки
  closePopup(addCardPopup);
});
closePhotoButton.addEventListener('click', function () {  // на закрытие окна фото
  closePopup(photoPopup);
});

formElementProfile.addEventListener('submit', formSubmitHandler);  // сабмит на изменения в профайл пользвателя
formElementCard.addEventListener('submit', userAddCards);     // сабмит надобавление новой карты пользователя

//initialCards.forEach(card => {
//  addCard(card.name, card.link);
// });

renderCards ();   // добавление готовых карточек из массива

















/*function togglePopup (popupElement) { // октрывает и закрывает попапы
  if(!popupElement.classList.contains('popup_opened')) {
  }
  popupElement.classList.toggle('popup_opened');
}
*/
