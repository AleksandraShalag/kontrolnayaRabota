import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createBoardComponentTemplate() {
    return `
    <div class="container">
        <h1>Учет расходов</h1>

        
        <div class="formContainer"></div>
        <div class="filterContainer"></div>
        <div class="listContainer"></div>
    </div>
    `;
    
  }
  


export default class BoardComponent extends AbstractComponent{
  
  constructor() {
    super();
    this._element = null; // Приватное свойство вместо публичного
  }

  get template() {
    return createBoardComponentTemplate();
  }

}

