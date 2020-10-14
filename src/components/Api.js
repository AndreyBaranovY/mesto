export class Api {

  constructor({srcUrl, headers}){
    this._srcUrl = srcUrl;
    this._headers = headers;
  }

  getInitialCards(){
    return fetch(`${this._srcUrl}/cards`,{
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject( `Ошибка: ${res.status}`));
  }

  getUserInfo(){
    return fetch(`${this._srcUrl}/users/me`,{
      headers:this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject( `Ошибка: ${res.status}`));
  }

  updateUserInfo(obj){
           console.log(obj);
    return fetch(`${this._srcUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: obj.userName,
        about: obj.userJob,
      }),
      headers:this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject( `Ошибка: ${res.status}`));
  }

  addNewCard(obj){
    return fetch(`${this._srcUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: obj.name,
        link: obj.link
      }),
      headers:this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject( `Ошибка: ${res.status}`));
  }

  likeCard(id){
    return fetch(`${this._srcUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers:this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject( `Ошибка: ${res.status}`));
  }

  unLikeCard(id){
    return fetch(`${this._srcUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers:this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject( `Ошибка: ${res.status}`));
  }

  deleteCard(id){
    return fetch(`${this._srcUrl}/cards/${id}`, {
      method: 'DELETE',
      headers:this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject( `Ошибка: ${res.status}`));
  }

  updateAvatar(obj){
    return fetch(`${this._srcUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: obj,
      }),
      headers:this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject( `Ошибка: ${res.status}`));
  }
}
