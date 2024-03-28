//описание  тoчки
export default class PointsModel {
  #service = null;
  #points = null;

  constructor(service){
    this.#service = service;
    this.#points = this.#service.points;
  }

  //получение точки
  get points(){
    return this.#points;
  }

}
