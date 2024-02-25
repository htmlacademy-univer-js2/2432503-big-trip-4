import TripInfo from './view/trip-info';
import Filter from './view/filter';
import { render, RenderPosition} from './render';
import BoardPresenter from './presenter/board-presenter';

const bodyElement = document.querySelector('.page-body');
const header = bodyElement.querySelector('.page-header');
const tripInfo = header.querySelector('.trip-main');
const filter = tripInfo.querySelector('.trip-controls__filters');
const main = bodyElement.querySelector('.page-main');
const eventList = main.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({container: eventList});
render (new TripInfo(), tripInfo, RenderPosition.AFTERBEGIN);
render(new Filter(), filter);
boardPresenter.init();

