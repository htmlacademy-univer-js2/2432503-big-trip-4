import { EmptyListText } from '../const';
import AbstractView from '../framework/view/abstract-view';

function createEmptyListTemplate(filterType){
  return (` <section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
  <p class="trip-events__msg">${EmptyListText[filterType]}</p>
  </section>`);
}

export default class EmptyListView extends AbstractView{
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
