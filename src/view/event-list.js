import {createElement} from '../render.js';

function createEventList () {
  return (` <ul class="trip-events__list"></ul>`);
}

export default class EventList {
  getTemplate() {
    return createEventList ();
  }

  getElement() {
    if(!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
