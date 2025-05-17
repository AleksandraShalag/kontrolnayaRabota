import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createListComponentTemplate() {
  return (
    `<div class="expense-list">
            <h2>Список расходов</h2>
            <ul id="expense-list">
                
            </ul>
        </div>`
  );
}

export default class ListComponent extends AbstractComponent{
  constructor() {
    super();
  }

  get template() {
    return createListComponentTemplate();
  }

}