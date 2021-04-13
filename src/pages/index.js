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

function deleteCardWithConfirm(cardId, cardEl) {
  api
    .deleteCard(cardId)
    .then(() => {
      cardEl.style.transition = "0.6s";
      cardEl.style.transform = "rotateY(90deg)";

      setTimeout(() => {
        cardEl.remove();
        cardEl = null;
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
      handleDeleteCard: function (cardId, cardEl) {
        confirmAction()
          .then(() => {
            deleteCardWithConfirm(cardId, cardEl);
          })
          .catch(() => console.log("отказ от удаления карточки"));
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
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
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
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const avatarPopup = new PopupWithForm(avatarPopupSelector, {
  handleFormSubmit: function ({ avatar }) {
    this.savingData();
    api
      .updateAvatar(avatar)
      .then((userData) => {
        userEl.setUserAvatar(userData);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log("Обновление аватара", err);
      });
  },
});

const handleUpdateAvatar = () => {
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
