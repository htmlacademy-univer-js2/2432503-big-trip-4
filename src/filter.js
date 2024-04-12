import { FilterTypes } from './const';
import { isPointFuture, isPointPast, isPointPresent } from './utils';

const filter = {
  [FilterTypes.EVERYTHING]: (points) => [...points],
  [FilterTypes.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterTypes.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterTypes.PAST]: (points) => points.filter((point) => isPointPast(point))
};

//создание фильтров
function getFilters(points){
  return Object.entries(filter).map(([filterType, filterPoints]) => ({
    type: filterType,
    hasPoints: filterPoints(points).length > 0,
    defaultSelected: filterType === FilterTypes.EVERYTHING
  }));
}

export {
  getFilters
};
