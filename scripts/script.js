let nameProfile = document.querySelector(".profile__name");
let jobProfile = document.querySelector(".profile__profession");

let popup = document.querySelector(".popup");
let formElement = popup.querySelector(".popup__form");

let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_job");

let editProfileBtn = document.querySelector(".profile__edit-btn");
let closePopupBtn = document.querySelector(".popup__close-btn");

function closePopup() {
  popup.classList.remove("popup_opened");
}

function openPopup() {
  nameInput.value = nameProfile.textContent.trim();
  jobInput.value = jobProfile.textContent.trim();
  popup.classList.add("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value.trim();
  jobProfile.textContent = jobInput.value.trim();

  closePopup();
}

editProfileBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);

formElement.addEventListener("submit", formSubmitHandler);
