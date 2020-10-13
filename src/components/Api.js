export class Api {

  constructor({srcUrl, headers}){
    this._srcUrl = srcUrl;
    this._headers = headers;
  }

  getInitialCards(){
    return fetch(`${this._srcUrl}/cards`,{
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }
  getUserInfo(){
    return fetch(`${this._srcUrl}/users/me`,{
      headers:this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  likeCard(id){
    return fetch(`${this._srcUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers:this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  unLikeCard(id){
    return fetch(`${this._srcUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers:this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  deleteCard(id){
    return fetch(`${this._srcUrl}/cards/${id}`, {
      method: 'DELETE',
      headers:this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  updateAvatar(obj){
    return fetch(`${this._srcUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: obj,
      }),
      headers:this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}
