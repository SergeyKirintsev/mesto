export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(initialCards) {
    this._clear();
    initialCards.forEach((item) => {
      this._renderer(item);
    });
  }

  _clear() {
    this._container.innerHTML = "";
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
