import { formatStringToDateToTime, formatToTime, getPointDuration } from '../utils';


//меняем в коде расписание
function createShedule(){
  return(`<div class="event__schedule">
  <p class="event__time">
    <time class="event__start-time" datetime="${formatStringToDateToTime(dateFrom)}">${formatToTime(dateFrom)}</time>
    &mdash;
    <time class="event__end-time" datetime="${formatStringToDateToTime(dateTo)}">${formatToTime(dateTo)}</time>
  </p>
  <p class="event__duration">${getPointDuration(point)}</p>
</div>`)
}

//экспортируем функцию
export{
  createShedule
};
