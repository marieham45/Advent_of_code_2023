const sampleData = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

const characters = sampleData.split(",");

const getHashAlgorithm = (str) => {
  let label = "";
  let type = "";
  let focus = "";

  if (str.includes("=")) {
    label = str.slice(0, str.length - 2);
    type = "=";
    focus = str.slice(str.length - 1);
  } else if (str.includes("-")) {
    label = str.slice(0, str.length - 1);
    type = "-";
  }
  let hash = 0;

  for (let i = 0; i < label.length; i++) {
    currentHash = hash;
    currentHash += label.charCodeAt(i);
    currentHash *= 17;
    currentHash = currentHash % 256;
    hash = currentHash;
  }
  return { label, type, focus, hash };
};

const fillBoxes = (arr) => {
  arr = arr.map(getHashAlgorithm);
  let boxes = [];
  for (let i = 0; i < 256; i++) {
    boxes.push([]);
  }
  for (let i = 0; i < arr.length; i++) {
    const sequence = arr[i];

    if (sequence.type === "=") {
      if (boxes[sequence.hash].some((el) => el.label === sequence.label)) {
        boxes[sequence.hash].find((el) => el.label === sequence.label).focus =
          sequence.focus;
      } else {
        boxes[sequence.hash].push(sequence);
      }
    } else {
      if (boxes[sequence.hash].some((el) => el.label === sequence.label)) {
        boxes[sequence.hash] = boxes[sequence.hash].filter(
          (el) => el.label !== sequence.label
        );
      }
    }
  }

  return boxes;
};

const getScore = (arr, index) => {
  return arr.map((el, i) => (index + 1) * (i + 1) * el.focus);
};

const filledBoxes = fillBoxes(characters);

console.log(
  filledBoxes
    .map((el, i) => getScore(el, i))
    .flat()
    .reduce((a, b) => a + b)
);
