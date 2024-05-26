import Sort from '../view/sort';
import EventList from '../view/event-list';
import {RenderPosition, remove, render, replace} from '../framework/render';
import {sortPointsByDay, sortPointsByPrice, sortPointsByTime, updatePoint} from '../utils';
import EmptyListView from '../view/empty-list';
import PointPresenter from './point-presenter';
import { ACTIVE_SORT_TYPES, FilterOptions, FilterTypes, SortOptions, SortTypes, UpdateType, UserAction } from '../const';
import NewPointPresenter from './new-point-presenter';


//отрисовывает все
export default class BoardPresenter {
  #tripContainer = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];
  #pointPresenters = new Map();
  #sort = null;
  #destinationsModel = null;
  #filtersModel = null;
  #newPointPresenter = null;
  #emptyListComponent = null;
  #filterType = FilterTypes.EVERYTHING;
  #eventList = new EventList();
  #currentSortType = SortTypes.DAY;
  #isLoading = true;
  #isLoadingError = false;

  constructor({tripContainer, destinationsModel, offersModel, pointsModel, filtersModel, onNewPointDestroy}){

    this.#tripContainer = tripContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#eventList,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#actionViewChangeHandler,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filtersModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    this.#filterType = this.#filtersModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = FilterOptions[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortTypes.TIME:
        filteredPoints.sort(sortPointsByTime);
        break;
      case SortTypes.PRICE:
        filteredPoints.sort(sortPointsByPrice);
        break;
      default:
        filteredPoints.sort(sortPointsByDay);
        break;
    }

    return filteredPoints;
  }

  init() {
    this.#renderTrip();
  }

  #renderTrip = () => {
    if (this.#isLoading) {
      this.#renderEmptyList({
        isLoading: true
      });

      return;
    }

    if (this.#isLoadingError) {
      this.#renderEmptyList({
        isLoadingError: true
      });

      return;
    }

    if (this.points.length === 0){
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    render (this.#eventList, this.#tripContainer);

    this.#renderPoints();
  };

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
    this.points.forEach((point) => this.#renderPoint(point));
  };

  #clearTrip = ({resetSort = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    if (resetSort) {
      this.#currentSortType = SortTypes.DAY;
    }
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      container: this.#eventList.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#actionViewChangeHandler,
      onModeChange: this.#onModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderEmptyList = ({isLoading = false, isLoadingError = false} = {}) => {
    this.#emptyListComponent = new EmptyListView({
      filterType: this.#filterType,
      isLoading,
      isLoadingError
    });

    render(this.#emptyListComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  createPoint = () => {
    this.#currentSortType = SortTypes.DAY;
    this.#filtersModel.set(UpdateType.MAJOR, FilterTypes.EVERYTHING);
    this.#newPointPresenter.init();
  };


  #onDataChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #onModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.reset());
  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  };

  #actionViewChangeHandler = (actionType, updateType, update) => {
    switch(actionType){
      case UserAction.UPDATE_POINT:
        this.#pointsModel.update(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.add(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.remove(updateType, update);
        break;
    }
  };

  #modelEventHandler = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({
          resetSort: true,
        });
        this.#renderTrip();
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.INIT:
        this.#isLoadingError = data.isError;
        this.#isLoading = false;
        this.#clearTrip();
        this.#renderTrip();
        break;
    }
  };
}
