const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

let nameProfile = document.querySelector(".profile__name");
let jobProfile = document.querySelector(".profile__profession");

let popup = document.querySelector(".popup");
let formElement = popup.querySelector(".popup__form");

let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_job");

let editProfileBtn = document.querySelector(".profile__edit-btn");
let closePopupBtn = document.querySelector(".popup__close-btn");

editProfileBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);

formElement.addEventListener("submit", formSubmitHandler);

const listContainerEl = document.querySelector(".elements__list");
const templateEl = document.querySelector(".template");

function getCard({ name, link }) {
  const newCard = templateEl.content.cloneNode(true);

  const headerEl = newCard.querySelector(".elements__text");
  headerEl.textContent = name;

  const removeBtn = newCard.querySelector(".elements__trash-btn");
  removeBtn.addEventListener("click", handleDelete);

  const likeBtn = newCard.querySelector(".elements__like-btn");
  likeBtn.addEventListener("click", handleToggleLike);

  const imgEl = newCard.querySelector(".elements__img");
  // debugger;
  imgEl.setAttribute("src", link);
  imgEl.setAttribute("alt", name);

  return newCard;
}

function renderCard(card) {
  listContainerEl.prepend(card);
}

function handleDelete(event) {
  const targetEl = event.target;
  const targetItem = targetEl.closest(".elements__element");
  targetItem.remove();
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function openPopup() {
  nameInput.value = nameProfile.textContent.trim();
  jobInput.value = jobProfile.textContent.trim();
  popup.classList.add("popup_opened");
}

function formSubmitHandler(event) {
  event.preventDefault();

  nameProfile.textContent = nameInput.value.trim();
  jobProfile.textContent = jobInput.value.trim();

  closePopup();
}

function handleToggleLike(event) {
  event.target.classList.toggle("elements__like-btn_active");
}

initialCards.forEach((card) => renderCard(getCard(card)));
