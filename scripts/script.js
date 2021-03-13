"use strict";
import Card from "./card.js";
import initialCards from "./data.js";

// Профиль
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__profession");
const editProfileBtn = document.querySelector(".profile__edit-btn");

// Форма редактирования профиля
const editPopup = document.querySelector(".popup_edit_profile");
const editForm = editPopup.querySelector(".popup__form");
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_job");

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
editForm.addEventListener("submit", profileFormSubmitHandler);

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
  const checkForm = false;
  openPopup(imgPopup, checkForm);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("pointerdown", closePopupAnotherCase);
  document.removeEventListener("keydown", closePopupAnotherCase);
}

function closePopupAnotherCase(event) {
  const popup = document.querySelector(".popup_opened");
  if (event.key === "Escape" || event.target === popup) {
    closePopup(popup);
  }
}

function checkForm(popup) {
  const errorElements = popup.querySelectorAll(configValidate.inputErrorClass);
  errorElements.forEach(el => {
    el.textContent = "";
    el.classList.remove(configValidate.errorClass);
  })

  const inputList = Array.from(popup.querySelectorAll(configValidate.inputSelector));
  const buttonElement = popup.querySelector(configValidate.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configValidate);
}

function openPopup(popup, check = true) {
  if (check) checkForm(popup);

  popup.classList.add("popup_opened");
  popup.addEventListener("pointerdown", closePopupAnotherCase);
  document.addEventListener("keydown", closePopupAnotherCase);
}

function handleEditProfile() {
  nameInput.value = nameProfile.textContent.trim();
  jobInput.value = jobProfile.textContent.trim();

  openPopup(editPopup);
}

function profileFormSubmitHandler(event) {
  event.preventDefault();

  nameProfile.textContent = nameInput.value.trim();
  jobProfile.textContent = jobInput.value.trim();

  closePopup(editPopup);
}

function handleAddCard() {
  addCardForm.reset();
  openPopup(addCardPopup);
}

function getCard(data) {
  const card = new Card(data, handleViewImage);
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

