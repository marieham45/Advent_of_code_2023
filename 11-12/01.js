const sampleData = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

// helpers
const splitIntoLines = (str) => str.split("\n");
const splitIntoCharacters = (str) => str.split("");

// data
const universe = splitIntoLines(sampleData).map((line) => line.split(""));

const expandUniverse = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].filter((item) => item === ".").length === arr[i].length) {
      arr = [...arr.slice(0, i + 1), arr[i], ...arr.slice(i + 1)];
      i++;
    }
  }
  for (let i = 0; i < arr[0].length; i++) {
    if (
      arr.map((line) => (line = line[i])).filter((item) => item === ".")
        .length === arr.length
    ) {
      for (let j = 0; j < arr.length; j++) {
        arr[j] = [...arr[j].slice(0, i + 1), arr[j][i], ...arr[j].slice(i + 1)];
      }
    }
    i++;
  }
  return arr;
};

const universeExpanded = expandUniverse(universe);

const numberGalaxies = (arr) => {
  let galaxyNumber = 1;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === "#") {
        arr[i][j] = galaxyNumber;
        galaxyNumber++;
      }
    }
  }
  return { universeExpandedNumbered: arr, galaxyNumber: galaxyNumber - 1 };
};

const { universeExpandedNumbered, galaxyNumber } =
  numberGalaxies(universeExpanded);

const getDistances = (arr, num) => {
  const distances = [];
  for (let i = 1; i <= num; i++) {
    const galaxySpot = [
      arr.indexOf(arr.find((line) => line.includes(i))),
      arr[arr.indexOf(arr.find((line) => line.includes(i)))].indexOf(i),
    ];
    console.log({ i });

    const galaxyDistances = [];
    for (let j = 1; i + j < num; j++) {
      //console.log(arr.indexOf(arr.find((line) => line.includes(i + j))));
      const nextGalaxySpot = [
        arr.indexOf(arr.find((line) => line.includes(i + j))),
        arr[arr.indexOf(arr.find((line) => line.includes(i + j)))].indexOf(
          i + j
        ),
      ];
      if (galaxySpot[0] === nextGalaxySpot[0]) {
        galaxyDistances.push(Math.abs(galaxySpot[1] - nextGalaxySpot[1]));
      } else if (galaxySpot[1] === nextGalaxySpot[1]) {
        galaxyDistances.push(Math.abs(galaxySpot[0] - nextGalaxySpot[0]));
      } else {
        galaxyDistances.push("diagonal");
      }
      distances.push(galaxyDistances);
    }
  }
  return distances;
};
console.log(getDistances(universeExpandedNumbered, galaxyNumber));
