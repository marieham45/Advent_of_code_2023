const sampleData = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

// helpers
const splitIntoLines = (str) => str.split("\n");
const splitIntoCharacters = (str) => str.split("");

const handsWithBids = splitIntoLines(sampleData)
  .map((hand) => hand.split(" "))
  .map((hand) => [hand[0], parseInt(hand[1])]);

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

  return (
    !isFiveOfAKind(hand) &&
    (splitIntoCharacters(hand).filter((card, _, arr) => card === arr[0])
      .length === 4 ||
      splitIntoCharacters(hand).filter((card, _, arr) => card === arr[1])
        .length === 4)
  );
};

const isFullHouse = (handWithBid) => {
  const [hand, bid] = handWithBid;

  return (
    (!isFiveOfAKind(hand) &&
      !isFourOfAKind(hand) &&
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
    !isFiveOfAKind(hand) &&
    !isFourOfAKind(hand) &&
    !isFullHouse(hand) &&
    (splitIntoCharacters(hand).filter((card, _, arr) => card === arr[0])
      .length === 3 ||
      splitIntoCharacters(hand).filter((card, _, arr) => card === arr[1])
        .length === 3 ||
      splitIntoCharacters(hand).filter((card, _, arr) => card === arr[2])
        .length === 3)
  );
};

const isTwoPairs = (handWithBid) => {
  const [hand, bid] = handWithBid;

  return (
    (!isFiveOfAKind(hand) &&
      !isFourOfAKind(hand) &&
      !isFullHouse(hand) &&
      !isThreeOfAKind(hand) &&
      splitIntoCharacters(hand).filter((card, _, arr) => card === arr[0])
        .length === 2 &&
      (splitIntoCharacters(hand)
        .filter((card, _, arr) => card !== arr[0])
        .filter((card, _, arr) => card === arr[0]).length === 2 ||
        splitIntoCharacters(hand)
          .filter((card, _, arr) => card !== arr[0])
          .filter((card, _, arr) => card === arr[1]).length === 2)) ||
    (splitIntoCharacters(hand).filter((card, _, arr) => card === arr[1])
      .length === 2 &&
      (splitIntoCharacters(hand)
        .filter((card, _, arr) => card !== arr[1])
        .filter((card, _, arr) => card === arr[0]).length === 2 ||
        splitIntoCharacters(hand)
          .filter((card, _, arr) => card !== arr[0])
          .filter((card, _, arr) => card === arr[1]).length === 2)) ||
    (splitIntoCharacters(hand).filter((card, _, arr) => card === arr[2])
      .length === 2 &&
      (splitIntoCharacters(hand)
        .filter((card, _, arr) => card !== arr[2])
        .filter((card, _, arr) => card === arr[0]).length === 2 ||
        splitIntoCharacters(hand)
          .filter((card, _, arr) => card !== arr[0])
          .filter((card, _, arr) => card === arr[1]).length === 2)) ||
    (splitIntoCharacters(hand).filter((card, _, arr) => card === arr[2])
      .length === 2 &&
      (splitIntoCharacters(hand)
        .filter((card, _, arr) => card !== arr[3])
        .filter((card, _, arr) => card === arr[0]).length === 2 ||
        splitIntoCharacters(hand)
          .filter((card, _, arr) => card !== arr[3])
          .filter((card, _, arr) => card === arr[1]).length === 2))
  );
};

const isOnePair = (handWithBid) => {
  const [hand, bid] = handWithBid;

  return (
    !isFiveOfAKind(hand) &&
    !isFourOfAKind(hand) &&
    !isFullHouse(hand) &&
    !isThreeOfAKind(hand) &&
    !isTwoPairs(hand) &&
    !isHighCard(hand)
  );
};

// console.log(handsWithBids.map(isHighCard));
// console.log(handsWithBids.map(isFiveOfAKind));
// console.log(handsWithBids.map(isFourOfAKind));
// console.log(handsWithBids.map(isFullHouse));
// console.log(handsWithBids.map(isThreeOfAKind));
// console.log(handsWithBids.map(isTwoPairs));
// console.log(handsWithBids.map(isOnePair));ˇ

console.log(isFourOfAKind("55T55"));
