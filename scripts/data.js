'use strict';

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://images.unsplash.com/photo-1612409210157-fae7e07df828?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2852&q=80",
  },
  {
    name: "Челябинская область",
    link:
      "https://images.unsplash.com/photo-1612583386053-87b6261ff7b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80",
  },
  {
    name: "Иваново",
    link:
      "https://images.unsplash.com/photo-1612588086184-89c0b2d69467?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
  },
  {
    name: "Камчатка",
    link:
      "https://images.unsplash.com/photo-1612609819547-e68a5c32581a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80",
  },
  {
    name: "Холмогорский район",
    link:
      "https://images.unsplash.com/photo-1599824425751-b8e0a676a647?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2104&q=80",
  },
  {
    name: "Байкал",
    link:
      "https://images.unsplash.com/photo-1612538908022-3852d47746a5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
  },
];

const configValidate = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit_disabled",
  inputErrorClass: ".popup__input-error",
  errorClass: "popup__input-error_active",
};

export { initialCards, configValidate }
