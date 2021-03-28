import Popup from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const imgEl = this._popupEl.querySelector(".popup__image");
    const imgCaption = this._popupEl.querySelector(".popup__caption");
    imgEl.src = link;
    imgEl.alt = name;
    imgCaption.textContent = name;
    super.open();
  }
}
