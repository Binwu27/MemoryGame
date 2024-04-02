let flippedCard = false;
let boardLock = false;
let firstClickedCard;
let secondClickedCard;

const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add("card", "unflipped", color);
    //newDiv.setAttribute("")

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick() {
  if (boardLock || this.classList.contains("flipped")) {
    console.log("Board is locked or card is already flipped.");
    return;
  }

  // Flip the clicked card
  this.classList.toggle("flipped");
  this.classList.toggle("unflipped");

  // store it in firstClickedCard
  if (!flippedCard) {
    flippedCard = true;
    firstClickedCard = this;
    console.log("First card clicked:", this.classList);
  } else {
    // store it in secondClickedCardxs
    secondClickedCard = this;
    console.log("Second card clicked:", this.classList);
    // Check if the two cards match

    matchCards();
    flippedCard = false;
    console.log("hello");
  }
}
// Create function for match cards
function matchCards() {
  let itMatches = firstClickedCard.className === secondClickedCard.className;

  itMatches ? disableFlipCard() : flipBackCard();
}

//if cards match remove clicklistener
function disableFlipCard() {
  firstClickedCard.removeEventListener("click", handleCardClick);
  secondClickedCard.removeEventListener("click", handleCardClick);
}
//if cards dont match
function flipBackCard() {
  boardLock = true;

  setTimeout(() => {
    firstClickedCard.classList.remove("flipped");
    secondClickedCard.classList.remove("flipped");
    firstClickedCard.classList.add("unflipped");
    secondClickedCard.classList.add("unflipped");

    resetBoard();
  }, 500);
}

//continue playing function
function resetBoard() {
  flippedCard = false;
  boardLock = false;
  firstClickedCard = null;
  secondClickedCard = null;
}

// when the DOM loads
createDivsForColors(shuffledColors);
