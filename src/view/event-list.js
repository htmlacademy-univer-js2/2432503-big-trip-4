import AbstractView from '../framework/view/abstract-view.js';
import {createElement} from '../render.js';

function createEventList () {
  return (`
  <ul class="trip-events__list"></ul>
  `);
}

export default class EventList extends AbstractView {
  get template() {
    return createEventList ();
  }
}
