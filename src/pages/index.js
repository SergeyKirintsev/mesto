"use strict";

import("./index.css");

import {
  initialCards,
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
  const { name, job } = user.getUserInfo();
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
    items: initialCards,
    renderer: (data) => {
      cardsSection.addItem(getCard(data));
    },
  },
  cardsContainerSelector
);

const user = new UserInfo({
  nameSelector: nameElSelector,
  jobSelector: jobElSelector,
});

const profileSubmitHandler = (data) => {
  user.setUserInfo({
    name: data["name-profile"],
    job: data["job-profile"],
  });
  profilePopup.close();
};

const profilePopup = new PopupWithForm(profilePopupSelector, (data) =>
  profileSubmitHandler(data)
);

const addCardSubmitHandler = (data) => {
  const name = data["card-name"];
  const link = data["card-link"];
  cardsSection.addItem(getCard({ name, link }));
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

cardsSection.renderItems();
