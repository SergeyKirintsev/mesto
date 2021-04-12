import PopupWithForm from "./PopupWithForm";

export default class PopupWithConfirm extends PopupWithForm {
  setEventListeners() {
    this._closePopupButton.addEventListener("click", this.close);
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._res();
      super.close();
    });
  }

  close() {
    this._rej();
    super.close();
  }

  open(res, rej) {
    this._res = res;
    this._rej = rej;
    super.open();
  }
}
