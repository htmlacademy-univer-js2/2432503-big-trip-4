import TripInfo from './view/trip-info';
import BoardPresenter from './presenter/board-presenter';
import MockService from './service/mock-service';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import PointsModel from './model/points-model';
import { RenderPosition, render } from './framework/render';
import FilterPresenter from './presenter/filter-presenter';

//поиск элементов в документе
const tripInfo = document.querySelector('.trip-main');
const filter = tripInfo.querySelector('.trip-controls__filters');
const main = document.querySelector('.page-main');
const eventList = main.querySelector('.trip-events');

//создание моделей
const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);
const boardPresenter = new BoardPresenter({

  tripContainer: eventList,
  destinationsModel,
  offersModel,
  pointsModel

});

const filterPresenter = new FilterPresenter({
  container: filter, pointsModel
});

render(new TripInfo(), tripInfo, RenderPosition.AFTERBEGIN);


boardPresenter.init();
filterPresenter.init();

