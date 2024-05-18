import { PRICE } from './const.js';
import { getDate, getRandomValue, getRandomInteger } from './utils.js';

//создание точки маршрутка
function getPoint(destinations, offers){
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(PRICE.MIN, PRICE.MAX),
    dateFrom: getDate({next: false}),
    dateTo: getDate({next: true}),
    destination: getRandomValue(destinations),
    isFavorite: Boolean(getRandomInteger(0,1)),
    offers: offers,
    type: offers.type
  };
}

export{
  getPoint
};
