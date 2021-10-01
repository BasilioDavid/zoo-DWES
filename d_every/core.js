// Check to see if all elements in an array
// are even numbers.

function allEven(input) {
  return input.every( value => !(value%2));
}

// Check to see if all elements in an array
// are of the same type.

function allSameType(input) {
  return input.every( (value, index, mappedArray) => {
    const valueIndex2Check = (index + 1) % mappedArray.length;
    const result = typeof(value) === typeof(mappedArray[valueIndex2Check]);
    return result;
  });
}

// Check to see if every element in the matrix is
// an array and that every element in the array is
// greater than 0.

function positiveMatrix(input) {
  return input.every( value => Array.isArray(value) && value.every( number => number >= 0));
}

// Check that all items in an array are strings
// and that they all only contain the same vowels.

function allSameVowels(input) {
  return input.every( value => {
    const nonVowelRegex = /[^aoeui]/g
    const valueWithoutConsonats  = value.replace(nonVowelRegex, "");
    const nonVowelLetters = [...valueWithoutConsonats];
    return nonVowelLetters.every( (letter, index, mappedArray) => {
      const valueIndex2Check = (++index) % mappedArray.length;
      return letter === mappedArray[valueIndex2Check];
    })
  });
}

module.exports = {
  allEven,
  allSameType,
  positiveMatrix,
  allSameVowels
};
