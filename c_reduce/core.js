function sum(array) {
  return array.reduce(
    ( acc, value ) => acc + value,
    0
  )
}

function productAll(array) {
  return array.reduce(
    ( result, numbers ) => result * numbers.reduce(
      ( resultMatrix, number ) => resultMatrix * number,
      1
    ),
    1
  )
}

function objectify(array) {
  return array.reduce(
    ( objectResult, [key, value] ) =>  ({...objectResult, 
                                                              [key] : value})
      // const obj = {...acc};
      // obj[name] = decade;
      // return obj;
    ,
    {}
  )
}

function luckyNumbers(array) {
  return array.reduce(
    ( sentence, number, index, mappedArray ) => {
      sentence += index === mappedArray.length - 1 ? `and ${number}` : `${number}, `;
      return sentence;
    },
    "Your lucky numbers are: "
  )
}

module.exports = {
  sum,
  productAll,
  objectify,
  luckyNumbers
};
