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

  add(updateType, point) {
    this.#points.push(point);
    this._notify(updateType, point);
  }

  async update(updateType, point) {
    try {
      const response = await this.#service.updatePoint(point);
      const updatedPoint = adaptToClient(response);

      this.#points = updatePoint(this.#points, updatedPoint);
      this._notify(updateType, updatedPoint);
    }

    catch(error) {
      throw new Error('Can\'t updatePoint');
    }

  }

  remove(updateType, point) {
    const index = this.#points.findIndex((item) => item.id === point.id);

    this.#points.splice(index, 1);
    this._notify(updateType, point);
  }
}
