function multiplyBy10(array) {
  return array.map( element => element * 10);
}

function shiftRight(array) {
  return array.map( (_, index, mappedArray)  => {
    const elementIndex2Swap = index ? --index : mappedArray.length - 1;
    return mappedArray[elementIndex2Swap];
  })
}

function onlyVowels(array) {
  const nonVowelRegex = /[^aeiou]/gi;
  return array.map( element => element.replace(nonVowelRegex, "") )
}

function doubleMatrix(array) {
  return array.map( numbers => numbers.map( number => number * 2) )
}

module.exports = {
  multiplyBy10,
  shiftRight,
  onlyVowels,
  doubleMatrix
};
