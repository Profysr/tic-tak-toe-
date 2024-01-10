// const startGame = () => {
//   //Creating Boxes
//   for (let i = 0; i < rows; i++) {
//     let row = [];
//     for (let j = 0; j < cols; j++) {
//       let box = document.createElement("div");
//       box.id = `${i}-${j}`;
//       box.classList.add("box");

//       box.draggable = true;

//       box.addEventListener("click", () => {
//         handleClick(box);
//       });
//       box.addEventListener("dragstart", dragStart); //as soon as clicked on the box
//       box.addEventListener("dragover", dragOver); //keep clicked and start dragging with mouse
//       box.addEventListener("dragenter", dragEnter); //box dragged to another box region
//       box.addEventListener("dragleave", dragLeave); //when leave on the other box
//       box.addEventListener("drop", dragDrop); //dropping onto another
//       box.addEventListener("dragend", dragEnd); //after drag process completed

//       row.push(box);
//       // document.querySelector(".container").append(box);
//       // document.querySelector(".container").innerHTML = box; // this will not work as it gives error html collection
//     }
//     container.push(row);
//   }
// };

function startGame() {
  //Creating Boxes
  for (let i = 0; i < rows; i++) {
    let rowHtml = "";
    let row = [];

    for (let j = 0; j < cols; j++) {
      let box = document.createElement("div");
      box.id = `${i}-${j}`;
      box.classList.add("box");

      box.draggable = true;

      box.addEventListener("click", () => {
        handleClick(box);
      });
      // box.addEventListener("click", handleClick);
      box.addEventListener("dragstart", dragStart);
      box.addEventListener("dragover", dragOver);
      box.addEventListener("dragenter", dragEnter);
      box.addEventListener("dragleave", dragLeave);
      box.addEventListener("drop", dragDrop);
      box.addEventListener("dragend", dragEnd);

      row.push(box);
      rowHtml += box.outerHTML; // Convert box element to HTML string and append
      // document.querySelector(".container").append(box); //while append can add a whole element in the html
    }

    // Append the entire row to the container
    document.querySelector(".container").innerHTML += rowHtml; //innerHtml wants a string to add into the html

    container.push(row);
  }
  // console.log(container);
}
