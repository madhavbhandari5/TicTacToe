class ResultValidation {
  constructor(dimension, gameState, currentPlayer) {
    this.dimension = dimension;
    this.gameState = gameState;
    this.currentPlayer = currentPlayer;
  }

  generateWinningConditions() {
    let winningConditions = [];
    let tempArrayDiaLR = [];
    let tempArrayDiaRL = [];
    let p = 0;
    let q = 0;
    for (let i = 0; i < this.dimension; i++) {
      p = (this.dimension + 1) * i;
      tempArrayDiaLR.push(p);

      q = (this.dimension - 1) * (i + 1);
      tempArrayDiaRL.push(q);
    }

    winningConditions.push(tempArrayDiaLR);
    winningConditions.push(tempArrayDiaRL);
    for (let i = 0; i < this.dimension; i++) {
      let tempArrayRow = [];
      let tempArrayColumn = [];

      let a;
      let b;

      for (let j = 0; j < this.dimension; j++) {
        a = i * this.dimension + j;
        tempArrayRow.push(a);

        b = j * this.dimension + i;
        tempArrayColumn.push(b);
      }

      winningConditions.push(tempArrayRow);
      winningConditions.push(tempArrayColumn);
    }
    return winningConditions;
  }

  handleResultValidation(winningConditions) {
    let gameStateArray = [];
    let hasWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
      for (let j = 0; j < this.dimension; j++) {
        gameStateArray[j] = this.gameState[winningConditions[i][j]];
      }

      const lcurrentPlayer = this.currentPlayer;
      hasWon = gameStateArray.every(function (element, index) {
        return element == lcurrentPlayer;
      });
      if (hasWon) break;
    }

    return hasWon;
  }
}

export default ResultValidation;
