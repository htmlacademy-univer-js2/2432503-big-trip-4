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
  #isLoading = false;
  #isLoadingError = false;

  constructor({filterType, isLoading = false, isLoadingError = false}) {
    super();
    this.#filterType = filterType;
    this.#isLoading = isLoading;
    this.#isLoadingError = isLoadingError;
  }

  get template() {
    if (this.#isLoading) {
      return ' <p class="trip-events__msg">Loading...</p>';
    }

    if (this.#isLoadingError) {
      return ' <p class="trip-events__msg">Failed to load latest route information</p>';
    }
    return createEmptyListTemplate(this.#filterType);
  }
}
