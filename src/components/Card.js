export class Card {

  constructor(data, cardSelector) {
    this._name = data.data.name;
    this._link = data.data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = data.handleCardClick;
    this._handleLikeClick = data.handleLikeClick;
    this._handleDeleteIconCLick = data.handleDeleteIconClick;
  }
    _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }


  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__image').alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__image')// слушатель на большое фото
      .addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
      });
    this._element.querySelector('.card__like-button')// слушатель на переключение лайков
      .addEventListener('click',  () => {
    this._handleLikeClick();
      });
    this._element.querySelector('.card__trash-btn') // слушатель на удаление карточки
    .addEventListener('click', () => {
       this._handleDeleteIconCLick();
      });
  }

}




// export class Card {
//   constructor(item, cardSelector, handleCardClick) {
//     this._name = item.name;
//     this._link = item.link;
//     this._template = cardSelector;
//     this._handleCardClick = handleCardClick;
//   }

//   _getTemplate() {
//     const cardElement = document.querySelector(this._template).content.querySelector('.card').cloneNode(true);
//     return cardElement;
//   }


//   generateCard() {
//     this._element = this._getTemplate();
//     this._element.querySelector('.card__image').src = this._link;
//     this._element.querySelector('.card__name').textContent = this._name;
//     this._setEventListeners();
//     return this._element;
//   }

//   _setEventListeners() {
//     this._element.querySelector('.card__image').addEventListener('click', () => {                     // слушатель на большое фото
//       this._handleCardClick(this._link, this._name);
//     });
//     this._element.querySelector('.card__like-button').addEventListener('click',  () => { this._likeAction()});  // слушатель на переключение лайков
//     this._element.querySelector('.card__trash-btn').addEventListener('click', () => { this._deleteCard()});  // слушатель на удаление карточки
//   }

//   _likeAction () {                   // ф-я  переключения лайков
//     this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
//  }

//  _deleteCard() {                // ф-я удаления карточки
//   this._element.remove();
//   this._element = null;

// }

// }
