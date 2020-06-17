
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let formElement = document.querySelector('.popup__form');
const popup = document.querySelector('.popup');



function togglePopup () { // октрывает попап и копирует данные из инпутов если попап закрыт!!!
  if(!popup.hasAttribute('popup_opened')) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  }
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {  // вносит изменения данных в профиль пользователя
  evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  togglePopup();
}

editButton.addEventListener('click', togglePopup);   // обработчики событий
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);

