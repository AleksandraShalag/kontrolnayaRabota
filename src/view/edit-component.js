import { AbstractComponent } from '../framework/view/abstract-component.js';

function createEditItemFormTemplate(item) {
  return `
    <div class="modal-overlay">
      <div class="modal-content">
        <h2>Редактировать</h2>
        <form id="edit-item-form">
          <input type="text" id="item-title"  placeholder="Наименование расхода" required value="${item.title}" />
          <input type="number" id="item-shortinfo" placeholder="Cтоимость" min="0" required value = "${item.shortinfo}"/>
          <select id="item-filter" required>
            <option value="">Выбрать категорию</option>
            <option value="Food"   ${item.filter === 'Еда' ? 'selected' : ''}>Еда</option>
            <option value="Entertainment"   ${item.filter === 'Развлечения'      ? 'selected' : ''}>Развлечения</option>
            <option value="Transport"   ${item.filter === 'Транспорт' ? 'selected' : ''}>Транспорт</option>
            <option value="Other"   ${item.filter === 'Другое'      ? 'selected' : ''}>Другое</option>
          </select>
          <div class="modal-buttons">
            <button type="submit">Сохранить</button>
            <button type="button" id="edit-cancel-btn">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export default class EditFormComponent extends AbstractComponent {
  #item;
  #onSubmit;
  #onCancel;

  constructor({ item, onSubmit, onCancel }) {
    super();
    this.#item     = item;
    this.#onSubmit = onSubmit;
    this.#onCancel = onCancel;

    // после отрисовки нужно навесить хендлеры
    this.element
      .querySelector('#edit-item-form')
      .addEventListener('submit', this.#submitHandler);

    this.element
      .querySelector('#edit-cancel-btn')
      .addEventListener('click', this.#cancelHandler);
  }

  get template() {
    return createEditItemFormTemplate(this.#item);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    const formEl   = this.element;
    const title    = formEl.querySelector('#item-title').value.trim();
    const shortinfo   = formEl.querySelector('#item-shortinfo').value.trim();
    const filterKey = formEl.querySelector('#item-filter').value;

    if (!title || !shortinfo || !filterKey) {
      return;
    }
    this.#onSubmit(this.#item.id, { title, shortinfo, filterKey });
  }

  #cancelHandler = () => {
    this.#onCancel();
  }
}
