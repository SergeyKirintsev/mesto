"use strict";

import { initialCards } from "./data.js";

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
const templateCardEl = document.querySelector(".template");
// const popupsEl = document.querySelectorAll(".popup");

// Навешиваем обработчики
// popupsEl.forEach((popup) => {
//   popup.addEventListener("click", function(event) {
//     if (event.target === this) closePopup(this);
//   });
// });

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

function renderCard(cardEl) {
  cardsContainerEl.prepend(cardEl);
}

function getCard({ name, link }) {
  const newCardEl = templateCardEl.content.cloneNode(true);

  const headerEl = newCardEl.querySelector(".elements__text");
  headerEl.textContent = name;

  const removeBtn = newCardEl.querySelector(".elements__trash-btn");
  removeBtn.addEventListener("click", handleDeleteCard);

  const likeBtn = newCardEl.querySelector(".elements__like-btn");
  likeBtn.addEventListener("click", handleToggleLike);

  const imgEl = newCardEl.querySelector(".elements__img");
  imgEl.setAttribute("src", link);
  imgEl.setAttribute("alt", name);
  imgEl.addEventListener("click", handleViewImage);

  return newCardEl;
}

function handleDeleteCard(event) {
  const targetEl = event.target;
  const targetItem = targetEl.closest(".elements__element");
  targetItem.remove();
}

function handleToggleLike(event) {
  event.target.classList.toggle("elements__like-btn_active");
}

function handleViewImage(event) {
  imgEl.src = event.target.src;
  imgCaption.textContent = event.target.alt;

  openPopup(imgPopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closePopupAnotherCase);
  document.removeEventListener("keydown", closePopupAnotherCase);
}

function closePopupAnotherCase(event) {
  const popup = document.querySelector(".popup_opened");
  if (event.key === "Escape" || event.target === popup) {
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closePopupAnotherCase);
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
  openPopup(addCardPopup);
}

function addCardSubmitHandler(event) {
  event.preventDefault();

  const name = imgNameInput.value.trim();
  const link = imgLinkInput.value.trim();

  renderCard(getCard({ name, link }));

  addCardForm.reset();
  closePopup(addCardPopup);
}

initialCards.forEach((card) => renderCard(getCard(card)));
