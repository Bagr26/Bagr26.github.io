console.log("Welcome");

const gameInstructions = document.getElementById("game-instructions");
const gameInput = document.getElementById("game-input");
const enter = document.getElementById("enter");
const roll = document.getElementById("roll");
const reset = document.getElementById("reset");
const choose = document.getElementById("choose");
const checkedMetroLines = document.getElementById("metro-lines");
const checkedFutureMetroLines = document.getElementById("future-metro-lines");
const endStationsGuessed = document.getElementById("end-stations-guessed");
const chosenPreview = document.getElementById("chosen-preview");
const enteredList = document.getElementById("entered-list");

const metroLines = [
  { lineName: "A", endStations: ["Nemocnice Motol", "Skalka", "Depo Hostiva\u0159"] }, //Nemocnice Motol, Skalka, Depo HostivaÅ™
  { lineName: "B", endStations: ["Zli\u010d\u00edn", "\u010cern\u00fd Most"] }, //ZliÄÃ­n, ÄŒernÃ½ Most
  { lineName: "C", endStations: ["H\u00e1je", "Let\u0148any"] }, //HÃ¡je, LetÅˆany
];

const futureMetroLines = [
  { lineName: "D", endStations: ["Depo P\u00edsnice", "N\u00e1m\u011bst\u00ed M\u00edru"] }, //Depo PÃ­snice, NÃ¡mÄ›stÃ­ MÃ­ru
];

let chosenCheck = false;
let randomArrayPosition = null;
let randomLine = null;
let randomLineEndStations = [];
let chosenLines = [];
let guessedCount = 0;
let endStationsNumber = null;
let lastLine = null;

function addChosenLines(...checkedLines) {
  if (checkedLines) checkedLines.forEach((linesArray) => (chosenLines = [...chosenLines, ...linesArray]));
}

function chooseLines() {
  chosenPreview.textContent = "Chosen: ";
  chosenLines = [];
  if (checkedMetroLines.checked) {
    addChosenLines(metroLines);
    chosenPreview.textContent += "Metro lines, ";
  }
  if (checkedFutureMetroLines.checked) {
    addChosenLines(futureMetroLines);
    chosenPreview.textContent += "Future metro lines, ";
  }
  if (chosenLines.length == 0) {
    gameInput.disabled = true;
    gameInstructions.textContent = "You have not chosen any of the groups";
    chosenPreview.textContent += "None";
    endStationsGuessed.textContent = "";
    chosenCheck = false;
    return;
  }
  gameInstructions.textContent = "You can roll a line";
  chosenPreview.textContent = chosenPreview.textContent.substring(0, chosenPreview.textContent.length - 2);
  console.log(chosenPreview.textContent);
  chosenCheck = true;
}

function rollLine() {
  randomArrayPosition = Math.floor(Math.random() * chosenLines.length);
  randomLine = chosenLines[randomArrayPosition];
  if (randomLine == lastLine && chosenLines.length > 1) return rollLine();
  randomLineEndStations = randomLine.endStations;
  lastLine = randomLine;
  console.log(randomLineEndStations);
}

function checkForAnswers() {
  if (randomLineEndStations.length == 0) return;
  if (randomLineEndStations.includes(gameInput.value)) {
    randomLineEndStations = randomLineEndStations.filter((e) => {
      return e !== gameInput.value;
    });
    if (guessedCount == 0) {
      enteredList.textContent = `Entered: ${gameInput.value}`;
    } else {
      enteredList.textContent += `, ${gameInput.value}`;
    }
    guessedCount++;
    endStationsGuessed.textContent = `${guessedCount}/${endStationsNumber}`;
    gameInput.value = "";
  }
  if (randomLineEndStations.length == 0) {
    gameInput.disabled = true;
    endStationsGuessed.textContent = "";
    gameInstructions.textContent = "Congrats. Press reset to play again";
    enter.disabled = true;
    roll.disabled = true;
  }
}

roll.addEventListener("click", () => {
  if (!chosenCheck) {
    gameInstructions.textContent = "You have not chosen any of the groups";
    return;
  }
  if (!randomLine) rollLine();
  gameInput.disabled = false;
  gameInstructions.textContent = `Chosen line: ${randomLine.lineName}; List all end stations.`;
  endStationsNumber = randomLine.endStations.length;
  endStationsGuessed.textContent = `0/${randomLine.endStations.length}`;
  randomLine = null;
  guessedCount = 0;
  enteredList.textContent = "Entered: None";
});

choose.addEventListener("click", () => {
  chooseLines();
});

reset.addEventListener("click", () => {
  randomNumber = null;
  randomLine = null;
  guessedCount = 0;
  endStationsNumber = null;
  gameInput.disabled = true;
  gameInstructions.textContent = "Pick groups of lines for random roll (If you have already chosen you can roll)";
  enter.disabled = false;
  roll.disabled = false;
  endStationsGuessed.textContent = "";
  enteredList.textContent = "Entered: None";
});

enter.addEventListener("click", () => {
  checkForAnswers();
});

gameInput.addEventListener("keyup", (event) => {
  if (event.key == "Enter") checkForAnswers();
});
