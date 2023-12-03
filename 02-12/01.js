const sampleData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

/*The Elf would first like to know which games would have been possible if the bag contained 
only 12 red cubes, 13 green cubes, and 14 blue cubes?
*/

// helpers
const splitIntoLines = (str) => str.split("\n");

const validatePossible = (str) => {
  let possible = true;
  const [id, sets] = str.split(": ");
  const splitSets = sets.split("; ");
  for (let i = 0; i < splitSets.length; i++) {
    const set = splitSets[i].split(", ");
    for (let j = 0; j < set.length; j++) {
      const [number, colour] = set[j].split(" ");
      if (colour === "red" && parseInt(number) > 12) {
        possible = false;
        break;
      } else if (colour === "green" && parseInt(number) > 13) {
        possible = false;
        break;
      } else if (colour === "blue" && parseInt(number) > 14) {
        possible = false;
        break;
      }
    }
  }
  return possible ? parseInt(id.split(" ")[1]) : 0;
};

console.log(
  splitIntoLines(sampleData)
    .map(validatePossible)
    .reduce((a, b) => a + b)
);
