export default class Popup {
  _ESCAPE = "Escape";

  constructor(popupSelector) {
    this._popupEl = document.querySelector(popupSelector);
  }

  open() {
    this._popupEl.classList.add("popup_opened");
    this._popupEl.addEventListener("pointerdown", (evt) =>
      this._handleClose(evt)
    );
    document.addEventListener("keydown", (evt) => this._handleClose(evt));
  }

  close() {
    this._popupEl.classList.remove("popup_opened");
    this._popupEl.removeEventListener("pointerdown", (evt) =>
      this._handleClose(evt)
    );
    document.removeEventListener("keydown", (evt) => this._handleClose(evt));
  }

  _handleClose(evt) {
    if (evt.key === this._ESCAPE || evt.target === this._popupEl) {
      this.close();
    }
  }

  setEventListeners() {
    this._closePopupButton = this._popupEl.querySelector(".popup__close-btn");
    this._closePopupButton.addEventListener("click", () => this.close());
  }
}
