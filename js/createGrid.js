export function createGrid(dimension, cellParentList) {
  let playerDisplay = [];
  const r = document.querySelector(":root");
  console.log(dimension === 4);

  if (dimension === 3) {
    document.getElementById("game-screen-3").style.display = "block";
    r.style.setProperty("--repeat-cell", 3);
    playerDisplay = createCell(cellParentList[0], dimension);
  }
  if (dimension === 4) {
    document.getElementById("game-screen-4").style.display = "block";
    r.style.setProperty("--repeat-cell", 4);
    playerDisplay = createCell(cellParentList[1], dimension);
  }

  if (dimension === 5) {
    document.getElementById("game-screen-5").style.display = "block";
    r.style.setProperty("--repeat-cell", 5);
    playerDisplay = createCell(cellParentList[2], dimension);
  }
  if (dimension === 6) {
    document.getElementById("game-screen-6").style.display = "block";
    r.style.setProperty("--repeat-cell", 6);
    playerDisplay = createCell(cellParentList[3], dimension);
  }
  return playerDisplay;
}

function createCell(gameCell, dimension) {
  console.log(gameCell + "..........." + dimension);
  const size = dimension * dimension;
  for (let i = 0; i < size; i++) {
    let p = document.createElement("div");
    p.setAttribute("data-cell-index", i.toString());
    p.setAttribute("class", "cell");
    gameCell.appendChild(p);
  }
  return document.querySelectorAll(".cell");
}
