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

const tiltPlatformNorth = (arr) => {
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

const tiltPlatformSouth = (arr) => {
  for (let i = arr.length - 2; i >= 0; i--) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === "O" && arr[i + 1][j] === ".") {
        let n = 0;
        while (i + n < arr.length && arr[i + n][j] === ".") {
          n++;
        }
        arr[i + n + 1][j] = "O";
        arr[i][j] = ".";
        i = arr.length - 2;
        j = 0;
      }
    }
  }
  return arr;
};

const tiltPlatformWest = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr[0].length; j++) {
      if (arr[i][j] === "O" && arr[i][j - 1] === ".") {
        let n = 0;
        while (j - n > 0 && arr[i][j - n] === ".") {
          n++;
        }
        arr[i][j - n - 1] = "O";
        arr[i][j] = ".";
        i = 0;
        j = 1;
      }
    }
  }
  return arr;
};

const tiltPlatformEast = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr[0].length - 2; j >= 0; j--) {
      if (arr[i][j] === "O" && arr[i][j + 1] === ".") {
        let n = 0;
        while (j + n < arr[0].length && arr[i][j + n + 1] === ".") {
          n++;
        }
        arr[i][j + n] = "O";
        arr[i][j] = ".";
        i = 0;
        j = arr[0].length - 2;
      }
    }
  }
  return arr;
};

const getLoad = (arr, index) => {
  return arr.filter((el) => el === "O").length * index;
};

const doingCycles = (arr, cycles) => {
  for (let i = 0; i < cycles; i++) {
    tiltPlatformEast(
      tiltPlatformSouth(tiltPlatformWest(tiltPlatformNorth(arr)))
    );
  }

  return arr;
};
console.log(
  doingCycles(platform, 1000)
    .map((line, i, arr) => getLoad(line, arr.length - i))
    .reduce((a, b) => a + b)
);
