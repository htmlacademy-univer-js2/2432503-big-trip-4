import { OFFERS, PRICE } from './const';
import { getRandomInteger, getRandomValue } from './utils';

function getOffer(){
  //структура ОПИСАНИЯ
  const offer = getRandomValue(OFFERS);
  return {
    id: crypto.randomUUID(),
    title: offer,
    price: getRandomInteger(PRICE.MIN, (PRICE.MAX / 10))
  };
}

export{
  getOffer
};
