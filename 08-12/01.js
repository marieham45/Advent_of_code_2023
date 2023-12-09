const sampleData = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

// helpers
const splitIntoLines = (str) => str.split("\n");
const splitIntoCharacters = (str) => str.split("");

// data
const directions = splitIntoLines(sampleData)[0];

const map = splitIntoLines(sampleData)
  .slice(2)
  .map((line) => line.match(/\w+/g));

const findZZZ = (arr, dir) => {
  let startingPoint = "AAA";
  let steps = 0;
  for (let i = 0; i < dir.length; i++) {
    const direction = dir.split("")[i] === "L" ? 1 : 2;
    steps++;
    const destination = arr.indexOf(arr.find((el) => el[0] === startingPoint));
    startingPoint = arr[destination][direction];
    if (startingPoint === "ZZZ") break;
    if (i === dir.length - 1) {
      i = -1;
    }
  }

  return steps;
};

console.log(findZZZ(map, directions));
