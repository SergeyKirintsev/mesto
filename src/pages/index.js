"use strict";

import Api from "../components/Api";

import("./index.css");

import {
  configValidate,
  editProfileBtn,
  addCardBtn,
  nameInput,
  jobInput,
  profileForm,
  addCardForm,
  cardsContainerSelector,
  nameElSelector,
  jobElSelector,
  viewImagePopupSelector,
  profilePopupSelector,
  addCardPopupSelector,
  cardTemplateSelector,
} from "../utils/constants.js";

import UserInfo from "../components/UserInfo";
import Section from "../components/Section";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";

const handleAddCard = () => {
  addCardForm.reset();
  addCardFormValidator.clearValidation();
  addCardPopup.open();
};

const handleEditProfile = () => {
  const { name, job } = userEl.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profileFormValidator.clearValidation();
  profilePopup.open();
};

const viewImagePopup = new PopupWithImage(viewImagePopupSelector);

const getCard = (data) => {
  const card = new Card(
    data,
    () => viewImagePopup.open(data.name, data.link),
    cardTemplateSelector
  );
  return card.generateCard();
};

const cardsSection = new Section(
  {
    items: [],
    renderer: (data) => getCard(data),
  },
  cardsContainerSelector
);

const userEl = new UserInfo({
  nameSelector: nameElSelector,
  jobSelector: jobElSelector,
});

const profileSubmitHandler = (data) => {
  api
    .setUserInfo({
      name: data["name-profile"],
      about: data["job-profile"],
    })
    .then((userData) => {
      userEl.setUserInfo(userData);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => profilePopup.close());
};

const profilePopup = new PopupWithForm(profilePopupSelector, (data) =>
  profileSubmitHandler(data)
);

const addCardSubmitHandler = (data) => {
  const name = data["card-name"];
  const link = data["card-link"];
  cardsSection.addItem({ name, link });
  addCardPopup.close();
};

const addCardPopup = new PopupWithForm(addCardPopupSelector, (data) =>
  addCardSubmitHandler(data)
);

const profileFormValidator = new FormValidator(configValidate, profileForm);
const addCardFormValidator = new FormValidator(configValidate, addCardForm);

viewImagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

editProfileBtn.addEventListener("click", handleEditProfile);
addCardBtn.addEventListener("click", handleAddCard);

// cardsSection.renderItems();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-22",
  headers: {
    authorization: "9405df8f-2b49-4fde-857c-7e0c079d778d",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((initialCards) => {
    cardsSection.setItems(initialCards);
    cardsSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getUserInfo()
  .then((userData) => {
    userEl.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(err);
  });
