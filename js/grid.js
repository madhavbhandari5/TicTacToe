class Grid {
  constructor(dimension, cellParentList) {
    this.dimension = dimension;
    this.cellParentList = cellParentList;
  }

  createCell(gameCell, dimension) {
    const size = dimension * dimension;
    for (let i = 0; i < size; i++) {
      let p = document.createElement("div");
      p.setAttribute("data-cell-index", i.toString());
      p.setAttribute("class", "cell");
      gameCell.appendChild(p);
    }
    return document.querySelectorAll(".cell");
  }

  createGrid() {
    let playerDisplay = [];
    const r = document.querySelector(":root");

    if (this.dimension === 3) {
      document.getElementById("game-screen-3").style.display = "block";
      r.style.setProperty("--repeat-cell", 3);
      playerDisplay = this.createCell(this.cellParentList[0], this.dimension);
    }
    if (this.dimension === 4) {
      document.getElementById("game-screen-4").style.display = "block";
      r.style.setProperty("--repeat-cell", 4);
      playerDisplay = this.createCell(this.cellParentList[1], this.dimension);
    }

    if (this.dimension === 5) {
      document.getElementById("game-screen-5").style.display = "block";
      r.style.setProperty("--repeat-cell", 5);
      playerDisplay = this.createCell(this.cellParentList[2], this.dimension);
    }
    if (this.dimension === 6) {
      document.getElementById("game-screen-6").style.display = "block";
      r.style.setProperty("--repeat-cell", 6);
      playerDisplay = this.createCell(this.cellParentList[3], this.dimension);
    }
    return playerDisplay;
  }
}

export default Grid;
