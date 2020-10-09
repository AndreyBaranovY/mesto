export class FormValidator {
  constructor(formObj, formElement) {
    this._formObj = formObj;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._formObj.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._formObj.submitButtonSelector);
  }

  _isValid(inputElement) {  // определяет валидность полей и переключает ф-и видимости ошибки
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement ,inputElement.validationMessage);
    }else{
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage)  { // показывает ошибкy
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._formObj.inputErrorClass);
    errorElement.classList.add(this._formObj.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement)  {      // скрывает ошибкy
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._formObj.inputErrorClass);
    errorElement.classList.remove(this._formObj.errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState()   { // отвечает за сотояние кнопки сабмита
    if (this._hasInvalidInput()){
      this._buttonElement.classList.add(this._formObj.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    }else{
      this._buttonElement.classList.remove(this._formObj.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', '');
    }
  }

  _hasInvalidInput() {     // отвечает за заполнение полей ввода
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    });
  }

  _setEventListeners()  {
    this._toggleButtonState();                        // вызываем ф-ю сабмита, чтобы не ждать ввода данных в поля
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',() => {
        this._isValid(inputElement);
        this._toggleButtonState();     //вызываем ф-ю сабмита, для обработки массива полей
      });
    });
  }

  enableValidation()  {
    this._form = document.querySelector(this._formObj.formSelector);
    this._form.addEventListener("submit", function (evt) {
        evt.preventDefault();
    });
    this._setEventListeners();
  }

  clearInputErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  validate() {
    this._toggleButtonState();
  }

}
