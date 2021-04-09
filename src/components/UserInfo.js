export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
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
}
