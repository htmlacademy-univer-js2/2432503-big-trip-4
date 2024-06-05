import { PointMode, UpdateType, UserAction } from '../const';
import { remove, render, replace } from '../framework/render';
import { isDifference, isEscape } from '../utils';
import PointEdit from '../view/point-edit';
import Point from '../view/point-view';

export default class PointPresenter {
  #container = null;
  #offersModel = null;
  #point = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #onDataChange = null;
  #onModeChange = null;
  #mode = PointMode.DEFAULT;
  #destinationsModel = null;

  constructor ({container, offersModel, destinationsModel, onDataChange, onModeChange}) {
    this.#container = container;
    this.#offersModel = offersModel;
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
      destinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.getByType(point.type),
      onRollUpClick: this.#pointRollUpClickHandler,
      onFavoriteClick: this.#favoriteClickHandler
    });
    this.#pointEditComponent = new PointEdit({
      point: point,
      destinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.offers,
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
      this.#mode = PointMode.DEFAULT;
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

  setSaving() {
    if(this.#mode === PointMode.EDIT) {
      this.#pointEditComponent.updateElement({
        isDisable: true,
        isSaving: true
      });
    }
  }

  setDeleting() {
    this.#pointEditComponent.updateElement({
      isDisable: true,
      isDeleting: true
    });
  }

  setAborting() {
    const resetForm = () => {
      this.#pointEditComponent.updateElement({
        isDisable: false,
        isSaving: false,
        isDeleting: false
      });
    };
    this.#pointEditComponent.shake(resetForm);
  }

  #favoriteClickHandler = () => {
    this.#onDataChange(
      UserAction.UPDATE_POINT, UpdateType.PATCH,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite
      });
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#onModeChange();
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
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onFormKeyDown);
  };

  //сохранение значения формы
  #submitFormHandler = (updatePoint) => {
    const isMinor = isDifference(updatePoint, this.#point);
    if(isMinor){
      this.#onDataChange(UserAction.UPDATE_POINT, isMinor ? UpdateType.MINOR : UpdateType.PATCH, updatePoint);
    }
    if (this.#pointEditComponent.isDisable) {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onFormKeyDown);
    }
  };

  //удаление значения формы
  #deleteClickHandler = (event) => {
    this.#onDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, event);
  };
}


