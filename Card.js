const overlay = document.querySelector('.page');
const photoPopup = document.querySelector('.popup-photo');
const photoImg = photoPopup.querySelector('.popup__photo');
const photoTitle = photoPopup.querySelector('.popup__photo-title');

function openPopup (popupElement) {         // открывает попапы
  popupElement.classList.add('popup_opened');
  overlay.addEventListener('keydown', keyHandler );  // добавляем слушатель на закрытие любого попапа кнопкой Esc
}
function closePopup (popupElement) {        // закрывает попапы
  overlay.removeEventListener('keyup', keyHandler);  // снимаем слушателя с кнопки Esc
  popupElement.classList.remove('popup_opened');
}
function keyHandler (evt) {        // реализует закрытие попапов кнопкой Esc
  if(evt.key === 'Escape') {
    const popupElement = evt.currentTarget.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

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
    const cardToDelete = evt.target.closest('.card');
     cardToDelete.remove();
  }
  _seeBigPicAction (evt) {          //ф-я открытия фото
    const clickedCardImg = evt.target;
    const clickedCard = clickedCardImg.parentElement;
    if (clickedCardImg) {

    const clickedCardTitle = clickedCard.querySelector('.card__name');
    photoImg.src = clickedCardImg.src;
    photoImg.alt =`Изображение ${clickedCardTitle}`;
    photoTitle.textContent = clickedCardTitle.textContent;

    openPopup(photoPopup);
    }
}

  _setEventListeners() {
    this._cardImage.addEventListener('click', this._seeBigPicAction);  // слушатель на открытие фото попапа
    this._element.querySelector('.card__like-button').addEventListener('click', this._likeAction);  // слушатель на переключение лайков
    this._element.querySelector('.card__trash-btn').addEventListener('click', this._deleteCardAction);  // слушатель на удаление карточки
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage =  this._element.querySelector('.card__image');
    this._cardName =  this._element.querySelector('.card__name');

    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardName.textContent = this._name;
    this._cardImage.alt = `" Изображение + ${this._name}`;

    return this._element;
  }
}
