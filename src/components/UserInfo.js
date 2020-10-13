export class UserInfo {
  constructor(object) {
    this._userName = document.querySelector(object.userName);
    this._userJob = document.querySelector(object.userJob);
    this._userAvatar = document.querySelector(object.userAvatar)
  }
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
      userAvatar: this._userAvatar.style.background,
    };
  }
  setUserInfo(obj) {
    this._userName.textContent = obj.name;
    this._userJob.textContent = obj.job;
    this._userAvatar.src = obj.avatar;
  }
}
