export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._template = templateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._template).content.cloneNode(true);
    return cardElement;
  }
  _likeAction (evt) {                   // ф-я  переключения лайков for createCard
    evt.target.classList.toggle('card__like-button_active');
  }

  _deleteCardAction (evt) {             // ф-я удаления карточки for createCard
    const clickTrash = evt.target;
    const cardToDelete = clickTrash.closest('.card');
     cardToDelete.remove();
  }

 _seeBigPicAction (evt) {            //ф-я открытия фото попапа for createCard
  const clickedCardImg = evt.target;
    const clickedCard = clickedCardImg.parentElement;
    console.log(clickedCardImg);
      if (clickedCardImg) {
        const photoImg = document.querySelector('.popup__photo');
        const photoTitle = document.querySelector('.popup__photo-title');
        const clickedCardTitle = clickedCard.querySelector('.card__name');
         photoImg.src = clickedCardImg.src;
         photoImg.alt = " Изображение " + clickedCardTitle.textContent;
         photoTitle.textContent = clickedCardTitle.textContent;
         openPopup(photoPopup);
      }
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', this._seeBigPicAction);  // слушатель на открытие фото попапа
    this._element.querySelector('.card__like-button').addEventListener('click', this._likeAction);  // слушатель на переключение лайков
    this._element.querySelector('.card__trash-btn').addEventListener('click', this._deleteCardAction);  // слушатель на удаление карточки
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__image').alt = `" Изображение + ${this._name}`;
    return this._element;
  }
}
