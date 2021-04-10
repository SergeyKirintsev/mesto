"use strict";

const configAPI = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-22",
  headers: {
    authorization: "9405df8f-2b49-4fde-857c-7e0c079d778d",
    "Content-Type": "application/json",
  },
};

const configValidate = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "popup__form-submit_disabled",
  inputErrorClass: ".popup__input-error",
  errorClass: "popup__input-error_active",
};

const cardsContainerSelector = ".elements__list";
const cardTemplateSelector = ".card-template";
const nameElSelector = ".profile__name";
const jobElSelector = ".profile__profession";
const viewImagePopupSelector = ".popup_img_view";
const profilePopupSelector = ".popup_edit_profile";
const addCardPopupSelector = ".popup_add_card";

const editProfileBtn = document.querySelector(".profile__edit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");

const profilePopupEl = document.querySelector(profilePopupSelector);
const profileForm = profilePopupEl.querySelector(".popup__form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_job");

const addCardPopup = document.querySelector(addCardPopupSelector);
const addCardForm = addCardPopup.querySelector(".popup__form");

export {
  configAPI,
  configValidate,
  editProfileBtn,
  nameInput,
  jobInput,
  profileForm,
  addCardForm,
  addCardBtn,
  cardsContainerSelector,
  nameElSelector,
  jobElSelector,
  viewImagePopupSelector,
  profilePopupSelector,
  addCardPopupSelector,
  cardTemplateSelector,
};
