export default class Card {
  constructor(data, handleViewImage, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleViewImage = handleViewImage;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".elements__text").textContent = this._name;

    this._imgEl.src = this._link;
    this._imgEl.alt = this._name;

    return this._element;
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleToggleLike() {
    this._likeBtn.classList.toggle("elements__like-btn_active");
  }

  _setEventListeners() {
    this._removeBtn = this._element.querySelector(".elements__trash-btn");
    this._removeBtn.addEventListener("click", () => this._handleDeleteCard());

    this._likeBtn = this._element.querySelector(".elements__like-btn");
    this._likeBtn.addEventListener("click", () => this._handleToggleLike());

    this._imgEl = this._element.querySelector(".elements__img");
    this._imgEl.addEventListener("click", () => this._handleViewImage(this._name, this._link));
  }

}
