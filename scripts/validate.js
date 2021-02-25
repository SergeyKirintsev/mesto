const configValidate = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit_disabled",
  inputErrorClass: ".popup__input-error",
  errorClass: "popup__input-error_active",
};

const showInputError = (inputElement, errorMessage, { errorClass }) => {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (inputElement, { errorClass }) => {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (inputElement, configValidate) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;

    showInputError(inputElement, errorMessage, configValidate);
  } else {
    hideInputError(inputElement, configValidate);
  }
};

const toggleButtonState = (
  inputList,
  buttonElement,
  { inactiveButtonClass }
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

const setEventListeners = (formElement, configValidate) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  formElement.addEventListener("submit", handleFormSubmit);

  const { inputSelector, submitButtonSelector } = configValidate;
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

const enableValidation = (configValidate) => {
  const { formSelector } = configValidate;
  const formElements = document.querySelectorAll(formSelector);
  const formList = Array.from(formElements);

  formList.forEach((formElement) => {
    setEventListeners(formElement, configValidate);
  });
};

enableValidation(configValidate);
