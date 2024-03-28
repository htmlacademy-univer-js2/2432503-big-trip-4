import { getRandomValue } from '../utils';

//описание пункта назначения
export default class OffersModel {
  #service = null;
  #offers = null;

  constructor(service){
    this.#service = service;
    this.#offers = this.#service.offers;
  }

  //получение модели
  get offers(){
    return this.#offers;
  }

  //получение описания
  getByType(type){
    return this.#offers.find((offer) => offer.type === type).offers;
  }

  getRandomOffer(){
    return getRandomValue(this.#offers);
  }

}
