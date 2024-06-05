import { isPointFuture, isPointPast, isPointPresent, sortPointsByDay, sortPointsByPrice, sortPointsByTime } from './utils';

//список городов
const CITIES = ['Chamonix', 'Geneva', 'Amsterdam', 'Helsinki', 'Oslo', 'Kopenhagen', 'Den Haag', 'Rotterdam', 'Saint Petersburg', 'Moskow', 'Sochi', 'Tokio'];

//рыбные данные
const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

//типы
const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

//Описание поездки
const OFFERS = ['Order Uber', 'Add luggage','Switch to comfort','Rent a car','Add breakfast','Book tickets','Lunch in city','Upgrade to a business class'];

//дефолтный тип
const DEFAULT_TYPE = 'flight';

//кол-во предложений
const OFFER_COUNT = Math.floor(Math.random() * 4 + 1);

//кол-во городов
const DESTINATION_COUNT = 5;

//кол-во точек
const POINT_COUNT = 5;

//цена
const PRICE = {
  MIN: 1,
  MAX: 1000
};

//продолжительность
const DURATION = {
  HOUR: 5,
  DAY: 5,
  MINUTES: 59
};

//пустая точка
const POINT_EMPTY = {
  price: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE
};

//типы фильтров
const FilterTypes = {
  EVERYTHING : 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

//типы сортирвоки
const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

//режим точки
const PointMode = {
  DEFAULT: 'default',
  EDIT: 'edit'
};

//активные типы сортировки
const ACTIVE_SORT_TYPES = [SortTypes.DAY, SortTypes.TIME, SortTypes.PRICE];

//параметры сортировки
const SortOptions = {
  [SortTypes.DAY] : (points) => [...points].sort(sortPointsByDay),
  [SortTypes.TIME] : (points) => [...points].sort(sortPointsByTime),
  [SortTypes.PRICE] : (points) => [...points].sort(sortPointsByPrice)
};

//обновление типа точки
const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
  INIT: 'init'
};

//действие пользователя
const UserAction = {
  UPDATE_POINT: 'update-point',
  ADD_POINT: 'add-point',
  DELETE_POINT: 'delite-point'
};

//фильтры
const FilterOptions = {
  [FilterTypes.EVERYTHING]: (points) => [...points],
  [FilterTypes.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterTypes.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterTypes.PAST]: (points) => points.filter((point) => isPointPast(point))
};

//текст для пустого списка
const EmptyListText = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.FUTURE]: 'There are no future events now',
  [FilterTypes.PRESENT]: 'There are no present events now',
  [FilterTypes.PAST]: 'There are no past events now'
};

const ButtonText = {
  SAVE: 'Save',
  DELETE: 'Delete',
  CANCEL: 'Cancel',
  LOAD_SAVE: 'Saving...',
  LOAD_DELETE: 'Deleting...'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

const FilterHasPoints = {
  [FilterTypes.EVERYTHING]: (points) => points.length,
  [FilterTypes.FUTURE]: (points) => points.some((point) => isPointFuture(point)),
  [FilterTypes.PRESENT]: (points) => points.some((point) => isPointPresent(point)),
  [FilterTypes.PAST]: (points) => points.some((point) => isPointPast(point))
};

export{
  CITIES, DESCRIPTION, PRICE, DURATION, TYPES, OFFERS, POINT_EMPTY, DEFAULT_TYPE,OFFER_COUNT,
  DESTINATION_COUNT, POINT_COUNT, FilterTypes, SortTypes, PointMode, ACTIVE_SORT_TYPES, SortOptions,
  UpdateType, UserAction, FilterOptions, EmptyListText, ButtonText, TimeLimit, FilterHasPoints
};
