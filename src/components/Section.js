export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._clear();
    this.items.forEach((item) => {
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
