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
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
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
let firstCard, secondCard;
let hasFlipped = false;
let lockBoard = false;
let count = 0;
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);  
    newDiv.style.backgroundColor = "white";
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if(lockBoard){return;}
  if(event.target === firstCard){return;}
  // you can use event.target to see which element was clicked
  if(!hasFlipped){
    firstCard = event.target;
    firstCard.style.backgroundColor = firstCard.className;
    hasFlipped = true;
  }else{
    secondCard = event.target;
    secondCard.style.backgroundColor = secondCard.className;
    hasFlipped = false;

    if(firstCard.className === secondCard.className){
      //it's a match!!
      count +=2;
      firstCard.removeEventListener('click',handleCardClick);
      secondCard.removeEventListener('click',handleCardClick);
      console.log(count);
      
      
    }else{ //not a match
      lockBoard = true;
      setTimeout(function(){
        if(firstCard === null || secondCard === null) {return;}
        firstCard.style.backgroundColor = "white";
        secondCard.style.backgroundColor = "white";
        resetBoard();
      },1000);
    }
  }
}


function resetBoard(){
  hasFlipped = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

// when the DOM loads
createDivsForColors(shuffledColors);

document.getElementById('restart').addEventListener('click',restart);

function restart(){
  gameContainer.innerHTML="";
  count = 0;
  resetBoard();
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
}