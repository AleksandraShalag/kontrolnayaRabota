import ItemComponent from '../view/item-compoment.js';
import ListComponent from '../view/list-compoment.js';
import {render} from '../framework/render.js';
import AddFormComponent from '../view/add-form-compoment.js';
import FilterComponent from '../view/filter-compoment.js';
import EditFormComponent from '../view/edit-component.js';

export default class TasksBoardPresenter {
  #itemModel = null;
  #filters = null;
  #filterContainer;
  #formContainer;
  #listContainer;

  #filterComponent;
  #addFormComponent;
  #listComponent;
  #editFormComponent

  constructor({ model, filterContainer, formContainer, listContainer, filters }) {
    this.#itemModel           = model;
    this.#filterContainer = filterContainer;
    this.#formContainer   = formContainer;
    this.#listContainer   = listContainer;
    this.#filters          = filters;

    // Подписываемся на изменения модели
    this.#itemModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    // 1. Рендерим форму и фильтр
    this.#renderForm();
    this.#renderFilter();

    // 2. Рендерим контейнер списка (пустой)
    this.#listComponent = new ListComponent();
    render(this.#listComponent, this.#listContainer);

    // 3. Начальная отрисовка всех книг
    this.#renderBoard();
  }

  #renderBoard() {
      const items = this.#itemModel.items;
      
      // Находим <ul> внутри уже отрисованного ItemListComponent
      
      const listContainer = this.#listComponent.element.querySelector('#expense-list');

      const itemComponent= this.#renderItemComponent(listContainer, items);
  }

  // --- Формирование компонента формы добавления и подписка на submit ---
  #renderForm() {
      this.#addFormComponent = new AddFormComponent({
      onSubmit: this.handleAdd.bind(this)
    });
    render(this.#addFormComponent, this.#formContainer);
  }

  handleAdd() {
    const formEl   = this.#addFormComponent.element;
    const titleEl  = formEl.querySelector('#expense-name');
    const shortinfoEl = formEl.querySelector('#expense-amount');
    const filterEl  = formEl.querySelector('#expense-status');

    const title  = titleEl.value.trim();
    const shortinfo = shortinfoEl.value.trim();
    const filter  = filterEl.value;

    if (!title || !shortinfo || !filter) {
      return;
    }

    // добавляем в модель
    this.#itemModel.addItem(title, shortinfo, filter);

    
  }

  // --- Формирование компонента фильтра
  #renderFilter() {
    this.#filterComponent = new FilterComponent({
      filters:          this.#filters,
      onFilterChange:  this.handleFilterChange.bind(this)
    });
    render(this.#filterComponent, this.#filterContainer);
  }
  
 handleFilterChange(filter) {
    console.log(filter); 
    if (filter === 'all') {
      this.#itemModel.resetFilter();
    } else {
      this.#itemModel.filterItems(filter);
    }
  }

  #renderItemList(container){
    const itemListComponent = new ListComponent();
    render(itemListComponent, container);
    return itemListComponent;
  }


  

  


  #renderItemComponent(container, items){

    items.forEach(item => {
        console.log(item)
        const itemComponent = new ItemComponent({item:item, onDelete: this.#handleDeleteItem.bind(this), onEdit:   this.#handleEditItem.bind(this)});
        render(itemComponent,container);

      });
  }


  #handleEditItem(item) {
    
    this.#editFormComponent = new EditFormComponent({
      item,
      onSubmit: this.#handleSaveEditedItem.bind(this),
      onCancel: this.#closeEditModal.bind(this)
    });
    render(this.#editFormComponent, document.body);
  }

  #handleSaveEditedItem(id, { title, shortinfo, filterKey }) {
    // Обновляем в модели (filterKey преобразуется в русский внутри модели)
    this.#itemModel.updateItem(id, { title, shortinfo, filter: filterKey });
    this.#closeEditModal();
  }

  #closeEditModal() {
    // Удаляем модалку из DOM
    this.#editFormComponent.element.remove();
    this.#editFormComponent = null;
  }

  #handleDeleteItem(itemId) {
    // 1) удаляем в модели
    this.#itemModel.deleteItem(itemId);
    // 2) модель сама вызовет _notifyObservers → #renderBoard
  }

 

  createItem(){
    
    // Считываем значения полей
    const titleEl = document.querySelector('#item-title');
    const shortinfoEl = document.querySelector('#item-shortinfo');
    const filterEl = document.querySelector('#item-filter');

    const title = titleEl.value.trim();
    const shortinfo = shortinfoEl.value.trim();
    const filter = filterEl.value;

    // Проверяем, что все поля заполнены
    if (!title || !shortinfo || !filter) {
      return;
    }

    this.#itemModel.addItem(title, shortinfo, filter);

    // Очищаем поля формы
    titleEl.value = '';
    shortinfoEl.value = '';
    filterEl.value = '';
  }


  #handleModelChange(){
    
    this.#clearBoard();
    this.init();
  }

  #clearBoard(){
    this.#filterContainer.innerHTML ='';
    this.#formContainer.innerHTML ='';
    this.#listContainer.innerHTML ='';
  }

  get items(){
    return this.#itemModel.items;
  }

}
