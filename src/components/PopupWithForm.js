import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupEl.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitBtn = this._form.querySelector(
      ".popup__form-submit"
    ).firstChild;
    this._submitBtnCaption = this._submitBtn.data.trim();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
    this._submitBtn.data = this._submitBtnCaption;
  }

  savingData() {
    this._submitBtn.data = "Сохранение...";
  }
}
