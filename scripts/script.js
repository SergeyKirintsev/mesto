'use strict';

import {initialCards} from './data.js'

// console.log(initialCards)
// Кнопка добавить карточку
const addCardBtn = document.querySelector(".profile__add-btn");
addCardBtn.addEventListener("click", handleAddCard);

// Профиль
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__profession");
const editProfileBtn = document.querySelector(".profile__edit-btn");
editProfileBtn.addEventListener("click", handleEditProfile);

// Edit popup
const editPopup = document.querySelector(".popup_edit_profile");
const formElement = editPopup.querySelector(".popup__form");
const formTitle = editPopup.querySelector(".popup__title");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_job");

const formSubmitBtn = document.querySelector(".popup__form-submit");

// Закрытие попапов
const closePopupButtons = document.querySelectorAll(".popup__close-btn");
closePopupButtons.forEach((btn) => btn.addEventListener("click", closePopup));

const listContainerEl = document.querySelector(".elements__list");
const templateEl = document.querySelector(".template");

function getCard({ name, link }) {
  const newCard = templateEl.content.cloneNode(true);

  const headerEl = newCard.querySelector(".elements__text");
  headerEl.textContent = name;

  const removeBtn = newCard.querySelector(".elements__trash-btn");
  removeBtn.addEventListener("click", handleDeleteCard);

  const likeBtn = newCard.querySelector(".elements__like-btn");
  likeBtn.addEventListener("click", handleToggleLike);

  const imgEl = newCard.querySelector(".elements__img");
  imgEl.setAttribute("src", link);
  imgEl.setAttribute("alt", name);
  imgEl.addEventListener("click", handleViewImage);

  return newCard;
}

function renderCard(card) {
  listContainerEl.prepend(card);
}

function handleDeleteCard(event) {
  const targetEl = event.target;
  const targetItem = targetEl.closest(".elements__element");
  targetItem.remove();
}

function closePopup(event) {
  const targetEl = event.target;
  const popup = targetEl.closest(".popup");
  popup.classList.remove("popup_opened");

  formElement.removeEventListener("submit", addCardSubmitHandler);
  formElement.removeEventListener("submit", profileFormSubmitHandler);
}

function openPopup() {
  editPopup.classList.add("popup_opened");
}

function handleToggleLike(event) {
  event.target.classList.toggle("elements__like-btn_active");
}

function handleEditProfile() {
  formTitle.textContent = "Редактировать профиль";
  nameInput.value = nameProfile.textContent.trim();
  nameInput.placeholder = "Имя";
  jobInput.value = jobProfile.textContent.trim();
  jobInput.placeholder = "Увлечение/работа";
  formSubmitBtn.textContent = "Сохранить";

  formElement.addEventListener("submit", profileFormSubmitHandler);
  openPopup();
}

function profileFormSubmitHandler(event) {
  event.preventDefault();

  nameProfile.textContent = nameInput.value.trim();
  jobProfile.textContent = jobInput.value.trim();

  formElement.removeEventListener("submit", profileFormSubmitHandler);
  editPopup.classList.remove("popup_opened");
}

function handleAddCard() {
  formTitle.textContent = "Новое место";
  nameInput.value = "";
  jobInput.value = "";
  nameInput.placeholder = "Название";
  jobInput.placeholder = "Ссылка на картинку";
  formSubmitBtn.textContent = "Создать";

  formElement.addEventListener("submit", addCardSubmitHandler);
  openPopup();
}

function addCardSubmitHandler(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const link = jobInput.value.trim();

  renderCard(getCard({ name, link }));

  formElement.removeEventListener("submit", addCardSubmitHandler);
  editPopup.classList.remove("popup_opened");
}

function handleViewImage(event) {
  const imgPopup = document.querySelector(".popup_img_view");
  const img = imgPopup.querySelector(".popup__image");
  const imgCaption = imgPopup.querySelector(".popup__caption");
  imgCaption.textContent = event.target.alt;
  img.src = event.target.src;

  imgPopup.classList.add("popup_opened");
}

initialCards.forEach((card) => renderCard(getCard(card)));
