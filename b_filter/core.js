function onlyEven(array) {
  return array.filter( value => !(value%2) );
}

function onlyOneWord(array) {
  return array.filter( value =>  !value.includes(" ") );
}

function positiveRowsOnly(array) {
  return array.filter( numbers => numbers.filter( number => number < 0 ).length === 0 )
}

function allSameVowels(array) {
  // const nonVowelRegex = /[^aoeui]/gi
  const vowelRegex = /[aoeui]/gi;
  return array.filter( word => {
    // const vowels = [...word.replace(nonVowelRegex, "")];
    // return vowels.filter( ifHasDifferentVowels ).length === 0;
    return word.match( vowelRegex ).filter( 
      (vowel, _, [firstVowel] ) => vowel !== firstVowel).length === 0;
  });
}

function ifHasDifferentVowels(letter, index, mappedArray){
  const indexUse = (index + 1) % mappedArray.length;
  return letter !== mappedArray[indexUse];
} 


module.exports = {
  onlyEven,
  onlyOneWord,
  positiveRowsOnly,
  allSameVowels
};
