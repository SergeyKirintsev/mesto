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
  configAPI,
} from "../utils/constants.js";

import UserInfo from "../components/UserInfo";
import Section from "../components/Section";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";

let currentUser;

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

const handleToggleLike = (action, cardId) => {
  if (action === "PUT") {
    return api.putLike(cardId);
  } else {
    return api.deleteLike(cardId);
  }
};

const handleDeleteCard = (cardId) => {
  return api.deleteCard(cardId);
};

const getCard = (data) => {
  const card = new Card(
    data,
    () => viewImagePopup.open(data.name, data.link),
    cardTemplateSelector,
    handleToggleLike,
    currentUser,
    handleDeleteCard
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

const profileSubmitHandler = (user) => {
  api
    .setUserInfo({
      name: user.name,
      about: user.about,
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

const addCardSubmitHandler = (card) => {
  api
    .createCard({
      name: card.name,
      link: card.link,
    })
    .then((card) => {
      cardsSection.addItem(card);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => addCardPopup.close());
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

const api = new Api(configAPI);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    currentUser = userData;
    userEl.setUserInfo(currentUser);
    cardsSection.setItems(cards);
    cardsSection.renderItems();
  })
  .catch((err) => {
    console.log("Один из промисов отклонен", err);
  });
