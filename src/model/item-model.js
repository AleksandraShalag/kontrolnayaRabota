import { items as initialItems } from "../mock/items.js";
import { generateID }          from "../utils.js";
import { ITEM_FILTERS } from "../const.js";

export default class ItemModel {
  #allItems    = [];
  #boardItems  = [];
  #observers   = [];

  constructor() {
    this.#allItems   = [...initialItems];
    this.#boardItems = [...initialItems];
  }

  get items() {
    return this.#boardItems;
  }

  filterItems(filter) {
    console.log(filter)
    const filterTitle = ITEM_FILTERS[filter]
      ? ITEM_FILTERS[filter].title
      : filter;
    console.log(filterTitle)
    this.#boardItems = this.#allItems.filter(b => b.filter === filterTitle);
    this._notifyObservers();
  }

  resetFilter() {
    this.#boardItems = [...this.#allItems];
    this._notifyObservers();
  }

  addItem(title, shortinfo, filter) {
    // переводим ключ жанра в русское название
    const filterTitle = ITEM_FILTERS[filter]
      ? ITEM_FILTERS[filter].title
      : filter;
    
    const newItem = { id: generateID(), title, shortinfo, filter: filterTitle };
    this.#allItems.push(newItem);
    this.#boardItems.push(newItem);
    this._notifyObservers();
    return newItem;
  }

  deleteItem(id) {
    this.#allItems   = this.#allItems.filter(b => b.id !== id);
    this.#boardItems = this.#boardItems.filter(b => b.id !== id);
    this._notifyObservers();
  }

  updateItem(id, { title, shortinfo, filter }) {

    const filterTitle = ITEM_FILTERS[filter]
      ? ITEM_FILTERS[filter].title
      : filter;
      
    this.#allItems = this.#allItems.map(b =>
      b.id === id
        ? { ...b, title, shortinfo, filter: filterTitle }
        : b
    );
    this.#boardItems = this.#boardItems.map(b =>
      b.id === id
        ? { ...b, title, shortinfo, filter: filterTitle }
        : b
    );
    this._notifyObservers();
}

  addObserver(fn) {
    this.#observers.push(fn);
  }

  removeObserver(fn) {
    this.#observers = this.#observers.filter(obs => obs !== fn);
  }

  _notifyObservers() {
    this.#observers.forEach(fn => fn());
  }
}
