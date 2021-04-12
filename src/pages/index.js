"use strict";

import Api from "../components/Api";

import("./index.css");

import {
  configValidate,
  editProfileBtn,
  addCardBtn,
  nameInput,
  jobInput,
  avatarElSelector,
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
  avatarLogo,
  avatarPopupSelector,
  avatarForm,
  confirmPopupSelector,
} from "../utils/constants.js";

import UserInfo from "../components/UserInfo";
import Section from "../components/Section";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";
import PopupWithConfirm from "../components/PopupWithConfirm";

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

const confirmAction = () => {
  return new Promise((res, rej) => {
    confirmPopup.open(res, rej);
  });
};

function deleteCardWithConfirm(cardId) {
  api
    .deleteCard(cardId)
    .then(() => {
      this._element.style.transition = "0.6s";
      this._element.style.transform = "rotateY(90deg)";

      setTimeout(() => {
        this._element.remove();
        this._element = null;
      }, 600);
    })
    .catch((err) => {
      console.log("Ошибка при удалении карточки");
      console.log(err);
    });
}

const getCard = (data) => {
  const card = new Card(
    data,
    currentUser,
    cardTemplateSelector,
    () => viewImagePopup.open(data.name, data.link),
    {
      handleToggleLike: function (action, cardId) {
        if (action === "PUT") {
          return api.putLike(cardId);
        } else {
          return api.deleteLike(cardId);
        }
      },
    },
    {
      handleDeleteCard: function (cardId) {
        confirmAction().then(() => {
          deleteCardWithConfirm.call(this, cardId);
        });
      },
    }
  );
  return card.generateCard();
};

const cardsSection = new Section(
  {
    renderer: (data) => getCard(data),
  },
  cardsContainerSelector
);

const userEl = new UserInfo({
  nameElSelector,
  jobElSelector,
  avatarElSelector,
});

const profilePopup = new PopupWithForm(profilePopupSelector, {
  handleFormSubmit: function (user) {
    this.savingData();
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
      .finally(() => this.close());
  },
});

const addCardPopup = new PopupWithForm(addCardPopupSelector, {
  handleFormSubmit: function (card) {
    this.savingData();
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
      .finally(() => this.close());
  },
});

const avatarPopup = new PopupWithForm(avatarPopupSelector, {
  handleFormSubmit: function ({ avatar }) {
    this.savingData();
    api
      .updateAvatar(avatar)
      .then((userData) => {
        userEl.setUserAvatar(userData);
      })
      .catch((err) => {
        console.log("Обновление аватара", err);
      })
      .finally(() => this.close());
  },
});

const handleUpdateAvatar = () => {
  avatarForm.reset();
  avatarFormValidator.clearValidation();
  avatarPopup.open();
};

// const confirmPopup = new PopupWithConfirm
const confirmPopup = new PopupWithConfirm(confirmPopupSelector, {
  handleFormSubmit: function () {},
});

const profileFormValidator = new FormValidator(configValidate, profileForm);
const addCardFormValidator = new FormValidator(configValidate, addCardForm);
const avatarFormValidator = new FormValidator(configValidate, avatarForm);

viewImagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopup.setEventListeners();
confirmPopup.setEventListeners();

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

editProfileBtn.addEventListener("click", handleEditProfile);
addCardBtn.addEventListener("click", handleAddCard);
avatarLogo.addEventListener("click", handleUpdateAvatar);

const api = new Api(configAPI);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    currentUser = userData;
    userEl.setUserInfo(currentUser);
    userEl.setUserAvatar(currentUser);
    cardsSection.setItems(cards);
    cardsSection.renderItems();
  })
  .catch((err) => {
    console.log("Один из промисов отклонен", err);
  });
