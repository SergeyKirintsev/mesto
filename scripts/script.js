let nameProfile = document.querySelector(".profile__name");
let jobProfile = document.querySelector(".profile__profession");

let popup = document.querySelector(".popup");
let formElement = popup.querySelector(".popup__form");

let nameInput = formElement.querySelector(".popup__name");
let jobInput = formElement.querySelector(".popup__job");

function togglePopupOpened() {
  popup.classList.toggle("popup_opened");
}

function openPopup() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  togglePopupOpened();
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value.trim();
  jobProfile.textContent = jobInput.value.trim();

  togglePopupOpened();
}

let editProfileBtn = document.querySelector(".profile__edit-btn");
let closePopupBtn = document.querySelector(".popup__close-btn");

editProfileBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", togglePopupOpened);

formElement.addEventListener("submit", formSubmitHandler);
