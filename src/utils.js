//импорт библиотеки
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DURATION } from './const';

//расширения
dayjs.extend(duration);
dayjs.extend(relativeTime);

//константы для обозначения времени
const MSECOND_IN_SECOND = 1000;
const SECOND_IN_MINUTE = 60;
const MINUTE_IN_HOUR = 60;
const HOUR_IN_DAY = 24;
const MSECOND_IN_HOUR = MINUTE_IN_HOUR * SECOND_IN_MINUTE * MSECOND_IN_SECOND;
const MSECOND_IN_DAY = HOUR_IN_DAY * MSECOND_IN_HOUR;

//константа для проверки нажатия кнопки
const isEscape = (event) => event.key === 'Escape';

//форматирование строки в дату и время
function formatStringToDateToTime(date){
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
}

//фоматирование строки к сокращенной дате
function formatToShortDate(date){
  return dayjs(date).format('MMM DD');
}

//форматирование стоки ко времени
function formatToTime(date){
  return dayjs(date).format('HH:MM');
}

//продолжительность путешествия(с какого по какое число)
function getPointDuration(point){

  //разница во времени (diff- разница)
  const timeDifferense = dayjs(point.dateTo).diff(dayjs(point.dateFrom));

  //продолжительность (она и будет возвращаться)
  let pointDuration = 0;

  //контейнер для вычесления продолжительности(сколько дней, часов, минут)
  switch(true){

    //дни
    case(timeDifferense >= MSECOND_IN_DAY):
      pointDuration = dayjs.duration(timeDifferense).format('DD[D] HH[H] mm[M]');
      break;

    //часы
    case(timeDifferense >= MSECOND_IN_HOUR):
      pointDuration = dayjs.duration(timeDifferense).format('HH[H] mm[M]');
      break;

    //минуты
    case(timeDifferense < MSECOND_IN_HOUR):
      pointDuration = dayjs.duration(timeDifferense).format('mm[M]');
      break;
  }

  //возврашаем переменную отвечающую за продолжительность
  return pointDuration;
}

//формотирование ко дню и времени
function getSheduleDate(date){
  return dayjs(date).format('DD/MM/YY HH:mm');
}

//рандомное число
function getRandomInteger(a = 0, b = 1){
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

//рандомное число в диапозоне
function getRandomValue(items){
  return items[getRandomInteger(0,items.length - 1)];
}

//вычетает указаное кол-во времени
let dateToGet = dayjs().subtract(getRandomInteger(0,DURATION.DAY),'day').toDate();

//формирует текущую дату и прибавляет к ней дату которая передается
function getDate({next}){
  const minutesGap = getRandomInteger(0,DURATION.MIN);
  const hoursGap = getRandomInteger(1,DURATION.HOUR);
  const daysGap = getRandomInteger(0,DURATION.DAY);

  if (next){
    dateToGet = dayjs(dateToGet).add(minutesGap,'minute').add(hoursGap,'hour').add(daysGap,'day').toDate();
  }
  return dateToGet;
}

//эксопрт всех функций для использования в других файлах
export{
  formatStringToDateToTime,formatToShortDate,formatToTime,getPointDuration,getSheduleDate,getRandomInteger,getRandomValue,getDate, isEscape
};
