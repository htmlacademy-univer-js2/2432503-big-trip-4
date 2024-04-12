import { SORTING_ITEMS } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate(sortItem){
  return (` <div class="trip-sort__item  trip-sort__item--${(sortItem.type)}">
  <input id="sort-${sortItem.type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortItem.type}"
  ${(sortItem.defaultSelected ? 'checked' : '')} ${(sortItem.active) ? '' : 'disabled'}>
  <label class="trip-sort__btn" for="sort-${(sortItem.type)}">${(sortItem.type)}</label>
  </div>`)
}

function createSort() {
  return (` <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${(SORTING_ITEMS.map(createSortItemTemplate).join(''))}
  </form> `);
}

export default class Sort extends AbstractView{
  get template() {
    return createSort();
  }
}
