import Sort from '../view/sort';
import EventList from '../view/event-list';
import {render} from '../framework/render';
import {updatePoint} from '../utils';
import EmptyListView from '../view/empty-list';
import PointPresenter from './point-presenter';


//отрисовывает все
export default class BoardPresenter {
  #tripContainer = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];
  #pointPresenters = new Map();

  constructor({tripContainer, offersModel, pointsModel}){

    this.#tripContainer = tripContainer;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  #eventList = new EventList();
  #sort = new Sort();

  init() {
    this.#points = [...this.#pointsModel.points];

    if (this.#points.length === 0){
      render(new EmptyListView(), this.#tripContainer);
      return;
    }

    render (this.#sort, this.#tripContainer);
    render (this.#eventList, this.#tripContainer);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      container: this.#eventList.element,
      offersModel: this.#offersModel,
      pointsModel: this.#pointsModel,
      onDataChange: this.#onDataChange,
      onModeChange: this.#onModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #onDataChange = (updatedPoint, offer) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, offer);
  };

  #onModeChange = () => {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.reset());
  };
}
