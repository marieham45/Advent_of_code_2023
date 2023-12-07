const sampleData = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

// helpers
const splitIntoLines = (str) => str.split("\n");
const splitIntoCharacters = (str) => str.split("");
const getCardValue = (card) => {
  switch (card) {
    case "2":
      return 2;
      break;
    case "3":
      return 3;
      break;
    case "4":
      return 4;
      break;
    case "5":
      return 5;
      break;
    case "6":
      return 6;
      break;
    case "7":
      return 7;
      break;
    case "8":
      return 8;
      break;
    case "9":
      return 9;
      break;
    case "T":
      return 10;
      break;
    case "J":
      return 1;
      break;
    case "Q":
      return 12;
      break;
    case "K":
      return 13;
      break;
    case "A":
      return 14;
      break;
    default:
      return 0;
  }
};
const mapCardValues = (hand) => {
  const cards = splitIntoCharacters(hand);
  return cards.map(getCardValue);
};

// data
const handsWithBids = splitIntoLines(sampleData)
  .map((hand) => hand.split(" "))
  .map((hand) => [hand[0], parseInt(hand[1])]);

// evaluation
const isHighCard = (handWithBid) => {
  const [hand, bid] = handWithBid;

  return (
    splitIntoCharacters(hand).filter(
      (card, _, arr) => arr.indexOf(card) === arr.lastIndexOf(card)
    ).length === 5
  );
};

const isFiveOfAKind = (handWithBid) => {
  const [hand, bid] = handWithBid;

  return (
    splitIntoCharacters(hand).filter((card, _, arr) => card === arr[0])
      .length === hand.length
  );
};

const isFourOfAKind = (handWithBid) => {
  const [hand, bid] = handWithBid;
  const cards = splitIntoCharacters(hand);

  return (
    !isFiveOfAKind(handWithBid) &&
    (cards.filter((card, _, arr) => card === arr[0]).length === 4 ||
      cards.filter((card, _, arr) => card === arr[1]).length === 4)
  );
};

const isFullHouse = (handWithBid) => {
  const [hand, bid] = handWithBid;

  return (
    (!isFiveOfAKind(handWithBid) &&
      !isFourOfAKind(handWithBid) &&
      ((splitIntoCharacters(hand).filter((card, _, arr) => card === arr[0])
        .length === 3 &&
        splitIntoCharacters(hand).filter(
          (card, _, arr) => card !== arr[0]
        )[0] ===
          splitIntoCharacters(hand).filter(
            (card, _, arr) => card !== arr[0]
          )[1]) ||
        (splitIntoCharacters(hand).filter((card, _, arr) => card === arr[1])
          .length === 3 &&
          splitIntoCharacters(hand).filter(
            (card, _, arr) => card !== arr[1]
          )[0] ===
            splitIntoCharacters(hand).filter(
              (card, _, arr) => card !== arr[1]
            )[1]))) ||
    (splitIntoCharacters(hand).filter((card, _, arr) => card === arr[2])
      .length === 3 &&
      splitIntoCharacters(hand).filter((card, _, arr) => card !== arr[2])[0] ===
        splitIntoCharacters(hand).filter((card, _, arr) => card !== arr[2])[1])
  );
};

const isThreeOfAKind = (handWithBid) => {
  const [hand, bid] = handWithBid;

  return (
    !isFiveOfAKind(handWithBid) &&
    !isFourOfAKind(handWithBid) &&
    !isFullHouse(handWithBid) &&
    (splitIntoCharacters(hand).filter((card, _, arr) => card === arr[0])
      .length === 3 ||
      splitIntoCharacters(hand).filter((card, _, arr) => card === arr[1])
        .length === 3 ||
      splitIntoCharacters(hand).filter((card, _, arr) => card === arr[2])
        .length === 3)
  );
};
const isOnePair = (handWithBid) => {
  const [hand, bid] = handWithBid;

  return (
    splitIntoCharacters(hand).filter(
      (card, _, arr) => arr.indexOf(card) === arr.lastIndexOf(card)
    ).length === 3
  );
};
const isTwoPairs = (handWithBid) => {
  const [hand, bid] = handWithBid;

  return (
    !isFiveOfAKind(handWithBid) &&
    !isFourOfAKind(handWithBid) &&
    !isFullHouse(handWithBid) &&
    !isThreeOfAKind(handWithBid) &&
    !isOnePair(handWithBid) &&
    !isHighCard(handWithBid)
  );
};

