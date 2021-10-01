const DATA = require("./data");
const {animals: ANIMALS, employees: EMPLOYEES, 
            hours: HOURS, prices: PRICES } = require("./data");

function entryCalculator(entrants) {
  return (entrants === undefined) ? 0 : 
    Object.entries(entrants).reduce( 
      (totalPrice, [age, times]) => totalPrice + PRICES[age] * times, 0 );
}

function schedule(dayName) {
  const timetables = Object.entries(HOURS).reduce( (timetableFormed, [day, openCloseTime] ) => ( { ...timetableFormed, [day] : makeTimetableReadable(openCloseTime) } ), {} );
  return (dayName === undefined) ? timetables : {[dayName]: timetables[dayName]};
}

function makeTimetableReadable(timetable){
  const converter24to12 = hour => hour > 12 ? hour - 12 + "pm" : hour + "am";
  const [hourOpen, hourClose] = Object.values(timetable);
    
  return (hourOpen === hourClose && hourClose === 0) ? "CLOSED" :
     `Open from ${converter24to12(hourOpen)} until ${converter24to12(hourClose)}`;
}

function animalCount(species) {
  const animals = ANIMALS.reduce( (animalsWithTheirCount, {residents, name} ) => ( { ...animalsWithTheirCount, [name] : residents.length } ), {} );
  return (species === undefined) ? animals : animals[species];
}

/**
 * Function that returns the location of each specie
 * Without parameters the return message would be
 *  { location: [ specie1, specie2 ] }
 * With includeNames parameter the return message'd be
 *  { lociation: [{ specie1: [ name1, name2 ]}, {specie2: [...] } ] }
 * With the sex and the includeNames parameter the return  message'd be
 *  the same as the previous one, but only with the (fe)male species
 * With only the sex parameter the return message'd be the same
 *  as the first one, but only with species that have, at least, one animal of that gender
 * @param {includeNames?: Boolean, sex?: String} options 
 */
function animalMap(options) {
return ANIMALS.reduce( 
    ( animalsProcessed, {name: specie, location, residents}) => {
        const animalsFilteredBySex = residents.filter( ({sex}) => options === undefined || options.sex === undefined || options.sex === sex);
        if (options === undefined || options.includeNames === undefined || !options.includeNames)
          return (animalsProcessed[location] === undefined) ? {...animalsProcessed, [location] : [specie]} : {...animalsProcessed, [location] : [...animalsProcessed[location], specie]}
        else {
          const animalsName = animalsFilteredBySex.reduce( ( allAnimalList, {name} ) => [...allAnimalList, name], [] )
          return (animalsProcessed[location] === undefined) ? {...animalsProcessed, [location]: [ {[specie] :  [...animalsName]} ] }
                                                                                                     : {...animalsProcessed, [location]: [...animalsProcessed[location], {[specie] : [...animalsName]} ] }
        }
      }, {}
  );
}

function animalPopularity(rating) {
  const sortAnimalsByPopularity = animals => objectify(Object.entries(animals).sort( (comparator, comparing) =>  +Object.keys(comparator).shift() -  +Object.keys(comparing).shift() ) );
  const animalsByPopularity = sortAnimalsByPopularity(ANIMALS.reduce(( animalsProccesed, {popularity, name: specieName} ) => animalsProccesed[popularity] === undefined ? {...animalsProccesed, [popularity + ""]: [specieName]} : {...animalsProccesed, [popularity + ""]: [...animalsProccesed[popularity + ""], specieName]} ,{} ) );
  return (rating === 0 || rating === undefined) ? animalsByPopularity : animalsByPopularity[rating]
}

function objectify(array) {
  return array.reduce(( objectResult, [key, value] ) =>  ({...objectResult, [key] : value}), {} )
}


function animalsByIds(ids) {
  return (ids === undefined) ? [] : [...ANIMALS.filter( ({id: animalId}) => ids.includes(animalId))];
}

function animalByName(animalName) {
  return (animalName === undefined) ? {} : ANIMALS.reduce( 
    (animalSelected, {name:specieName, residents} ) => { 
      const animalIWant = residents.find( ({name}) => name===animalName);
      return (animalIWant === undefined) ? {...animalSelected} : {...animalIWant, species: specieName};
    });
}

function employeesByIds(ids) {
  return (ids === undefined) ? [] : [...EMPLOYEES.filter( ({id: animalId}) => ids.includes(animalId))];
}

function employeeByName(employeeName) {
  return (employeeName === undefined) ? {} : EMPLOYEES.find( ({firstName, lastName}) => firstName === employeeName || lastName === employeeName );
}

function managersForEmployee(idOrName) {
  const selectedEmployeed = EMPLOYEES.find( ({id, firstName, lastName}) => id === idOrName || firstName === idOrName || lastName === idOrName );
  return {...selectedEmployeed, managers: EMPLOYEES.filter( ({id}) => selectedEmployeed.managers.includes(id)) .map( ({firstName, lastName}) => `${firstName} ${lastName}`) };
}

function employeeCoverage(idOrName) {
  // const employees = EMPLOYEES.reduce(
  //   ( employeesWithCoverage, {firstName, lastName, responsibleFor}) => ({
  //     ...employeesWithCoverage,
  //     [`${firstName} ${lastName}`] : ANIMALS.filter( ({id}) => responsibleFor.includes(id)).map( ({name: animalName}) => animalName)
  //   }),
  //   {}
  // );
  // return (idOrName === undefined) ? employees : employees[idOrName];
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalPopularity,
  animalsByIds,
  animalByName,
  employeesByIds,
  employeeByName,
  managersForEmployee,
  employeeCoverage
};
