const sampleData = `...............#..........................#....................................................................#............................
....................................................................#................................#......................................
.....#....................................................................................................#...........................#.....
...................#......................................#...................................................................#.............
...........#....................................#................#.........................#............................#...................
#.................................#........................................#.........#.......................#.....#.....................#..
..........................#............#.............................#......................................................................
.....................#......................................................................................................................
..............#..............................#......#.......................................................................#...............
...#.............................................................................#...........#.......#...............#..............#.......
..............................#..........#..................................................................................................
...........................................................#...........#.......................................#.........#..................
.........................#........................................#..........#..............................................................
.........#...........................................................................#.....................#................................
.................................#.............................................................................................#.......#....
......................#.......................................................................#..................#..........................
..............................................#.............................................................................................
.................#..........#.........................#..............#....................................................#.................
.............................................................#..........................#...................................................
..........................................................................................................#..........................#......
........................................#..........#....................#.....#.......................................#.....................
...............#........................................#.................................................................................#.
....................................................................................#.....#....................#............................
.........#......................#....................................................................#.....................#................
...............................................................................................#...................#........................
....#........#............#......................................#..........#.............................#.................................
...................................#.............#..........................................................................................
.......................................................................#...............#...................................................#
............................................#...............................................................................................
........#.............................................#.......................#.............#...........#...................................
#..................#...........#.............................#..............................................................................
..................................................................#.................................................#.......................
....................................................................................................................................#.......
....#.................#......................#..............................................................#............#................#.
....................................................#.....................................#.................................................
..........................#.................................................#...................#............................#..............
.........................................#.....................#.......#....................................................................
.#...........#..................................................................#...........................................................
..............................................#......................................................#..................#...................
...................................#...................................................#....................#...............................
...................#.........#..........................#...................................................................................
........................................#..........#.................#......................#...............................................
......................................................................................................................#.....................
...........................................................#......................................#................................#......#.
.#.......................#..................#.......................................#.......................................................
..................#.............................................................................................#............#..............
......#............................#................#......................#..........................#.................#...................
............................................................................................................................................
...............................#............................#...............................#...........................................#...
.....................#...................#.............#...............................#.....................#..............................
.........#....................................................................................................................#.............
..................................................................................#..............#.....................#....................
....................................................#...............#.....#......................................#................#.........
..#.............................#...........................................................................................................
............................................................................................................................#...............
.........................................#.....#.............................#.........#...............#..................................#.
.......#...................#................................................................................................................
.............................................................#.............................................#................................
................#..................................#................#.....................................................#........#........
......................#............#................................................#.............#.....................................#...
.#..........................................................................................................................................
.......................................................#...................#............................#...................................
..........#....................#...........#..........................................................................#.....................
.................#..............................#...............................................................................#...........
.........................#......................................................#.............#.............................................
...................................#.................................#...................#.................#...............................#
........#.................................................#.........................................................................#.......
.......................................................................................................#....................................
..#...................................................#.....................................................................................
.............#.................................................................................................................#............
......................#.........................................................#..................#..............#.........................
.....#.........................#.....................................#.....#.............................#.............#....................
..........................#............#.......#............................................................................................
..........#.......#............................................#........................#..........................................#........
........................................................................#...................................................................
............................................................................................................................................
.........................................#....................................#..............#.......................#......................
...#................................................#.......................................................................#...............
..............#.....................#..........#....................................#...................#...................................
.............................#...................................................................#..........................................
..........#............#........................................#.................................................#.........................
...........................................#.....................................#..........................................................
.#........................................................................................................#................#................
..................................#....................................#.................#...........................................#.....#
..................................................#................................................#........................................
............................................................................................................................................
...............#.............................................................................................................#..............
..#...................#.................#.............#.......................#.........................#.......#.......................#...
...........#..................#.................#............#.......#......................................................................
............................................................................................................................................
..........................................................................................#.........#.......................................
.........................................................................................................................#..................
......#.....................................................................................................................................
..................................#.....#...............#..........#..............#.............................#...........................
.........................#.............................................................#.............................#............#.........
............................................#...............................................................................................
..#........#............................................................#....................#.........#................................#...
....................................#.......................#...............................................................#...............
..................................................................................................................#.........................
.......#.......................#........#..................................#................................................................
.....................#.................................#.........#....................#.....................................................
..................................................................................................#.............................#.....#.....
...............#.............................#..............................................................................................
.......................................................................#....................#.............#............#....................
..........................#.....#......#..................................................................................................#.
............................................................#.......................#.......................................................
......................#...............................#...........................................................#.................#.......
.................#........................#.................................................................................................
....#..........................................#...................#.......#.............................#.................#................
...............................................................................................#............................................
.............................................................#...................#..........................................................
...................................#....................................#.............................................#.....................
..........................................................................................#..................................#..............
........#..................................#.............#..........................#......................#................................
.........................#....................................................................#.................#.........................#.
..#..........................................................................#..............................................................
...................................................#..........#....................................#........................................
............#.........#.................................................................................................#.......#...........
.......#.........................#..........#........................#......................................................................
..........................#...............................#...............................#.................................................
...#...........#.......................#............................................#................#.................................#....
............................................................................................................................................
.........................................................................#..................................................................
....................................................#.............#...........................................#...........................#.
.................#.................#.......#..........................................#.................#................#..................
................................................................................#...............#...........................................
...........................#.................................#................................................................#.............
.....................#................#.................................#.........................................#.........................
......#.....................................................................................................................................
#.........................................................................................................................................#.
............................................#..............................................#................................................
.........#........#.......................................#.................................................................................
...............................#...................................#....................................#...................................
...#....................................#............#..................................................................#.............#.....
..................................................................................#......#......#...........................................
......................#........................................#............................................................................
...............#...............................#............................#...............................................................
.......#..................#.................................................................................................................
......................................#............#........#...................#..........................................#................
...#...............#..................................................#...........................#........#........#................#......`;

