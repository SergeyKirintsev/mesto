"use strict";
import Section from "../components/Section";

import("./index.css");

import Card from "../components/Card.js";
import { initialCards, configValidate } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage";

// Профиль
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__profession");
const editProfileBtn = document.querySelector(".profile__edit-btn");

// Форма редактирования профиля
const profilePopup = document.querySelector(".popup_edit_profile");
const profileForm = profilePopup.querySelector(".popup__form");
// const nameInput = profileForm.querySelector(".popup__input_type_name");
// const jobInput = profileForm.querySelector(".popup__input_type_job");

// Форма добавления карточки
const addCardPopup = document.querySelector(".popup_add_card");
const addCardForm = addCardPopup.querySelector(".popup__form");
// const imgNameInput = addCardForm.querySelector(".popup__input_type_img-name");
// const imgLinkInput = addCardForm.querySelector(".popup__input_type_img-link");

//
const addCardBtn = document.querySelector(".profile__add-btn");
// const closePopupButtons = document.querySelectorAll(".popup__close-btn");
// const cardsContainerEl = document.querySelector(".elements__list");

// Навешиваем обработчики

editProfileBtn.addEventListener("click", handleEditProfile);
// profileForm.addEventListener("submit", profileFormSubmitHandler);

addCardBtn.addEventListener("click", handleAddCard);
// addCardForm.addEventListener("submit", addCardSubmitHandler);

// Функции

function closePopupOnBtn(event) {
  const targetEl = event.target;
  const popup = targetEl.closest(".popup");
  closePopup(popup);
}

function handleEditProfile() {
  nameInput.value = nameProfile.textContent.trim();
  jobInput.value = jobProfile.textContent.trim();
  profileFormValidator.clearValidation();
  openPopup(profilePopup);
}

function profileFormSubmitHandler(event) {
  event.preventDefault();

  nameProfile.textContent = nameInput.value.trim();
  jobProfile.textContent = jobInput.value.trim();

  closePopup(profilePopup);
}

function handleAddCard() {
  addCardForm.reset();
  addCardFormValidator.clearValidation();
  openPopup(addCardPopup);
}

const popupWithImage = new PopupWithImage(".popup_img_view");
popupWithImage.setEventListeners();

function getCard(data) {
  const card = new Card(
    data,
    (name, link) => popupWithImage.open(name, link),
    ".card-template"
  );
  return card.generateCard();
}

function addCardSubmitHandler(event) {
  event.preventDefault();

  const name = imgNameInput.value.trim();
  const link = imgLinkInput.value.trim();

  cardsList.addItem(getCard({ name, link }));

  addCardForm.reset();
  closePopup(addCardPopup);
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardsList.addItem(getCard(data));
    },
  },
  ".elements__list"
);

cardsList.renderItems();

const profileFormValidator = new FormValidator(configValidate, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configValidate, addCardForm);
addCardFormValidator.enableValidation();
