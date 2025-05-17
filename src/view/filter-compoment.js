import { createElement } from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFilterComponentTemplate() {
  return (
    `<div class="expense-filter">
            <label for="category-filter">Фильтр по категориям:</label>
            <select id="category-filter">
                <option value="all">Выберите категорию</option>
                <option value="all">Все</option>
                <option value="Food">Еда</option>
                <option value="Transport">Транспорт</option>
                <option value="Entertainment">Развлечения</option>
                <option value="Other">Другое</option>
            </select>
        </div>`
  );
}

export default class FilterComponent extends AbstractComponent {
  #onFilterChange;

  constructor({ onFilterChange }) {
    super();
    this.#onFilterChange = onFilterChange;
    this._bindHandlers();
  }

  get template() {
    return createFilterComponentTemplate();
  }

  _bindHandlers() {
    // используем свойство `element`, а не несуществующий getElement()
    this.element
      .querySelector('#category-filter')
      .addEventListener('change', this.#changeHandler);
  }

  #changeHandler = (evt) => {
    const value = evt.target.value;
    this.#onFilterChange(value);
  }
}
