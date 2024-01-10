//Function to make boxes using JS
function makeBox() {
  let clutter = "";
  for (let i = 1; i <= 9; i++) {
    clutter += `<div id=${i} class="box"></div>`;
  }
  document.querySelector(".container").innerHTML = clutter;
}

makeBox();

//array of nodelist containing all the div having box class
let boxes = document.querySelectorAll(".box");

//Variables
let currentPlayer = "X";
let count = 1;

//Function to Handle Click on the box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (count <= 6) {
      if (!box.textContent) {
        box.textContent = currentPlayer;
        box.classList.add("disable");
        currentPlayer = currentPlayer === "O" ? "X" : "O";
        count++;
      }
    } else {
      console.log("Now you can drag or drop boxes match the true one's");
    }
    const winner = checkWinner();
    if (winner) {
      alert(winner);
    }
    // checkWinner();
  });
});

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[a].textContent === boxes[c].textContent
    ) {
      return boxes[a].textContent; // Return the winning player ('X' or 'O')
    }
  }

  return null; // No winner yet
}
