import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
  constructor(popupSelector,submit){
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
  }
  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit()
      this.close();
    });
  }
}
