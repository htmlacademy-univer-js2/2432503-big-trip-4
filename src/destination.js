import { CITIES, DESCRIPTION } from './const';
import { getRandomInteger, getRandomValue } from './utils';

//берем рандомный город
function getDestination(){
  const city = getRandomValue(CITIES);

  //структура пункта назначения
  return {
    id: crypto.randomUUID(),
    description: DESCRIPTION,
    name: city,
    pictures:
    Array.from({
      length: getRandomInteger(1, 5)},
      () => ({
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        'description': `${city} description`
      })
      )
  };
}

export {
  getDestination
};
