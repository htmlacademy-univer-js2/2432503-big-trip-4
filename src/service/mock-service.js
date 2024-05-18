import { DESTINATION_COUNT, OFFER_COUNT, POINT_COUNT, TYPES } from '../const';
import { getDestination } from '../destination';
import { getOffer } from '../offer';
import { getPoint } from '../point';
import { getRandomInteger, getRandomValue } from '../utils';

//сервис для моделей
export default class MockService {
  #destinations = [];
  #offers = [];
  #points = [];

  constructor (){
    this.#destinations = this.#generateDestinations();
    this.#offers = this.#generateOffers();
    this.#points = this.#generatePoints(this.destinations);
  }

  get destinations(){
    return this.#destinations;
  }

  get offers(){
    return this.#offers;
  }

  get points(){
    return this.#points;
  }

  #generateDestinations(){
    return Array.from({
      length: DESTINATION_COUNT
    }, () => getDestination());
  }

  #generateOffers(){
    return TYPES.map((type) => ({
      type,
      offers: Array.from({length: getRandomInteger(0, OFFER_COUNT)}, () => getOffer(type))
    }));
  }

  #generatePoints(destinations){
    return Array.from({
      length: getRandomInteger(0, POINT_COUNT)
    }, () => {
      const type = getRandomValue(TYPES);
      const offersByType = this.offers.find((offerByType) => offerByType.type === type);

      return getPoint(destinations, offersByType);
    });
  }
}
