const sampleData = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

// helpers
const splitIntoLines = (str) => str.split("\n");
const splitIntoCharacters = (str) => str.split("");
const addPeriod = (arr) => {
  arr.push(".");
  arr.unshift(".");
  return arr;
};

const addLineOfPeriods = (arr) => {
  const lineToAdd = new Array(arr[0].length).fill(".");
  arr.push(lineToAdd);
  arr.unshift(lineToAdd);
  return arr;
};

// data
const grid = splitIntoLines(sampleData).map((line) => line.split(""));
grid.forEach((line) => addPeriod(line));
addLineOfPeriods(grid);

const startingPoint = [
  grid.indexOf(grid.find((line) => line.includes("S"))),
  grid[grid.indexOf(grid.find((line) => line.includes("S")))].indexOf("S"),
];

const getPossibleDirection = (pipe) => {
  switch (pipe) {
    case "S":
      return "NESW";
    case "|":
      return "NS";
    case "-":
      return "WE";
    case "L":
      return "NE";
    case "J":
      return "NW";
    case "7":
      return "SW";
    case "F":
      return "SE";
    default:
      return "X";
  }
};

const findAnimal = (grid, start) => {
  let [row, column] = start;
  let currentSpot = grid[row][column];
  let cameFromRow = row;
  let cameFromColumn = column;
  let steps = 1;
  if (getPossibleDirection(grid[row][column + 1]).includes("W")) {
    column++;
    currentSpot = grid[row][column];
  } else if (getPossibleDirection(grid[row][column - 1]).includes("E")) {
    column--;
    currentSpot = grid[row][column];
  } else if (getPossibleDirection(grid[row - 1][column]).includes("S")) {
    row--;
    currentSpot = grid[row][column];
  } else {
    row++;
    currentSpot = grid[row][column];
  }
  while (currentSpot !== "S") {
    if (
      getPossibleDirection(currentSpot).includes("N") &&
      getPossibleDirection(grid[row - 1][column]).includes("S") &&
      !(cameFromRow === row - 1 && cameFromColumn === column)
    ) {
      cameFromRow = row;
      cameFromColumn = column;
      row--;
      currentSpot = grid[row][column];
    } else if (
      getPossibleDirection(currentSpot).includes("E") &&
      getPossibleDirection(grid[row][column + 1]).includes("W") &&
      !(cameFromRow === row && cameFromColumn === column + 1)
    ) {
      cameFromRow = row;
      cameFromColumn = column;
      column++;
      currentSpot = grid[row][column];
    } else if (
      getPossibleDirection(currentSpot).includes("S") &&
      getPossibleDirection(grid[row + 1][column]).includes("N") &&
      !(cameFromRow === row + 1 && cameFromColumn === column)
    ) {
      cameFromRow = row;
      cameFromColumn = column;
      row++;
      currentSpot = grid[row][column];
    } else if (
      getPossibleDirection(currentSpot).includes("W") &&
      getPossibleDirection(grid[row][column - 1]).includes("E") &&
      !(cameFromRow === row && cameFromColumn === column - 1)
    ) {
      cameFromRow = row;
      cameFromColumn = column;
      column--;
      currentSpot = grid[row][column];
    }
    steps++;
  }
  return steps;
};
console.log(findAnimal(grid, startingPoint) / 2);
