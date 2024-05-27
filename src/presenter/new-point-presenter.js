import { UpdateType, UserAction } from '../const';
import { RenderPosition, remove, render } from '../framework/render';
import PointEdit from '../view/point-edit';

export default class NewPointPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointEditComponent = null;
  #onDataChange = null;
  #onDestroy = null;

  constructor({container, destinationsModel, offersModel, onDataChange, onDestroy}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
  }

  init() {
    if (this.#pointEditComponent !== null){
      return;
    }

    this.#pointEditComponent = new PointEdit({
      destinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.offers,
      isCreating: true,
      onRollUpClick: this.#rollUpClickHandler,
      onSubmitForm: this.#submitFormHandler,
      onDeleteClick: this.#rollUpClickHandler
    });

    render(this.#pointEditComponent, this.#container.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onFormKeyDown);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#onFormKeyDown);
    this.#onDestroy();
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisable: true,
      issaving: true
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

  #submitFormHandler = (point) => {
    this.#onDataChange(UserAction.ADD_POINT, UpdateType.MINOR, point);
  };

  #rollUpClickHandler = () => {
    this.destroy();
  };

  #onFormKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.destroy();
    }
  };
}
