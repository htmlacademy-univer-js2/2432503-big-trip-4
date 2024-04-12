import { getFilters } from '../filter';
import { render } from '../framework/render';
import Filter from '../view/filter-view';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filters = [];

  constructor({container, pointsModel}){
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filters = getFilters(this.#pointsModel.points);
  }

  init(){
    render(new Filter(this.#filters), this.#container);
  }
}
