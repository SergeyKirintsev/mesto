export default class Popup {
  _ESCAPE = "Escape";

  constructor(popupSelector) {
    this._popupEl = document.querySelector(popupSelector);
    this._closePopupButton = this._popupEl.querySelector(".popup__close-btn");
    this.close = this.close.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  open() {
    this._popupEl.classList.add("popup_opened");
    this._popupEl.addEventListener("pointerdown", this._handleClose);
    document.addEventListener("keydown", this._handleClose);
  }

  close() {
    this._popupEl.classList.remove("popup_opened");
    this._popupEl.removeEventListener("pointerdown", this._handleClose);
    document.removeEventListener("keydown", this._handleClose);
  }

  _handleClose(evt) {
    if (evt.key === this._ESCAPE || evt.target === this._popupEl) {
      this.close();
    }
  }

  setEventListeners() {
    this._closePopupButton.addEventListener("click", this.close);
  }
}
