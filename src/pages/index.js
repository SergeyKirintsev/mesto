"use strict";

import("./index.css");

import {
  initialCards,
  configValidate,
  editProfileBtn,
  nameInput,
  jobInput,
  profileForm,
  addCardForm,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo";
import Section from "../components/Section";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";

editProfileBtn.addEventListener("click", handleEditProfile);

function handleEditProfile() {
  const { name, job } = user.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profileFormValidator.clearValidation();
  profilePopup.open();
}

const popupWithImage = new PopupWithImage(".popup_img_view");
popupWithImage.setEventListeners();

function getCard(data) {
  const card = new Card(
    data,
    () => popupWithImage.open(data.name, data.link),
    ".card-template"
  );
  return card.generateCard();
}

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardsSection.addItem(getCard(data));
    },
  },
  ".elements__list"
);

cardsSection.renderItems();

const user = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__profession",
});

function profileFormSubmitHandler(data) {
  user.setUserInfo({
    name: data["name-profile"],
    job: data["job-profile"],
  });
  profilePopup.close();
}

const profilePopup = new PopupWithForm(".popup_edit_profile", (data) =>
  profileFormSubmitHandler(data)
);
profilePopup.setEventListeners();

const profileFormValidator = new FormValidator(configValidate, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configValidate, addCardForm);
addCardFormValidator.enableValidation();
