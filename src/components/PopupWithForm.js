import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._userName = document.querySelector(".popup__input_type_name");
    this._userJob = document.querySelector(".popup__input_type_job");
    this._cardName = document.querySelector(".popup__input_type_card-name");
    this._cardLink = document.querySelector(".popup__input_type_link");

  }
  _getInputValues() {
    return {
      userName: this._userName.value,
      userJob: this._userJob.value,
      name: this._cardName.value,
      link: this._cardLink.value,
    };

  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
  }
  close() {
    super.close();
    this._form.reset();
  }

}
