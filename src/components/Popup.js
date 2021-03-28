// import { ESCAPE } from "../utils/constants";

export default class Popup {
  _ESCAPE = "Escape";

  constructor(popupSelector) {
    this._popupEl = document.querySelector(popupSelector);
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

  _handleClose(event) {
    if (event.key === this._ESCAPE || event.target === this._popupEl) {
      this.close();
    }
  }

  setEventListeners() {
    this._closePopupButton = this._popupEl.querySelector(".popup__close-btn");
    this._closePopupButton.addEventListener("click", this.close());
  }
}
