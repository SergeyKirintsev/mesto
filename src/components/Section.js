export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItems(items) {
    this._items = items;
  }

  renderItems() {
    this._clear();
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }

  _clear() {
    this._container.innerHTML = "";
  }

  addItem(element) {
    this._container.prepend(this._renderer(element));
  }
}
