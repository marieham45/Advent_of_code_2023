let sampleData = `.|...S....
|.-.S.....
.....|-...
........|.
..........
.........S
..../.SS..
.-.-/..|..
.|....-|.S
..//.|....`;

// helpers
const splitIntoLines = (str) => str.split("\n");
const splitIntoCharacters = (str) => str.split("");

// data
const contraption = splitIntoLines(sampleData).map((line) =>
  splitIntoCharacters(line)
);

const getEnergised = (arr, startingRow, startingColumn, startingDirection) => {
  let row = startingRow;
  let column = startingColumn;
  let direction = startingDirection;

  while (
    !(arr[row][column].includes("#") && arr[row][column].includes(direction))
  ) {
    if (arr[row][column].includes(".")) {
      if (direction === "R") {
        arr[row][column] += "#";
        if (column < arr[0].length - 1) column++;
        else return arr;
      } else if (direction === "L") {
        arr[row][column] += "#";
        if (column > 0) column--;
        else return arr;
      } else if (direction === "U") {
        arr[row][column] += "#";
        if (row > 0) row--;
        else return arr;
      } else if (direction === "D") {
        arr[row][column] += "#";
        if (row < arr.length - 1) row++;
        else return arr;
      }
    } else if (arr[row][column].includes("S")) {
      if (direction === "R") {
        arr[row][column] += "#R";
        if (row < arr.length - 1) row++;
        else return arr;
        direction = "D";
      } else if (direction === "L") {
        arr[row][column] += "#L";
        if (row > 0) row--;
        else return arr;
        direction = "U";
      } else if (direction === "U") {
        arr[row][column] += "#U";
        if (column > 0) column--;
        else return arr;
        direction = "L";
      } else if (direction === "D") {
        arr[row][column] += "#D";
        if (column < arr[0].length - 1) column++;
        else return arr;
        direction = "R";
      }
    } else if (arr[row][column].includes("/")) {
      if (direction === "R") {
        arr[row][column] += "#R";
        if (row > 0) row--;
        else return arr;
        direction = "U";
      } else if (direction === "L") {
        arr[row][column] += "#L";
        if (row < arr.length - 1) row++;
        else return arr;
        direction = "D";
      } else if (direction === "U") {
        arr[row][column] += "#U";
        if (column < arr[0].length - 1) column++;
        else return arr;
        direction = "R";
      } else if (direction === "D") {
        arr[row][column] += "#D";
        if (column > 0) column--;
        else return arr;
        direction = "L";
      }
    } else if (arr[row][column].includes("|")) {
      if (direction === "R" || direction === "L") {
        arr[row][column] += "#RL";
        if (row + 1 < arr.length) getEnergised(arr, row + 1, column, "D");
        if (row > 0) row--;
        else return arr;
        direction = "U";
      } else if (direction === "U") {
        arr[row][column] += "#U";
        if (row > 0) row--;
        else return arr;
      } else if (direction === "D") {
        arr[row][column] += "#D";
        if (row < arr.length - 1) row++;
        else return arr;
      }
    } else if (arr[row][column].includes("-")) {
      if (direction === "L") {
        arr[row][column] += "#L";
        if (column > 0) column--;
        else return arr;
      } else if (direction === "R") {
        arr[row][column] += "#R";
        if (column < arr[0].length - 1) column++;
        else return arr;
      } else if (direction === "D" || direction === "U") {
        arr[row][column] += "#UD";
        if (column + 1 < arr[0].length) getEnergised(arr, row, column + 1, "R");
        if (column > 0) column--;
        else return arr;
        direction = "L";
      }
    }
  }
  return arr;
};

console.log(
  getEnergised(contraption, 0, 0, "R")
    .flat()
    .filter((el) => el.includes("#")).length
);
