import flatpickr from 'flatpickr';
import { ButtonText, POINT_EMPTY, TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { formatStringToDateToTime } from '../utils.js';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

function createPointCitiesOptions(destinations){
  return (`
  <datalist id="destination-list-1">
    ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
  </datalist>
  `);
}

function createPointPhotos(destination){
  return (`
  <div class="event__photos-tape">
    ${destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">` ).join('')}
  </div>
  `);
}

function createPointTypes(currentType, isDisable){
  return TYPES.map((type) =>
    `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}"${currentType === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}${currentType === type ? 'checked' : ''}${isDisable ? 'disabled' : ''}</label>
    </div>`).join('');
}

function createPointOffers(offers, selectedOffers, isDisable){
  const offerItems = offers.offers.map((offer) => {
    const offerName = offer.title.replace(' ', '').toLowerCase();
    return (`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${offerName}" ${selectedOffers.includes(offer.id) ? 'checked' : ''}${isDisable ? 'disabled' : ''}>
    <label class="event__offer-label" for="${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
    </div>`);}).join('');

  return (`<div class="event__available-offers">${offerItems}</div>`);
}

function createButton(isCreating, isDisable, isDeleting){
  let text;
  if (isCreating) {
    text = ButtonText.CANCEL;
  }

  else{
    text = isDeleting ? ButtonText.LOAD_DELETE : ButtonText.DELETE;
  }

  return `<button class="event__reset-btn" type="reset" ${isDisable ? 'disabled' : ''}>${text}</button>`;
}

function createPointEdit({state, destinations, pointOffers, isCreating}) {

  const {point, isDisable, isSaving, isDeleting} = state;
  const currentDestination = destinations.find((destination) => destination.id === point.destination);
  const {price, dateFrom, dateTo, offers, type} = point;
  const currentOffers = pointOffers.find((offer) => offer.type === type);
  const destinationName = (currentDestination) ? currentDestination.name : '';
  return (` <li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createPointTypes(type, isDisable)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type[0].toUpperCase() + type.slice(1)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destinationName)}" list="destination-list-1" ${isDisable ? 'disabled' : ''}>
        ${createPointCitiesOptions(destinations)}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? formatStringToDateToTime(dateFrom) : ''}"${isDisable ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? formatStringToDateToTime(dateTo) : ''}"${isDisable ? 'disabled' : ''}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(String(price))}"${isDisable ? 'disabled' : ''}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit"${isDisable ? 'disabled' : ''}>${isSaving ? ButtonText.LOAD_SAVE : ButtonText.SAVE}</button>
      ${createButton(isCreating, isDisable, isDeleting)}
       ${isCreating ? '' : `<button class="event__rollup-btn" type="button">
       <span class="visually-hidden">Open event</span>
     </button>`}
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        ${createPointOffers(currentOffers, offers, isDisable)}
      </section>

      ${currentDestination ? `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${currentDestination.description}</p>

      <div class="event__photos-container">
                    ${createPointPhotos(currentDestination)}
      </div>
      </section>` : ''}
    </section>
  </form>
</li> `);
}

export default class PointEdit extends AbstractStatefulView {
  #point = null;
  #destinations = null;
  #pointOffers = null;
  #isCreating = null;

  #onRollUpClick = null;
  #onSubmitForm = null;
  #onDeleteClick = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  #rollUpClickHandler = (event) => {
    event.preventDefault();
    this.#onRollUpClick();
  };

  #submitFormHandler = (event) => {
    event.preventDefault();
    this.#onSubmitForm(this._state.point);
  };

  #deleteClickHandler = (event) => {
    event.preventDefault();
    this.#onDeleteClick(PointEdit.parseStateToPoint(this._state.point));
  };

  constructor({ point = POINT_EMPTY, destinations, pointOffers, isCreating, onRollUpClick, onSubmitForm, onDeleteClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#pointOffers = pointOffers;
    this.#isCreating = isCreating;

    this.#onRollUpClick = onRollUpClick;
    this.#onSubmitForm = onSubmitForm;
    this.#onDeleteClick = onDeleteClick;

    this._setState(PointEdit.parsePointToState({point}));
    this._restoreHandlers();
  }

  get template() {
    return createPointEdit ({
      state: this._state,
      destinations: this.#destinations,
      pointOffers: this.#pointOffers,
      isCreating: this.#isCreating
    });
  }

  _restoreHandlers(){
    if (!this.#isCreating){
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpClickHandler);
    }
    this.element.querySelector('form').addEventListener('submit', this.#submitFormHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);

    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePriceHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#changeOffersHandler);

    this.#setDatepicker();
  }

  static parsePointToState(point){
    return {
      ...point,
      isDisable: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToPoint(state) {
    const point = {
      ...state
    };

    delete point.isDisable;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

  reset = (point) => this.updateElement({point});

  //обработчик события изменения типа
  #changeTypeHandler = (event) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: event.target.value,
        offers: []
      }
    });
  };

  //обработчик события изменения пункта назначения
  #changeDestinationHandler = (event) => {
    const currentDestination = this.#destinations.find((destination) => destination.name === event.target.value);
    this.updateElement({
      point: {
        ...this._state.point,
        destination: currentDestination.id
      }
    });
  };

  //обработчик события изменения цены
  #changePriceHandler = (event) => {
    this._setState({
      point: {
        ...this._state.point,
        price: event.target.valueAsNumber
      }
    });
  };

  //обработчик события изменения доп.услуг
  #changeOffersHandler = () => {
    const checkedOffers = [...this.element.querySelectorAll('.event__offer-checkbox:checked')];
    this._setState({
      point: {
        ...this._state.point,
        offers: checkedOffers.map((offer) => offer.id)
      }
    });
  };

  //установка времени
  #setDatepicker = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const dateConfig = {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      locale: {firstDayOfWeek: 1},
      'time_24hr' : true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement, {
        ...dateConfig,
        defaultDate: this._state.point.dateFrom,
        maxDate: this._state.point.dateTo,
        onClose: this.#closeDateFromHandler
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement, {
        ...dateConfig,
        defaultDate: this._state.point.dateTo,
        maxDate: this._state.point.dateFrom,
        onClose: this.#closeDateToHandler
      }
    );
  };

  //обработчик закрытия начала пути
  #closeDateFromHandler = ([date]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: date
      }
    });

    this.#datepickerTo.set('minDate', this._state.point.dateFrom);
  };

  //обработчик закрытия конца пути
  #closeDateToHandler = ([date]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: date
      }
    });

    this.#datepickerFrom.set('maxDate', this._state.point.dateFrom);
  };

  //удаление элемента
  removeElement = () => {
    super.removeElement();
    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };
}
