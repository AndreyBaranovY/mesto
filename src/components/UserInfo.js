export class UserInfo {
  constructor(object) {
    this._userName = document.querySelector(object.userName);
    this._userJob = document.querySelector(object.userJob);
  }
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    };
  }
  setUserInfo(obj) {
    this._userName.textContent = obj.userName;
    this._userJob.textContent = obj.userJob;
  }
}
