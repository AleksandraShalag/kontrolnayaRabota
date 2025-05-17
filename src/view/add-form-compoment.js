import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createAddFormComponentTemplate() {
    return(
         `<div class="expense-form">
            <h2>Добавить расходы</h2>
            <form id="expense-form">
                <div>
                <label for="expense-name">Наименование расхода:</label>
                <input type="text" id="expense-name" placeholder="Например, еда" required />
                </div>
                <div>
                <label for="expense-amount">Стоимость:</label>
                <input type="number" id="expense-amount" placeholder="Amount" min="0" required />
                </div>
                <div>
                <label for="expense-status">Категория:</label>
                <select id="expense-status" required>
                    <option value="Food">Еда</option>
                    <option value="Transport">Транспорт</option>
                    <option value="Entertainment">Развлечения</option>
                    <option value="Other">Другое</option>
                </select>
                </div>
                <button type="submit">Добавить расходы</button>
            </form>
        </div>`

        

        
    );
}


export default class AddFormComponent extends AbstractComponent {
  #onSubmit = null;

  constructor({ onSubmit }) {
    super();
    this.#onSubmit = onSubmit;
    this.element
      .querySelector('#expense-form')
      .addEventListener('submit', this.#submitHandler);
  }

  get template() {
    return createAddFormComponentTemplate();
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    if (typeof this.#onSubmit === 'function') {
      this.#onSubmit(evt);
    }
  }
}

