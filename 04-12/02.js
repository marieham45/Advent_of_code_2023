const sampleData = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

// helpers
const splitIntoLines = (str) => str.split("\n");

const getObject = (str) => {
  const [card, numbers] = str.split(": ");
  const cardNumber = parseInt(card.split(" ")[card.split(" ").length - 1]);
  const [winningNumbers, gameNumbers] = numbers.split(" | ");
  const winningNumbersArray = winningNumbers
    .split(" ")
    .filter((el) => el !== "");
  const gameNumbersArray = gameNumbers.split(" ").filter((el) => el !== "");

  return {
    cardNumber,
    winningNumbers: winningNumbersArray,
    gameNumbers: gameNumbersArray,
  };
};

const getScore = (obj) => {
  let cardScore = 0;
  for (let i = 0; i < obj.gameNumbers.length; i++) {
    if (obj.winningNumbers.includes(obj.gameNumbers[i])) {
      cardScore++;
    }
  }
  return cardScore;
};

const processCards = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const score = getScore(arr[i]);
    if (score > 0) {
      for (let j = 0; j < score; j++) {
        const copy = arr.find(
          (el) => el.cardNumber === arr[i].cardNumber + j + 1
        );
        if (copy) {
          arr.push(copy);
        } else break;
      }
    }

  }
 return arr.length;
};

const cardObjects = splitIntoLines(sampleData).map(getObject);
console.log(processCards(cardObjects));
