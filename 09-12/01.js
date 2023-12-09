const sampleData = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

// helpers
const splitIntoLines = (str) => str.split("\n");
const splitIntoCharacters = (str) => str.split("");

// data
const lines = splitIntoLines(sampleData).map((line) =>
  line.split(" ").map(Number)
);

const isAllZeroes = (arr) => {
  return arr.filter((num) => num === 0).length === arr.length;
};

const getNextNumber = (arr) => {
  const numberTree = [];
  numberTree.push(arr);

  while (!isAllZeroes(arr)) {
    const nextLine = [];

    for (let i = 0; i < arr.length - 1; i++) {
      nextLine.push(arr[i + 1] - arr[i]);
    }
    arr = [...nextLine];
    numberTree.push(arr);
  }

  for (let i = numberTree.length - 2; i >= 0; i--) {
    numberTree[i].push(
      numberTree[i][numberTree[i].length - 1] +
        numberTree[i + 1][numberTree[i + 1].length - 1]
    );
  }
  return numberTree[0][numberTree[0].length - 1];
};

console.log(lines.map(getNextNumber).reduce((a, b) => a + b));
