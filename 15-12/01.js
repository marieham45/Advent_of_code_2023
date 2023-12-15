const sampleData = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

// helpers
const splitIntoLines = (str) => str.split("\n");
const splitIntoCharacters = (str) => str.split("");

/* Determine the ASCII code for the current character of the string.
Increase the current value by the ASCII code you just determined.
Set the current value to itself multiplied by 17.
Set the current value to the remainder of dividing itself by 256.*/

const characters = sampleData.split(",");

const getHashAlgorithm = (str) => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    currentHash = hash;
    currentHash += str.charCodeAt(i);
    currentHash *= 17;
    currentHash = currentHash % 256;
    hash = currentHash;
  }

  return hash;
};

console.log(characters.map(getHashAlgorithm).reduce((a, b) => a + b));
