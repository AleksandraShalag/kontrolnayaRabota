import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createItemComponentTemplate(item) {
  console.log(item)
  return (`
    <li class="item" data-id="${item.id}">
      <div class="item__info">
        <h3 class="item__title">${item.title}</h3>
        <p class="item__shortinfo"> ${item.shortinfo}</p>
        <p class="item__filter">${item.filter || 'Не указан'}</p>
      </div>
      
      <div class="item__controls">
        <button class="item__edit-btn" title="Редактировать">✎</button>
        <button class="item__delete-btn" title="Удалить">&times;</button>
      </div>

    </li>
  `);
}

export default class ItemComponent extends AbstractComponent {
  #item = null;
  #deleteHandler = null;
  #onEdit;

  constructor({ item, onDelete,onEdit }) {
    super();
    this.#item = item;
    this.#deleteHandler = onDelete;
    this.#onEdit   = onEdit;
    this._bindHandlers();
  }

  get template() {
    return createItemComponentTemplate(this.#item);
  }

  _bindHandlers() {
    const el = this.element;
    // Удаление
    el.querySelector('.item__delete-btn')
      .addEventListener('click', () => this.#deleteHandler(this.#item.id));

    // Редактирование
    el.querySelector('.item__edit-btn')
      .addEventListener('click', () => this.#onEdit(this.#item));
  }

  getElement() {
    const element = super.getElement();
    this._bindHandlers();
    return element;
  }
}
