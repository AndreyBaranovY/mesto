
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let formElement = document.querySelector('.popup__form');
const popup = document.querySelector('.popup');
let userName = "ggg ";
let userJob = " ";

const togglePopup = function () { // октрывает попап, копирует данные из инпутов и закрывает попап
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {  // вносит изменения данных в профиль пользователя
  evt.preventDefault();
    nameInput = document.querySelector('.popup__input_type_name');
    jobInput = document.querySelector('.popup__input_type_job');
      userName = nameInput.value;
      userJob = jobInput.value;
    profileName.textContent = userName;
    profileJob.textContent = userJob;
  togglePopup();
}

editButton.addEventListener('click', togglePopup);   // обработчики событий
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);

