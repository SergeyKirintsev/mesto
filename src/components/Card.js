export default class Card {
  constructor(
    card,
    currentUser,
    templateSelector,
    handleCardClick,
    { handleToggleLike },
    { handleDeleteCard }
  ) {
    this._card = card;
    this._name = card.name;
    this._link = card.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._toggleLike = handleToggleLike;
    this._currentUser = currentUser;
    this._isMyCard = card.owner._id === currentUser._id;
    this._deleteCard = handleDeleteCard;
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

    this._likesCountEl = this._element.querySelector(".elements__like-count");
    this._setLikesCount(this._card.likes.length);
    this._checkMyLike(this._card.likes);

    this._imgEl.src = this._link;
    this._imgEl.alt = this._name;

    return this._element;
  }

  _handleDeleteCard() {
    this._deleteCard(this._card._id);
  }

  _handleToggleLike() {
    if (!this._likeBtn.classList.contains("elements__like-btn_active")) {
      this._toggleLike("PUT", this._card._id)
        .then((card) => {
          this._setLikesCount(card.likes.length);
          this._checkMyLike(card.likes);
        })
        .catch((err) => {
          console.log("Ошибка при постановке лайка", err);
        });
    } else {
      this._toggleLike("DELETE", this._card._id)
        .then((card) => {
          this._setLikesCount(card.likes.length);
          this._checkMyLike(card.likes);
        })
        .catch((err) => {
          console.log("Ошибка при удалении лайка", err);
        });
    }
  }

  _setEventListeners() {
    this._removeBtn = this._element.querySelector(".elements__trash-btn");
    if (this._isMyCard) {
      this._removeBtn.addEventListener("click", () => this._handleDeleteCard());
    } else {
      this._removeBtn.remove();
    }

    this._likeBtn = this._element.querySelector(".elements__like-btn");
    this._likeBtn.addEventListener("click", () => this._handleToggleLike());

    this._imgEl = this._element.querySelector(".elements__img");
    this._imgEl.addEventListener("click", this._handleCardClick);
  }

  _setLikesCount(count) {
    this._likesCountEl.textContent = count;
  }

  _checkMyLike(likes) {
    const myLike = (el) => el._id === this._currentUser._id;
    if (likes.some(myLike)) {
      this._likeBtn.classList.add("elements__like-btn_active");
    } else {
      this._likeBtn.classList.remove("elements__like-btn_active");
    }
  }
}