const evaluateHands = (hands) => {
  const evaluatedHands = [];

  for (let i = 0; i < hands.length; i++) {
    const hand = { hand: hands[i][0], bid: hands[i][1] };

    if (hand.hand.includes("J")) {
      const remainder = hand.hand.split("").filter((card) => card !== "J");
      if (remainder.length === 1 || remainder.length === 0) {
        hand.evaluation = 7;
        evaluatedHands.push(hand);
      } else if (remainder.length === 2) {
        if (remainder[0] === remainder[1]) {
          hand.evaluation = 7;
          evaluatedHands.push(hand);
        } else {
          hand.evaluation = 6;
          evaluatedHands.push(hand);
        }
      } else if (remainder.length === 3) {
        if (
          remainder.filter(
            (hand, _, arr) => arr.indexOf(hand) === arr.lastIndexOf(hand)
          ).length === 0
        ) {
          hand.evaluation = 7;
          evaluatedHands.push(hand);
        } else if (
          remainder.filter(
            (hand, _, arr) => arr.indexOf(hand) === arr.lastIndexOf(hand)
          ).length === 1
        ) {
          hand.evaluation = 6;
          evaluatedHands.push(hand);
        } else {
          hand.evaluation = 4;
          evaluatedHands.push(hand);
        }
      } else {
        if (
          remainder.filter(
            (hand, _, arr) => arr.indexOf(hand) === arr.lastIndexOf(hand)
          ).length === 0
        ) {
          if (
            remainder.filter((hand, _, arr) => hand === arr[0]).length === 4
          ) {
            hand.evaluation = 7;
            evaluatedHands.push(hand);
          } else {
            hand.evaluation = 5;
            evaluatedHands.push(hand);
          }
        } else if (
          remainder.filter(
            (hand, _, arr) => arr.indexOf(hand) === arr.lastIndexOf(hand)
          ).length === 1
        ) {
          hand.evaluation = 6;
          evaluatedHands.push(hand);
        } else if (
          remainder.filter(
            (hand, _, arr) => arr.indexOf(hand) === arr.lastIndexOf(hand)
          ).length === 2
        ) {
          hand.evaluation = 4;
          evaluatedHands.push(hand);
        } else {
          hand.evaluation = 2;
          evaluatedHands.push(hand);
        }
      }
    } else {
      if (isHighCard(hands[i])) {
        hand.evaluation = 1;
        evaluatedHands.push(hand);
      } else if (isFiveOfAKind(hands[i])) {
        hand.evaluation = 7;
        evaluatedHands.push(hand);
      } else if (isFourOfAKind(hands[i])) {
        hand.evaluation = 6;
        evaluatedHands.push(hand);
      } else if (isFullHouse(hands[i])) {
        hand.evaluation = 5;
        evaluatedHands.push(hand);
      } else if (isThreeOfAKind(hands[i])) {
        hand.evaluation = 4;
        evaluatedHands.push(hand);
      } else if (isTwoPairs(hands[i])) {
        hand.evaluation = 3;
        evaluatedHands.push(hand);
      } else if (isOnePair(hands[i])) {
        hand.evaluation = 2;
        evaluatedHands.push(hand);
      }
    }
  }

  return evaluatedHands;
};

const fiveOfAKinds = evaluateHands(handsWithBids).filter(
  (hand) => hand.evaluation === 7
);
const fourOfAKinds = evaluateHands(handsWithBids).filter(
  (hand) => hand.evaluation === 6
);
const fullHouses = evaluateHands(handsWithBids).filter(
  (hand) => hand.evaluation === 5
);
const threeOfAKinds = evaluateHands(handsWithBids).filter(
  (hand) => hand.evaluation === 4
);
const twoPairs = evaluateHands(handsWithBids).filter(
  (hand) => hand.evaluation === 3
);
const onePairs = evaluateHands(handsWithBids).filter(
  (hand) => hand.evaluation === 2
);
const highCards = evaluateHands(handsWithBids).filter(
  (hand) => hand.evaluation === 1
);

const getRanking = (arr, ranking) => {
  const result = [];

  if (arr.length === 1) {
    arr[0] = arr[0].bid * ranking;
    result.push(arr[0]);
  } else if (arr.length > 1) {
    arr.sort(
      (a, b) =>
        mapCardValues(b.hand)[0] - mapCardValues(a.hand)[0] ||
        mapCardValues(b.hand)[1] - mapCardValues(a.hand)[1] ||
        mapCardValues(b.hand)[2] - mapCardValues(a.hand)[2] ||
        mapCardValues(b.hand)[3] - mapCardValues(a.hand)[3] ||
        mapCardValues(b.hand)[4] - mapCardValues(a.hand)[4]
    );
    arr = arr.map((hand, i) => hand.bid * (ranking - i));
    result.push(...arr);
  }

  return result;
};

const fiveOfAKindsRanked = getRanking(fiveOfAKinds, handsWithBids.length);
const fourOfAKindsRanked = getRanking(
  fourOfAKinds,
  handsWithBids.length - fiveOfAKinds.length
);
const fullHousesRanked = getRanking(
  fullHouses,
  handsWithBids.length - fiveOfAKinds.length - fourOfAKinds.length
);
const threeOfAKindsRanked = getRanking(
  threeOfAKinds,
  handsWithBids.length -
    fiveOfAKinds.length -
    fourOfAKinds.length -
    fullHouses.length
);
const twoPairsRanked = getRanking(
  twoPairs,
  handsWithBids.length -
    fiveOfAKinds.length -
    fourOfAKinds.length -
    fullHouses.length -
    threeOfAKinds.length
);
const onePairsRanked = getRanking(
  onePairs,
  handsWithBids.length -
    fiveOfAKinds.length -
    fourOfAKinds.length -
    fullHouses.length -
    threeOfAKinds.length -
    twoPairs.length
);
const highCardsRanked = getRanking(
  highCards,
  handsWithBids.length -
    fiveOfAKinds.length -
    fourOfAKinds.length -
    fullHouses.length -
    threeOfAKinds.length -
    twoPairs.length -
    onePairs.length
);

const ranked = [
  ...fiveOfAKindsRanked,
  ...fourOfAKindsRanked,
  ...fullHousesRanked,
  ...threeOfAKindsRanked,
  ...twoPairsRanked,
  ...onePairsRanked,
  ...highCardsRanked,
];

console.log(ranked.reduce((a, b) => a + b));
