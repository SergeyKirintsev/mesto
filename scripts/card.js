export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.proba = "proba";
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
    }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".elements__text").textContent = this._name;
    this._element.querySelector(".elements__img").src = this._link;
    this._element.querySelector(".elements__img").alt = this._name;


    return this._element;
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleToggleLike() {
    this._likeBtn.classList.toggle("elements__like-btn_active");
  }

  _setEventListeners() {
    this._removeBtn = this._element.querySelector(".elements__trash-btn");
    this._removeBtn.addEventListener("click", () => this._handleDeleteCard());

    this._likeBtn = this._element.querySelector(".elements__like-btn");
    this._likeBtn.addEventListener("click", () => this._handleToggleLike());
  }

}
