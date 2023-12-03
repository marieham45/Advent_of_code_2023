const sampleData = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

// helpers
const splitIntoLines = (str) => str.split("\n");
const splitIntoCharacters = (str) => str.split("");

const calibrationNumbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const mapStringsToNumbers = (str) => {
  switch (str) {
    case "one":
      return "1";
      break;
    case "two":
      return "2";
      break;
    case "three":
      return "3";
      break;
    case "four":
      return "4";
      break;
    case "five":
      return "5";
      break;
    case "six":
      return "6";
      break;
    case "seven":
      return "7";
      break;
    case "eight":
      return "8";
      break;
    case "nine":
      return "9";
      break;
    default:
      return str;
  }
};

const getCalibrations = (str) => {
  let calibrationPair = "";
  let firstDigit = "";
  let secondDigit = "";
  for (let i = 0; i < str.length; i++) {
    const sub = str.slice(0, i);
    for (let j = 0; j < calibrationNumbers.length; j++) {
      if (sub.includes(calibrationNumbers[j])) {
        firstDigit = mapStringsToNumbers(calibrationNumbers[j]);
        break;
      }
    }
    if (firstDigit) break;
  }
  for (let i = str.length - 1; i >= 0; i--) {
    const sub = str.slice(i, str.length);
    for (let j = 0; j < calibrationNumbers.length; j++) {
      if (sub.includes(calibrationNumbers[j])) {
        secondDigit = mapStringsToNumbers(calibrationNumbers[j]);
        break;
      }
    }
    if (secondDigit) break;
  }

  if (!firstDigit) firstDigit = secondDigit;
  if (!secondDigit) secondDigit = firstDigit;

  calibrationPair = parseInt(firstDigit.toString() + secondDigit.toString());
  return calibrationPair;
};

const sampleResult = splitIntoLines(sampleData)
  .map(getCalibrations)
  .reduce((a, b) => a + b);

console.log(sampleResult);
