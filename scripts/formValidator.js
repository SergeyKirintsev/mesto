export default class FormValidator {
  constructor(settings) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }


  _showInputError = (inputElement, errorMessage, {errorClass}) => {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  _hideInputError = (inputElement, {errorClass}) => {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
  };

  _checkInputValidity = (inputElement, configValidate) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;

      showInputError(inputElement, errorMessage, configValidate);
    } else {
      hideInputError(inputElement, configValidate);
    }
  };

  toggleButtonState = (
    inputList,
    buttonElement,
    {inactiveButtonClass}
  ) => {
    const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
    const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

    if (hasNotValidInput) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(inactiveButtonClass);
    }
  };

  _setEventListeners = (formElement, configValidate) => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };
    formElement.addEventListener("submit", handleFormSubmit);

    const {inputSelector, submitButtonSelector} = configValidate;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        checkInputValidity(inputElement, configValidate);
        toggleButtonState(inputList, buttonElement, configValidate);
      };

      inputElement.addEventListener("input", handleInput);
    };

    inputList.forEach(inputListIterator);
    toggleButtonState(inputList, buttonElement, configValidate);
  };

  enableValidation = (configValidate) => {
    const {formSelector} = configValidate;
    const formElements = document.querySelectorAll(formSelector);
    const formList = Array.from(formElements);

    formList.forEach((formElement) => {
      this._setEventListeners(formElement, configValidate);
    });
  };
}
