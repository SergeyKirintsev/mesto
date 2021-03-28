"use strict";
import Section from "../components/Section";

import("./index.css");

import Card from "../components/Card.js";
import { initialCards, configValidate } from "../utils/constants.js";
import { PopupWithImage } from "../components/PopupWithImage";

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
