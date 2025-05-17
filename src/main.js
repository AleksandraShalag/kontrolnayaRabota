
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import BoardComponent from './view/board-compoment.js';
import ItemModel from './model/item-model.js';
import { ITEM_FILTERS } from './const.js';
import { render } from './framework/render.js';

// === Создаём модель ===
const itemModel  = new ItemModel ();

const boardComponent = new BoardComponent();
const baseContainer = document.body;
render(boardComponent, baseContainer); 
// === Инициализируем презентер ===
const listContainer   = document.querySelector('.listContainer');
const filterContainer = document.querySelector('.filterContainer');
const formContainer    = document.querySelector('.formContainer');

const tasksBoardPresenter = new TasksBoardPresenter({
  model: itemModel ,
  filterContainer: filterContainer,
  formContainer: formContainer,
  listContainer: listContainer,
  filters: Object.values(ITEM_FILTERS),
});

tasksBoardPresenter.init();
