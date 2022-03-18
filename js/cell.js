import ResultValidation from "./resultvalidation.js";

class Cell {
  roundwon = false;
  constructor(dimension, playerObj, gameState) {
    this.dimension = dimension;
    this.gameState = gameState;
    this.playerObj = playerObj;
  }

  handleCellClick(clickedCellEvent, gameActive) {
    const statusDisplay = document.querySelector(".game_status");

    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute("data-cell-index")
    );

    if (this.gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    this.handleCellPlayed(clickedCell, clickedCellIndex);

    let resultValidate = new ResultValidation(
      this.dimension,
      this.gameState,
      this.playerObj.getCurrentPlayer()
    );
    const roundwon = resultValidate.handleResultValidation(
      resultValidate.generateWinningConditions()
    );
    this.roundwon = roundwon;

    if (!roundwon) {
      this.playerObj.handlePlayerChange();
    }

    return this.playerObj;
  }

  handleCellPlayed(clickedCell, clickedCellIndex) {
    this.gameState[clickedCellIndex] = this.playerObj.getCurrentPlayer();
    clickedCell.innerHTML = this.playerObj.getCurrentPlayer();
  }

  getRoundWon = () => this.roundwon;
}

export default Cell;
