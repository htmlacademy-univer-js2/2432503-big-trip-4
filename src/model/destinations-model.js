//модели пункта назначения
export default class DestinationsModel{
  #service = null;
  #destinations = null;

  constructor(service){
    this.#service = service;
  }

  //получение модели
  get destinations(){
    return this.#destinations;
  }

  async init() {
    this.#destinations = await this.#service.destinations;

    return this.#destinations;
  }

  //получение пункта назначения по айди
  getByID(id){
    return this.#destinations.find((destination) => destination.id === id);
  }
}
