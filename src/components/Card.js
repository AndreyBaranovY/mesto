
export class Card {
  constructor(item, cardSelector, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._template = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._template).content.cloneNode(true);
    return cardElement;
  }

  _likeAction (evt) {                   // ф-я  переключения лайков for createCard
   evt.target.classList.toggle('card__like-button_active');
 }

  _deleteCardAction (evt) {             // ф-я удаления карточки for createCard
    const cardToDelete = evt.target.closest('.card');
     cardToDelete.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__name').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
    this._element.querySelector('.card__like-button').addEventListener('click', this._likeAction);  // слушатель на переключение лайков
    this._element.querySelector('.card__trash-btn').addEventListener('click', this._deleteCardAction);  // слушатель на удаление карточки
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;

  }
}
