const formElement = document.querySelector('.popup__form');
const formObj = {                            // параметры ф-и валидации
  formSelector: `.popup__form`,
  inputSelector: `.popup__input`,
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


const showInputError = (formElement, inputElement, errorMessage,formObj) => { // показывает ошибкy
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formObj.inputErrorClass);
  errorElement.classList.add(formObj.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, formObj) => {      // скрывает ошибкy
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObj.inputErrorClass);
  errorElement.classList.remove(formObj.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {  // определяет валидность полей и переключает ф-и видимости ошибки
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement ,inputElement.validationMessage, formObj);
  }else{
    hideInputError(formElement, inputElement, formObj);
  }
};

const setEventListeners = (formElement, formObj) =>{
  const inputList = Array.from(formElement.querySelectorAll(formObj.inputSelector));
  const buttonElement = formElement.querySelector(formObj.submitButtonSelector);  // определяем в текущей форме кнопку отправки
  toggleButtonState(inputList, buttonElement, formObj);                        // вызываем ф-ю сабмита, чтобы не ждать ввода данных в поля
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input',() => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, formObj);     //вызываем ф-ю сабмита, для обработки массива полей
    });
  });
};

const enableValidation = (formObj) => {                // запускает валидацию форм
  const formList = Array.from(document.querySelectorAll(formObj.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
  });

    setEventListeners(formElement, formObj);
  });
};

const hasInvalidInput = (inputList) => {     // отвечает за заполнение полей ввода
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, formObj) => { // отвечает за сотояние кнопки сабмита
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add(formObj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  }else{
    buttonElement.classList.remove(formObj.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  }
};

enableValidation(formObj);   // запуск ф-и валидации форм с параметрами

