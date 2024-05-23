import { FilterTypes } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemsTemplate(filter, activeFilter, checkedFilter) {
  return ` <div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" data-filter-type="${filter}" value="${filter}"
    ${(checkedFilter ? 'checked' : '')} ${(activeFilter) ? '' : 'disabled'}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>`;

}

function createFilter({activeFilters, selectedFilter}) {
  return (` <form class="trip-filters" action="#" method="get">
  ${Object.values(FilterTypes).map((filter) => createFilterItemsTemplate(filter, activeFilters.includes(filter), filter === selectedFilter)).join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`);
}

export default class Filter extends AbstractView {
  #activeFilters = [];
  #selectedFilter = null;
  #onItemChange = null;
  #itemChangeHandler = (event) => {
    event.preventDefault();
    this.#onItemChange?.(event.target.dataset.filterType);
  };

  constructor({activeFilters, selectedFilter, onItemChange}){
    super();
    this.#activeFilters = activeFilters;
    this.#onItemChange = onItemChange;
    this.#selectedFilter = selectedFilter;
    this.element.addEventListener('change', this.#itemChangeHandler);
  }

  get template() {
    return createFilter({
      activeFilters: this.#activeFilters,
      selectedFilter: this.#selectedFilter
    });
  }
}
