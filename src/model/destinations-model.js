import { getRandomValue } from "../utils";

//модели пункта назначения
export default class DestinationsModel{
  constructor(service){
    this.service = service;
    this.destinations = this.service.getDestinations();
  }

  //получение модели
  get(){
    return this.destinations;
  }

  //получение пункта назначения по айди
  getByID(id){
    return this.destinations.find((destination) => destination.id === id);
  }

  getRandomDestination(){
    return getRandomValue(this.destinations);
  }
}
