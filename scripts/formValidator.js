export default class FormValidator {
  constructor(settings, form) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity = (inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;

      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  toggleButtonState = (inputList, buttonElement) => {
    const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
    const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

    if (hasNotValidInput) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _setEventListeners = (formElement) => {
    formElement.addEventListener("submit",(event) => {
      event.preventDefault();
    });

    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);

    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState(this._inputList, this._buttonElement);
      };

      inputElement.addEventListener("input", handleInput);
    };

    this._inputList.forEach(inputListIterator);
    this.toggleButtonState(this._inputList, this._buttonElement);
  };

  enableValidation() {
      this._setEventListeners(this._form);
  };

  checkForm() {
    const errorElements = this._form.querySelectorAll(this._inputErrorClass);
    errorElements.forEach(el => {
      el.textContent = "";
      el.classList.remove(this._inputErrorClass);
    })

    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    this.toggleButtonState(inputList, buttonElement);
  }
}
