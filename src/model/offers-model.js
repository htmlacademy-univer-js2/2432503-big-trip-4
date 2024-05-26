//описание пункта назначения
export default class OffersModel {
  #service = null;
  #offers = null;

  constructor(service){
    this.#service = service;
  }

  //получение модели
  get offers(){
    return this.#offers;
  }

  async init() {
    this.#offers = await this.#service.offers;

    return this.#offers;
  }

  //получение описания
  getByType(type){
    return this.#offers.find((offer) => offer.type === type).offers;
  }

}
