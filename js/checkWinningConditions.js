export function handleResultValidation(dimension, gameState, currentPlayer) {
  const winningConditions = generateWinningConditions(dimension);

  let gameStateArray = [];
  let hasWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    for (let j = 0; j < dimension; j++) {
      gameStateArray[j] = gameState[winningConditions[i][j]];
    }

    hasWon = gameStateArray.every(function (element, index) {
      return element === currentPlayer;
    });
    if (hasWon) break;
  }

  return hasWon;
}

function generateWinningConditions(dimension) {
  let winningConditions = [];
  let tempArrayDiaLR = [];
  let tempArrayDiaRL = [];
  let p = 0;
  let q = 0;
  for (let i = 0; i < dimension; i++) {
    p = (dimension + 1) * i;
    tempArrayDiaLR.push(p);

    q = (dimension - 1) * (i + 1);
    tempArrayDiaRL.push(q);
  }

  winningConditions.push(tempArrayDiaLR);
  winningConditions.push(tempArrayDiaRL);
  for (let i = 0; i < dimension; i++) {
    let tempArrayRow = [];
    let tempArrayColumn = [];

    let a;
    let b;

    for (let j = 0; j < dimension; j++) {
      a = i * dimension + j;
      tempArrayRow.push(a);

      b = j * dimension + i;
      tempArrayColumn.push(b);
    }

    winningConditions.push(tempArrayRow);
    winningConditions.push(tempArrayColumn);
  }
  return winningConditions;
  //console.log(winningConditions);
}
