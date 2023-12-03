const sampleData = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

// helpers
const splitIntoLines = (str) => str.split("\n");
const splitIntoCharacters = (str) => str.split("");

const getCalibrations = (str) => {
  const splitLine = splitIntoCharacters(str);
  const numbersInLine = splitLine.filter((item) => !isNaN(parseInt(item)));
  let firstDigit = numbersInLine[0];
  let secondDigit = numbersInLine[numbersInLine.length - 1];
  const calibrationPair = parseInt([firstDigit, secondDigit].join(""));

  return calibrationPair;
};

const sampleResult = splitIntoLines(sampleData)
  .map(getCalibrations)
  .reduce((a, b) => a + b);

console.log(sampleResult);