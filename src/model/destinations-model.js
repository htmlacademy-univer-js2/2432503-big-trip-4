//модели пункта назначения
export default class DestinationsModel{
  #service = null;
  #destinations = null;

  constructor(service){
    this.#service = service;
    this.#destinations = this.#service.destinations;
  }

  //получение модели
  get destinations(){
    return this.#destinations;
  }

  //получение пункта назначения по айди
  getByID(id){
    return this.#destinations.find((destination) => destination.id === id);
  }
}
