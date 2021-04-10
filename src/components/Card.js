export default class Card {
  constructor(data, handleCardClick, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._likes = data.likes.length;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".elements__text").textContent = this._name;
    this._element.querySelector(
      ".elements__like-count"
    ).textContent = this._likes;

    this._imgEl.src = this._link;
    this._imgEl.alt = this._name;

    return this._element;
  }

  _handleDeleteCard() {
    this._element.style.transition = "0.6s";
    this._element.style.transform = "rotateY(90deg)";
    setTimeout(() => {
      this._element.remove();
      this._element = null;
    }, 600);
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
    this._imgEl.addEventListener("click", this._handleCardClick);
  }
}
