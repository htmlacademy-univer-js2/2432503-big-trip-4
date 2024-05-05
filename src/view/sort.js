import AbstractView from '../framework/view/abstract-view.js';

function createSort(sortTypes, currentSortType) {
  return (` <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortTypes.map(({type, active}) => ` <div class="trip-sort__item  trip-sort__item--${(type)}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}"
      ${(currentSortType === type ? 'checked' : '')} ${active !== -1 ? '' : 'disabled'}>
      <label class="trip-sort__btn" for="sort-${(type)}">${(type)}</label>
      </div>`).join('')}
  </form> `);
}

export default class Sort extends AbstractView{
  #sortTypes = null;
  #currentSortType = null;
  #onSortTypeChange = null;

  constructor({sortTypes, currentSortType, onSortTypeChange}) {
    super();
    this.#sortTypes = sortTypes;
    this.#currentSortType = currentSortType;
    this.#onSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#onSortTypeChangeHandler);
  }

  get template() {
    return createSort(this.#sortTypes, this.#currentSortType);
  }

  #onSortTypeChangeHandler = (event) => {
    event.preventDefault();
    this.#onSortTypeChange(event.target.value.split('-')[1]);
  };
}
