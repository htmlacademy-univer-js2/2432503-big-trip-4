
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
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE
};

const FilterTypes = {
  EVERYTHING : 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};
const SORTING_ITEMS = [
  {
    type: SortTypes.DAY,
    active: true,
    defaultSelected: true
  },
  {
    type: SortTypes.EVENT,
    active: false
  },
  {
    type: SortTypes.TIME,
    active: true
  },
  {
    type: SortTypes.PRICE,
    active: true
  },
  {
    type: SortTypes.OFFERS,
    active: false
  }
];

const PointMode = {
  DEFAULT: 'default',
  EDIT: 'edit'
};


export{
  CITIES, DESCRIPTION, PRICE, DURATION, TYPES, OFFERS, POINT_EMPTY, DEFAULT_TYPE,OFFER_COUNT, DESTINATION_COUNT, POINT_COUNT, FilterTypes, SortTypes, SORTING_ITEMS, PointMode
};
