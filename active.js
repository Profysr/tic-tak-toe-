let rows = 3;
let cols = 3;
let container = [];

let currentPlayer = "O";
let count = 0;
let winner;

const playerStatus = document.querySelector(".playerStatus");
const creatingBoxes = () => {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      let box = document.createElement("div");
      box.id = `${i}-${j}`;
      box.classList.add("box");

      box.draggable = true;

      box.addEventListener("click", () => {
        handleClick(box);
      });
      box.addEventListener("dragstart", dragStart); //as soon as clicked on the box
      box.addEventListener("dragover", dragOver); //keep clicked and start dragging with mouse
      box.addEventListener("dragenter", dragEnter); //box dragged to another box region
      box.addEventListener("dragleave", dragLeave); //when leave on the other box
      box.addEventListener("drop", dragDrop); //dropping onto another
      box.addEventListener("dragend", dragEnd); //after drag process completed

      row.push(box);
      document.querySelector(".container").append(box);
    }
    container.push(row);
  }
};

const startGame = () => {
  creatingBoxes();
};

startGame();

const boxes = document.querySelectorAll(".box");

function handleClick(box) {
  count++;
  if (count <= 6) {
    if (!box.textContent) {
      box.textContent = currentPlayer;
      // box.classList.add("disabled");
      updatePlayerStatus();
      winner = checkWinner();
      if (winner) {
        displayWinner(winner);
      } else {
        return null;
      }
    }
  }
}

let currBox;
let otherBox;

function dragStart(e) {
  if (count >= 6) {
    if (checkTurn(e.target)) {
      currBox = e.target;
      console.log(currBox);
      return currBox;
    }
  }
  return false;
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave(e) {
  e.preventDefault();
}
function dragDrop(e) {
  if (count >= 6) {
    if (checkDragOnEmpty(e.target)) {
      otherBox = e.target;
      console.log(otherBox);
      return otherBox;
    }
  }
  return false;
}
function dragEnd(e) {
  if (checkValidMove()) {
    if (count >= 6) {
      let currVal = currBox.innerText,
        otherVal = otherBox.innerText;

      currBox.innerText = otherVal;
      otherBox.innerText = currVal;
      updatePlayerStatus();
    }
    winner = checkWinner();
    if (winner) displayWinner(winner);
    return true;
  }
  return false;
}

// Updating Player Status
function updatePlayerStatus() {
  currentPlayer = currentPlayer === "O" ? "X" : "O";
  playerStatus.textContent = `${currentPlayer}'s turn`;
}
function displayWinner(obj) {
  return (playerStatus.textContent = `The Winner is '${obj.player}' with pattern ${obj.pattern}`);
}
function checkWinner() {
  let winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (let pattern of winningPatterns) {
    const box1 = boxes[pattern[0]];
    const box2 = boxes[pattern[1]];
    const box3 = boxes[pattern[2]];
    if (
      box1.innerText &&
      box1.innerText === box2.innerText &&
      box1.innerText === box3.innerText
    ) {
      return {
        player: box1.innerText,
        pattern,
      };
    }
  }
}

//checking validitiy of player
function checkTurn(clickedBox) {
  if (clickedBox.innerText !== currentPlayer) {
    console.log("Drag Yours");
    return false;
  }
  return true;
}
function checkDragOnEmpty(draggedBox) {
  if (draggedBox.innerText === "") {
    return true;
  }
  console.log("drag on empty");
  return false;
}
function getCoordinates() {
  if (checkTurn && checkDragOnEmpty) {
    let currCoords = currBox.id.split("-"),
      otherCoords = otherBox.id.split("-");

    let r1 = Number(currCoords[0]),
      c1 = Number(currCoords[1]),
      r2 = Number(otherCoords[0]),
      c2 = Number(otherCoords[1]);

    return [r1, c1, r2, c2];
  }
  return false;
}
function checkValidMove() {
  if ((getCoordinates.length = 4)) {
    const [r1, c1, r2, c2] = getCoordinates();
    let moveLeft = c2 == c1 - 1 && r1 == r2,
      moveRight = c2 == c1 + 1 && r1 == r2,
      moveUp = r2 == r1 - 1 && c1 == c2,
      moveDown = r2 == r1 + 1 && c1 == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
    return isAdjacent;
  }
  return false;
}
