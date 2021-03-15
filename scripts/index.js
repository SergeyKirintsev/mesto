"use strict";
import Card from "./card.js";
import { initialCards, configValidate, ESCAPE } from "./constants.js";
import FormValidator from "./formValidator.js";

// Профиль
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__profession");
const editProfileBtn = document.querySelector(".profile__edit-btn");

// Форма редактирования профиля
const profilePopup = document.querySelector(".popup_edit_profile");
const profileForm = profilePopup.querySelector(".popup__form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_job");

// Форма добавления карточки
const addCardPopup = document.querySelector(".popup_add_card");
const addCardForm = addCardPopup.querySelector(".popup__form");
const imgNameInput = addCardForm.querySelector(".popup__input_type_img-name");
const imgLinkInput = addCardForm.querySelector(".popup__input_type_img-link");

// Попап просмотра картинки
const imgPopup = document.querySelector(".popup_img_view");
const imgEl = imgPopup.querySelector(".popup__image");
const imgCaption = imgPopup.querySelector(".popup__caption");

//
const addCardBtn = document.querySelector(".profile__add-btn");
const closePopupButtons = document.querySelectorAll(".popup__close-btn");
const cardsContainerEl = document.querySelector(".elements__list");

// Навешиваем обработчики

editProfileBtn.addEventListener("click", handleEditProfile);
profileForm.addEventListener("submit", profileFormSubmitHandler);

addCardBtn.addEventListener("click", handleAddCard);
addCardForm.addEventListener("submit", addCardSubmitHandler);

closePopupButtons.forEach((btn) =>
  btn.addEventListener("click", closePopupOnBtn)
);

// Функции

function closePopupOnBtn(event) {
  const targetEl = event.target;
  const popup = targetEl.closest(".popup");
  closePopup(popup);
}

function handleViewImage(name, link) {
  imgEl.src = link;
  imgEl.alt =name;
  imgCaption.textContent = name;
  openPopup(imgPopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("pointerdown", closePopupAnotherCase);
  document.removeEventListener("keydown", closePopupAnotherCase);
}

function closePopupAnotherCase(event) {
  const popup = document.querySelector(".popup_opened");
  if (event.key === ESCAPE || event.target === popup) {
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("pointerdown", closePopupAnotherCase);
  document.addEventListener("keydown", closePopupAnotherCase);
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

function getCard(data) {
  const card = new Card(data, handleViewImage, ".card-template");
  return card.generateCard();
}

function renderCard(cardEl) {
  cardsContainerEl.prepend(cardEl);
}

function addCardSubmitHandler(event) {
  event.preventDefault();

  const name = imgNameInput.value.trim();
  const link = imgLinkInput.value.trim();

  renderCard(getCard({ name, link }));

  addCardForm.reset();
  closePopup(addCardPopup);
}

initialCards.forEach((data) => {
  renderCard(getCard(data));
});

const profileFormValidator = new FormValidator(configValidate, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configValidate, addCardForm);
addCardFormValidator.enableValidation();
