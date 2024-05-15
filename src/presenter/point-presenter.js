import { PointMode } from '../const';
import { remove, render, replace } from '../framework/render';
import { isEscape } from '../utils';
import PointEdit from '../view/point-edit';
import Point from '../view/point-view';

export default class PointPresenter {
  #container = null;
  #offersModel = null;
  #pointsModel = null;
  #point = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #onDataChange = null;
  #onModeChange = null;
  #mode = PointMode.DEFAULT;
  #destinationsModel = null;

  constructor ({container, offersModel, pointsModel, destinationsModel, onDataChange, onModeChange}) {
    this.#container = container;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init (point) {
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#point = point;
    this.#pointComponent = new Point({
      point: point,
      onRollUpClick: this.#pointRollUpClickHandler,
      onFavoriteClick: this.#favoriteClickHandler
    });
    this.#pointEditComponent = new PointEdit({
      point: point,
      destinations: this.#destinationsModel.destinations,
      onRollUpClick: this.#formRollUpClickHandler,
      onSubmitForm: this.#submitFormHandler,
      onDeleteClick: this.#deleteClickHandler
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === PointMode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === PointMode.EDIT) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  reset() {
    if (this.#mode !== PointMode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #favoriteClickHandler = () => {
    this.#onDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#onModeChange(this.#point.id, this.#mode);
    this.#mode = PointMode.EDIT;
  };

  //замена формы на точку
  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = PointMode.DEFAULT;
  };

  //нажатие кнопки в форме
  #onFormKeyDown = (event) => {
    if (isEscape(event)) {
      event.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
      document.addEventListener('keydown', this.#onFormKeyDown);
    }
  };

  //обработчик нажатия на стрелку в точке
  #pointRollUpClickHandler = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#onFormKeyDown);
  };

  //обработчик нажатия на стрелку в форме
  #formRollUpClickHandler = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onFormKeyDown);
  };

  //сохранение значения формы
  #submitFormHandler = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onFormKeyDown);
  };

  //удаление значения формы
  #deleteClickHandler = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onFormKeyDown);
  };
}


