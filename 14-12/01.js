const sampleData = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

// helpers
const splitIntoLines = (str) => str.split("\n");
const splitIntoCharacters = (str) => str.split("");

// data

const platform = splitIntoLines(sampleData).map((line) =>
  splitIntoCharacters(line)
);

const tiltPlatform = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === "O" && arr[i - 1][j] === ".") {
        let n = 0;
        while (i - n > 0 && arr[i - n][j] === ".") {
          n++;
        }
        arr[i - n - 1][j] = "O";
        arr[i][j] = ".";
        i = 1;
        j = 0;
      }
    }
  }
  return arr;
};

const getLoad = (arr, index) => {
  return arr.filter((el) => el === "O").length * index;
};

console.log(
  tiltPlatform(platform)
    .map((line, i, arr) => getLoad(line, arr.length - i))
    .reduce((a, b) => a + b)
);
