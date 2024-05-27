import BoardPresenter from './presenter/board-presenter';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import PointsModel from './model/points-model';
import { RenderPosition, render } from './framework/render';
import FilterPresenter from './presenter/filter-presenter';
import FiltersModel from './model/filters-model';
import NewPoint from './view/new-point-view';
import PointApiService from './service/point-api-service';

const AUTHORIZATION = 'Basic MarMsa';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

//поиск элементов в документе
const tripInfo = document.querySelector('.trip-main');
const filter = tripInfo.querySelector('.trip-controls__filters');
const main = document.querySelector('.page-main');
const eventList = main.querySelector('.trip-events');

//создание моделей
const apiService = new PointApiService(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationsModel(apiService);
const offersModel = new OffersModel(apiService);
const pointsModel = new PointsModel({apiService, destinationsModel, offersModel});
const filtersModel = new FiltersModel();
const boardPresenter = new BoardPresenter({

  tripContainer: eventList,
  tripInfoContainer: tripInfo,
  destinationsModel,
  offersModel,
  pointsModel,
  filtersModel,
  onNewPointDestroy: newPointFormCloseHandler

});

const filterPresenter = new FilterPresenter({
  container: filter, pointsModel, filtersModel
});

const newPointComponent = new NewPoint({
  onClick: newPointClickHandler
});

function newPointFormCloseHandler(){
  newPointComponent.element.disabled = false;
}

function newPointClickHandler(){
  boardPresenter.createPoint();
  newPointComponent.element.disabled = true;
}

render(newPointComponent, tripInfo, RenderPosition.BEFOREEND);

boardPresenter.init();
filterPresenter.init();
pointsModel.init();

