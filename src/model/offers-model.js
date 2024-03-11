import { getRandomValue } from '../utils';

//описание пункта назначения
export default class OffersModel {
  constructor(service){
    this.service = service;
    this.offers = this.service.getOffers();
  }

  //получение модели
  get(){
    return this.offers;
  }

  //получение описания
  getByType(type){
    return this.offers.find((offer) => offer.type === type).offers;
  }

  getRandomOffer(){
    return getRandomValue(this.offers);
  }

}