// helpers
const splitIntoLines = (str) => str.split("\n");

// data
const universe = splitIntoLines(sampleData).map((line) => line.split(""));

const expandUniverse = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].filter((item) => item === ".").length === arr[i].length) {
      arr = [...arr.slice(0, i + 1), arr[i].map(item => item = "M"), ...arr.slice(i + 1)];
      i++;
    }
  }
  for (let i = 0; i < arr[0].length; i++) {
    if (
      arr.map((line) => (line = line[i])).filter((item) => item === "." || item === "M")
        .length === arr.length
        
    ) {
      for (let j = 0; j < arr.length; j++) {
        arr[j] = [...arr[j].slice(0, i + 1), "M", ...arr[j].slice(i + 1)];
      }
      i++;

    }
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

    const galaxyDistances = [];
    for (let j = 1; i + j <= num; j++) {
      const nextGalaxySpot = [
        arr.indexOf(arr.find((line) => line.includes(i + j))),
        arr[arr.indexOf(arr.find((line) => line.includes(i + j)))].indexOf(
          i + j
        ),
      ];
      if (galaxySpot[0] === nextGalaxySpot[0]) {
        const startingPoint = galaxySpot[1] < nextGalaxySpot[1] ? galaxySpot[1] : nextGalaxySpot[1]
        const endPoint = galaxySpot[1] < nextGalaxySpot[1] ? nextGalaxySpot[1] : galaxySpot[1]
        let addMillion = 0
        for (let k = startingPoint; k < endPoint; k++) {
            if (arr[galaxySpot[0]][k] === "M") {
                addMillion += 999998
            }
        }
        galaxyDistances.push(Math.abs(galaxySpot[1] - nextGalaxySpot[1]) + addMillion);
      } else if (galaxySpot[1] === nextGalaxySpot[1]) {
        const startingPoint = galaxySpot[0] < nextGalaxySpot[0] ? galaxySpot[0] : nextGalaxySpot[0]
        const endPoint = galaxySpot[0] < nextGalaxySpot[0] ? nextGalaxySpot[0] : galaxySpot[0]
        let addMillion = 0
        for (let k = startingPoint; k < endPoint; k++) {
            if (arr[k][galaxySpot[1]] === "M") {
                addMillion += 999998
            }
        }
        galaxyDistances.push(Math.abs(galaxySpot[0] - nextGalaxySpot[0]) + addMillion);
      } else {
        const startingPointHorizontal = galaxySpot[1] < nextGalaxySpot[1] ? galaxySpot[1] : nextGalaxySpot[1]
        const endPointHorizontal = galaxySpot[1] < nextGalaxySpot[1] ? nextGalaxySpot[1] : galaxySpot[1]
        const startingPointVertical = galaxySpot[0] < nextGalaxySpot[0] ? galaxySpot[0] : nextGalaxySpot[0]
        const endPointVertical = galaxySpot[0] < nextGalaxySpot[0] ? nextGalaxySpot[0] : galaxySpot[0]
        let addMillion = 0
        for (let k = startingPointHorizontal; k < endPointHorizontal; k++) {
            if (arr[galaxySpot[0]][k] === "M") {
                addMillion += 999998
            }
        }
        for (let k = startingPointVertical; k < endPointVertical; k++) {
            if (arr[k][galaxySpot[1]] === "M") {
                addMillion += 999998
            }
        }
        galaxyDistances.push(Math.abs(galaxySpot[0] - nextGalaxySpot[0]) + Math.abs(galaxySpot[1] - nextGalaxySpot[1]) + addMillion);
      }
    }
    distances.push(galaxyDistances);

  }
  return distances;
};

console.log(getDistances(universeExpandedNumbered, galaxyNumber).flat().reduce((a, b) => a + b));
