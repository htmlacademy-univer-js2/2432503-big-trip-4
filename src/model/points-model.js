import Observable from '../framework/observable';

//описание  тoчки
export default class PointsModel extends Observable {
  #service = null;
  #points = null;

  constructor(service){
    super();
    this.#service = service;
    this.#points = this.#service.points;
  }

  //получение точки
  get points(){
    return this.#points;
  }

  add(UpdateType, point) {
    this.#points.push(point);
    this._notify(UpdateType, point);
  }

  update(UpdateType, point) {
    const index = this.#points.findIndex((item) => item.id === point.id);

    if (index === -1) {
      throw new Error('can\'t find point');
    }

    this.#points[index] = point;
    this._notify(UpdateType, point);
  }

  remove(UpdateType, point) {
    const index = this.#points.findIndex((item) => item.id === point.id);

    this.#points.splice(index, 1);
    this._notify(UpdateType, point);
  }
}

