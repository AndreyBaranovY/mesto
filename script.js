
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-btn');

const togglePopup = function () {              // октрывает и закрывает окно popup
 const popup = document.querySelector('.popup');
  popup.classList.toggle('popup_opened');
}

      // вставляем предварительные данные в окно popup
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');
  let userName = profileName.textContent;
  let userJob = profileJob.textContent;
  let nameInput = document.querySelector('.popup__input_type_name');
  let jobInput = document.querySelector('.popup__input_type_job');
    nameInput.value = userName;
    jobInput.value = userJob;

      // вносит изменения данных в профиль пользователя
let formElement = document.querySelector('.popup__form');
function formSubmitHandler (evt) {
  evt.preventDefault();
    nameInput = document.querySelector('.popup__input_type_name');
    jobInput = document.querySelector('.popup__input_type_job');
      userName = nameInput.value;
      userJob = jobInput.value;
    profileName.textContent = userName;
    profileJob.textContent = userJob;
  togglePopup();
}

    // отвечают за действия пользователя
editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);

