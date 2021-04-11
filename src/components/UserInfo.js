export default class UserInfo {
  constructor({ nameElSelector, jobElSelector, avatarElSelector }) {
    this._name = document.querySelector(nameElSelector);
    this._job = document.querySelector(jobElSelector);
    this._avatar = document.querySelector(avatarElSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent.trim(),
      job: this._job.textContent.trim(),
    };
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name.trim();
    this._job.textContent = about.trim();
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
