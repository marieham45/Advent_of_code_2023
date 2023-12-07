const sampleData = `Time:        45     97     72     95
Distance:   305   1062   1110   1695`;

// helpers
const splitIntoLines = (str) => str.split("\n");

const data = splitIntoLines(sampleData)
  .map((line) => line.match(/\w+/g))
  .map((line) => (line = line.slice(1).map(Number)));

const races = data.map((item) => item.join("")).map(Number);

const getOptions = (arr) => {
  const [time, distance] = arr;
  let optionsNumber = 0;

  for (let i = 0; i < time; i++) {
    const myDistance = (time - i) * i;

    let winning = false;
    if (myDistance > distance) {
      if (winning && optionsNumber > 0) break;
      winning = true;
      optionsNumber++;
    }
  }
  return optionsNumber;
};

console.log(getOptions(races));
