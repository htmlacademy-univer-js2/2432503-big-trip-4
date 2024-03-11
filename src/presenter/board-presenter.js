import Sort from '../view/sort';
import Point from '../view/point-view';
import PointEdit from '../view/point-edit';
import EventList from '../view/event-list';
import { render } from '../render';

//отрисовывает все
export default class BoardPresenter {
  constructor({tripContainer, destinationsModel, offersModel, pointsModel}){

    this.tripContainer = tripContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;
    this.points = [...pointsModel.get()];

    this.eventList = new EventList();
  }

  sort = new Sort();
 //eventList = new EventList();

  init() {
    render (this.sort, this.tripContainer);
    render (this.eventList, this.tripContainer);
    render (new PointEdit({

      point: this.points[0],
      pointDestination: this.destinationsModel.getRandomDestination(),
      pointOffers: this.offersModel.getRandomOffer()

    }), this.eventList.getElement());

    this.points.forEach((point) => {
      render(new Point({
        point,
        pointDestination: this.destinationsModel.getRandomDestination(),
        pointOffers: this.offersModel.getRandomOffer()
      }), this.eventList.getElement());
    });

  }

}
