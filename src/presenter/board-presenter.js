import Sort from '../view/sort';
import Point from '../view/point';
import PointEdit from '../view/point-edit';
import EventList from '../view/event-list';
import { render } from '../render';

export default class BoardPresenter {
  constructor({container}){
    this.container = container;
  }

  sort = new Sort();
  eventList = new EventList();

  init() {
    render (this.sort, this.container);
    render (this.eventList, this.container);
    render (new PointEdit(), this.eventList.getElement());

    for (let i = 0; i<3; i++) {
      render (new Point(), this.eventList.getElement());
    }

  }

}
