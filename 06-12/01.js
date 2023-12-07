const sampleData = `Time:        45     97     72     95
Distance:   305   1062   1110   1695`;

// helpers
const splitIntoLines = (str) => str.split("\n");

const data = splitIntoLines(sampleData)
  .map((line) => line.match(/\w+/g))
  .map((line) => (line = line.slice(1).map(Number)));

const races = [];

for (let i = 0; i < data[0].length; i++) {
  const race = [data[0][i], data[1][i]];
  races.push(race);
}

const getOptions = (arr) => {
  const [time, distance] = arr;
  let optionsNumber = 0;

  for (let i = 0; i < time; i++) {
    const myDistance = (time - i) * i;
    if (myDistance > distance) {
      optionsNumber++;
    }
  }
  return optionsNumber;
};
console.log(races.map(getOptions).reduce((a, b) => a * b));
