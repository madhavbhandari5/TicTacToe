export function handleResultValidation(dimension, gameState) {
  let roundwon = false;
  const winningConditions = generateWinningConditions(dimension);

  let numberOfLoop = winningConditions.length;

  for (let i = 0; i < numberOfLoop; i++) {
    const winCondition = winningConditions[i];
    if (dimension === 3) {
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];

      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundwon = true;
        break;
      }
    }

    if (dimension === 4) {
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      let d = gameState[winCondition[3]];

      if (a === "" || b === "" || c === "" || d === "") {
        continue;
      }
      if (a === b && b === c && c === d) {
        roundwon = true;
        break;
      }
    }

    if (dimension === 5) {
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      let d = gameState[winCondition[3]];
      let e = gameState[winCondition[4]];

      if (a === "" || b === "" || c === "" || d === "" || e === "") {
        continue;
      }
      if (a === b && b === c && c === d && d === e) {
        roundwon = true;
        break;
      }
    }

    if (dimension === 6) {
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      let d = gameState[winCondition[3]];
      let e = gameState[winCondition[4]];
      let f = gameState[winCondition[5]];

      if (
        a === "" ||
        b === "" ||
        c === "" ||
        d === "" ||
        e === "" ||
        f === ""
      ) {
        continue;
      }
      if (a === b && b === c && c === d && d === e && e === f) {
        roundwon = true;
        break;
      }
    }
  }
  return roundwon;
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

const statusDisplay = document.querySelector(".game_status");
