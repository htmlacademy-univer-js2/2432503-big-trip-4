import AbstractView from '../framework/view/abstract-view';

function createNewPointTemplate() {
  return `
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `;
}

export default class NewPoint extends AbstractView {
  #onClick = null;

  constructor ({onClick}) {
    super();
    this.#onClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewPointTemplate();
  }

  #clickHandler = (event) => {
    event.preventDefault();
    this.#onClick();
  };
}
