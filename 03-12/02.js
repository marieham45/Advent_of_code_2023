const sampleData = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

// helpers
const splitIntoLines = (str) => str.split("\n");
const splitIntoCharacters = (str) => str.split("");

const dataGrid = splitIntoLines(sampleData).map((line) =>
  splitIntoCharacters(line)
);

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

const isNumber = (str) => {
  return !isNaN(parseInt(str));
};

const isSymbol = (str) => {
  return isNaN(parseInt(str)) && str !== ".";
};

const getNumberParts = (arr) => {
  let result = [];

  arr.forEach((line) => addPeriod(line));
  addLineOfPeriods(arr);
  for (let i = 1; i < arr.length - 1; i++) {
    for (let j = 1; j < arr[i].length - 1; j++) {
      if (arr[i][j] === "*") {
        let partNumberCount = 0;
        if (isNumber(arr[i][j - 1])) {
          // any partNumber to the left?
          partNumberCount++;
        }
        if (isNumber(arr[i][j + 1])) {
          // any partNumber to the right?
          partNumberCount++;
        }
        if (isNumber(arr[i - 1][j])) {
          // any partNumber above?
          partNumberCount++;
        } else if (isNumber(arr[i - 1][j - 1])) {
          // any partNumber above to the left?
          partNumberCount++;
        }
        if (isNumber(arr[i - 1][j + 1]) && !isNumber(arr[i - 1][j])) {
          // any partNumber above to the right?
          partNumberCount++;
        }
        if (isNumber(arr[i + 1][j])) {
          // any partNumber below?
          partNumberCount++;
        } else if (isNumber(arr[i + 1][j - 1])) {
          // any partNumber below to the left?
          partNumberCount++;
        }
        if (isNumber(arr[i + 1][j + 1]) && !isNumber(arr[i + 1][j])) {
          // any partNumber below to the right?
          partNumberCount++;
        }
        if (partNumberCount === 2) {
          // going left
          if (isNumber(arr[i][j - 1])) {
            let k = j - 1;
            while (isNumber(arr[i][k]) && k > 0) {
              arr[i][k] = parseInt(arr[i][k]);
              k--;
            }
          }
          // going right
          if (isNumber(arr[i][j + 1])) {
            let l = j + 1;
            while (isNumber(arr[i][l]) && l < arr[i].length) {
              arr[i][l] = parseInt(arr[i][l]);
              l++;
            }
          }

          // going up and left
          if (isNumber(arr[i - 1][j])) {
            for (let k = j; k > 0; k--) {
              if (!isNumber(arr[i - 1][k])) {
                break;
              }
              arr[i - 1][k] = parseInt(arr[i - 1][k]);
            }
          } else if (isNumber(arr[i - 1][j - 1])) {
            for (let k = j - 1; k > 0; k--) {
              if (!isNumber(arr[i - 1][k])) {
                break;
              }
              arr[i - 1][k] = parseInt(arr[i - 1][k]);
            }
          }
          // going up and right
          if (isNumber(arr[i - 1][j])) {
            for (let k = j; k < arr[i - 1].length; k++) {
              if (!isNumber(arr[i - 1][k])) {
                break;
              }
              arr[i - 1][k] = parseInt(arr[i - 1][k]);
            }
          } else if (isNumber(arr[i - 1][j + 1])) {
            for (let k = j + 1; k < arr[i - 1].length; k++) {
              if (!isNumber(arr[i - 1][k])) {
                break;
              }
              arr[i - 1][k] = parseInt(arr[i - 1][k]);
            }
          }

          // going down and left
          if (isNumber(arr[i + 1][j])) {
            for (let k = j; k > 0; k--) {
              if (!isNumber(arr[i + 1][k])) {
                break;
              }
              arr[i + 1][k] = parseInt(arr[i + 1][k]);
            }
          } else if (isNumber(arr[i + 1][j - 1])) {
            for (let k = j - 1; k > 0; k--) {
              if (!isNumber(arr[i + 1][k])) {
                break;
              }
              arr[i + 1][k] = parseInt(arr[i + 1][k]);
            }
          }
          // going down and right
          if (isNumber(arr[i + 1][j])) {
            for (let k = j; k < arr[i + 1].length; k++) {
              if (!isNumber(arr[i + 1][k])) {
                break;
              }
              arr[i + 1][k] = parseInt(arr[i + 1][k]);
            }
          } else if (isNumber(arr[i + 1][j + 1])) {
            for (let k = j + 1; k < arr[i + 1].length; k++) {
              if (!isNumber(arr[i + 1][k])) {
                break;
              }
              arr[i + 1][k] = parseInt(arr[i + 1][k]);
            }
          }
          const mapped = arr.map((line) =>
            line.map((item) =>
              isSymbol(item) ? "." : typeof item === "number" ? item : "."
            )
          );

          mapped.pop();
          mapped.shift();

          const [num1, num2] = mapped
            .map((line) => line.join(""))
            .join("")
            .match(/\d+/g)
            .map(Number);

          result.push(num1 * num2);

          arr = arr.map((line) => line.map((item) => item.toString()));
        }
      }
    }
  }
  return result;
};

console.log(getNumberParts(dataGrid).reduce((a, b) => a + b));
