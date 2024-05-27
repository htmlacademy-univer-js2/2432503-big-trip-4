import { UpdateType } from '../const';
import Observable from '../framework/observable';
import { adaptToClient, updatePoint } from '../utils';

//описание  тoчки
export default class PointsModel extends Observable {
  #service = null;
  #points = [];
  #destinationsModel = null;
  #offersModel = null;

  constructor({apiService, destinationsModel, offersModel}){
    super();
    this.#service = apiService;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  //получение точки
  get points(){
    return this.#points;
  }

  async init() {

    try {

      await Promise.all([
        this.#destinationsModel.init(), this.#offersModel.init()
      ]);

      const points = await this.#service.points;
      this.#points = points.map(adaptToClient);
      this._notify(UpdateType.INIT, {
        isError: false
      });
    }

    catch(error) {
      this.#points = [];
      this._notify(UpdateType.INIT, {
        isError: true
      });
    }

  }

  async add(updateType, point) {
    try {
      const response = await this.#service.addPoint(point);
      const newPoint = adaptToClient(response);

      this.#points.push(newPoint);
      this._notify(updateType, newPoint);
    }

    catch(error) {
      throw new Error('Can\'t add point');
    }

  }

  async update(updateType, point) {
    try {
      const response = await this.#service.updatePoint(point);
      const updatedPoint = adaptToClient(response);

      this.#points = updatePoint(this.#points, updatedPoint);
      this._notify(updateType, updatedPoint);
    }

    catch(error) {
      throw new Error('Can\'t update point');
    }

  }

  async remove(updateType, point) {

    try {
      await this.#service.deletePoint(point);
      this.#points = this.#points.filter((item) => item.id !== point.id);
      this._notify(updateType);
    }

    catch(error) {
      throw new Error('Can\'t delete point');
    }
  }
}
