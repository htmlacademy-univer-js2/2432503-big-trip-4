import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemsTemplate({filters}) {
  const filterItems = filters.map((filter) =>
  (` <div class="trip-filters__filter">
  <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}"
  ${(filter.defaultSelected ? 'checked' : '')} ${(filter.hasPoints) ? '' : 'disabled'}>
  <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
  </div>`)).join('');

  return filterItems;
}

function createFilter({filters}) {
  return (` <form class="trip-filters" action="#" method="get">
  ${createFilterItemsTemplate({filters})}
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`);
}

export default class Filter extends AbstractView {
  #filters = [];
  #onItemChange = null;
  #itemChangeHandler = (event) => {
    event.preventDefault();
    this.#onItemChange?.(event.target.dataset.value);
  };

  constructor(filters, onItemChange){
    super();
    this.#filters = filters;
    this.#onItemChange = onItemChange;
    this.element.addEventListener('change', this.#itemChangeHandler);
  }

  get template() {
    return createFilter({
      filters: this.#filters
    });
  }
}
