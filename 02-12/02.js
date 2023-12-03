const sampleData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

// helpers
const splitIntoLines = (str) => str.split("\n");

const getMinimumColourNumber = (str) => {
  let minRed = 1;
  let minGreen = 1;
  let minBlue = 1;
  const [id, sets] = str.split(": ");
  const splitSets = sets.split("; ");
  for (let i = 0; i < splitSets.length; i++) {
    const set = splitSets[i].split(", ");
    for (let j = 0; j < set.length; j++) {
      const [number, colour] = set[j].split(" ");
      if (colour === "red" && parseInt(number) > minRed) {
        minRed = parseInt(number);
      } else if (colour === "green" && parseInt(number) > minGreen) {
        minGreen = parseInt(number);
      } else if (colour === "blue" && parseInt(number) > minBlue) {
        minBlue = parseInt(number);
      }
    }
  }
  return minRed * minGreen * minBlue;
};

console.log(
  splitIntoLines(sampleData)
    .map(getMinimumColourNumber)
    .reduce((a, b) => a + b)
);
