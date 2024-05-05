import Sort from '../view/sort';
import EventList from '../view/event-list';
import {remove, render, replace} from '../framework/render';
import {updatePoint} from '../utils';
import EmptyListView from '../view/empty-list';
import PointPresenter from './point-presenter';
import { ACTIVE_SORT_TYPES, SortOptions, SortTypes } from '../const';


//отрисовывает все
export default class BoardPresenter {
  #tripContainer = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];
  #pointPresenters = new Map();
  #sort = null;

  #currentSortType = SortTypes.DAY;

  constructor({tripContainer, offersModel, pointsModel}){

    this.#tripContainer = tripContainer;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  #eventList = new EventList();

  init() {
    this.#points = SortOptions[this.#currentSortType]([...this.#pointsModel.points]);

    if (this.#points.length === 0){
      render(new EmptyListView(), this.#tripContainer);
      return;
    }

    this.#renderSort();
    render (this.#eventList, this.#tripContainer);

    this.#renderPoints();
  }

  #renderSort = () => {
    const prevSort = this.#sort;
    const sortTypes = Object.values(SortTypes).map((sortType) => ({
      type: sortType,
      active: ACTIVE_SORT_TYPES.indexOf(sortType)
    }));
    this.#sort = new Sort({
      sortTypes : sortTypes,
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#sortTypeChangeHandler
    });

    if (prevSort) {
      replace(this.#sort, prevSort);
      remove(prevSort);
    }
    else {
      render(this.#sort, this.#tripContainer);
    }
  };

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    this.#points = SortOptions[this.#currentSortType](this.#points);
  };

  #renderPoints = () => {
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  };

  #clearPointsList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };

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

  #onDataChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #onModeChange = () => {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.reset());
  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderSort();
    this.#points.forEach((point) => this.#renderPoint(point));
  };
}
