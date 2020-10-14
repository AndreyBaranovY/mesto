export class UserInfo {
  constructor(object) {
    this._userName = document.querySelector(object.userName);
    this._userJob = document.querySelector(object.userJob);
    this._userAvatar = document.querySelector(object.userAvatar);
    this._userId = object.userId;
  }
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
      userAvatar: this._userAvatar,
      userId: this._userId,
    };
  }
  setUserInfo(obj) {
    this._userName.textContent = obj.name;
    this._userJob.textContent = obj.job;
    this._userAvatar = obj.avatar;
    this._userId = obj.id;
  }
}
