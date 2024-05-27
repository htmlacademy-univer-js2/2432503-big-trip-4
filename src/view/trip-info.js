import AbstractView from '../framework/view/abstract-view.js';
import { getInfoCost, getInfoDuration, getInfoTitle } from '../utils.js';

function createTripInfo ({isEmpty, title, duration, cost}) {
  return `${isEmpty ? '' : ` <section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${title}</h1>

    <p class="trip-info__dates">${duration}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>
</section> `}`;
}

export default class TripInfo extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor ({points, destinations, offers}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfo ({
      isEmpty : this.#points.length === 0,
      title: getInfoTitle(this.#points, this.#destinations),
      duration: getInfoDuration(this.#points),
      cost: getInfoCost(this.#points, this.#offers)
    });
  }
}
