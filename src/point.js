import { OFFER_COUNT, PRICE, TYPES } from './const.js';
import { getDestination } from './destination.js';
import { getOffer } from './offer.js';
import { getDate, getRandomValue, getRandomInteger } from './utils.js';

//создание точки маршрутка
function getPoint(){
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(PRICE.MIN, PRICE.MAX),
    dateFrom: getDate({next: false}),
    dateTo: getDate({next: true}),
    destination: getDestination,
    isFavorite: Boolean(getRandomInteger(0,1)),
    offers: Array.from({length: OFFER_COUNT}, () => getOffer()),
    type: getRandomValue(TYPES)
  };
}

export{
  getPoint
};
