import Grid from "./grid.js";
import Player from "./player.js";
import Cell from "./cell.js";

const statusDisplay = document.querySelector(".game_status");

window.onload = (event) => {
  main();
};

let playerDisplay;
let gameActive = false;
let cellObj;
let gameState = [];
let dimension = 0;
let playerObj;

function main() {
  document.querySelectorAll(".button").forEach((cell) =>
    cell.addEventListener("click", function () {
      createGridBasedOnDimension(cell.value);
      run();
    })
  );
}

function run() {
  initializeGameState();
  assignListeners();
  playGame();
}

function initializeGameState() {
  playerObj = new Player("X");
  const size = dimension * dimension;
  for (let i = 0; i < size; i++) {
    gameState[i] = "";
  }
  cellObj = new Cell(dimension, playerObj, gameState);

  statusDisplay.innerHTML = playerObj.currentPlayerTurn();
  gameActive = true;
}
function createGridBasedOnDimension(val) {
  dimension = parseInt(val);

  let info = document.getElementById("game_detail_provider");
  if (info.style.display === "none") {
    info.style.display = "block";
  } else {
    info.style.display = "none";
  }

  let welcomeInfo = document.getElementById("welcome-info");
  if (welcomeInfo.style.display === "none") {
    welcomeInfo.style.display = "block";
  } else {
    welcomeInfo.style.display = "none";
  }

  let dimSelect = document.getElementById("selection-screen");
  if (dimSelect.style.display === "none") {
    dimSelect.style.display = "block";
  } else {
    dimSelect.style.display = "none";
  }

  let btnGroups = document.getElementById("btn-groups");
  if (btnGroups.style.display === "none") {
    btnGroups.style.display = "block";
  } else {
    btnGroups.style.display = "none";
  }

  const cellParentList = document.getElementsByClassName("game_cell_box");
  const grid = new Grid(dimension, cellParentList);
  playerDisplay = grid.createGrid();
}

function playGame() {
  if (playerObj) {
    const roundwon = cellObj.getRoundWon();
    if (!roundwon) {
      statusDisplay.innerHTML = playerObj.currentPlayerTurn();
    }

    if (roundwon) {
      const gameStatusStringDom =
        document.getElementsByClassName("game_status")[0];
      gameStatusStringDom.classList.add("animation-effects");

      statusDisplay.innerHTML = winningMessage();
      gameActive = false;
    } else {
      let drawround = !gameState.includes("");
      if (drawround) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
      }
    }
  }
}

const winningMessage = () =>
  `Player ${playerObj.getCurrentPlayer()} won the game...`;
const drawMessage = () => `Game Draw...`;

const mouseoverPlayer = () => `${playerObj.getCurrentPlayer()}`;

function handleRestartGame() {
  const gameStatusStringDom = document.getElementsByClassName("game_status")[0];
  gameStatusStringDom.classList.remove("animation-effects");

  initializeGameState();

  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

function handleNewDimension() {
  location.reload();
}

function findCurrentIndex(event) {
  const overCell = event.target;

  const overCellIndex = parseInt(overCell.getAttribute("data-cell-index"));
  return overCellIndex;
}
function mouseOver(mouseOvered) {
  const overCellIndex = findCurrentIndex(mouseOvered);

  if (gameActive && gameState[overCellIndex] === "") {
    playerDisplay[overCellIndex].innerHTML = mouseoverPlayer();
  }
}
function mouseOut(mouseOvered) {
  const overCellIndex = findCurrentIndex(mouseOvered);
  if (gameActive && gameState[overCellIndex] === "") {
    playerDisplay[overCellIndex].innerHTML = "";
  }
}

function assignListeners() {
  document.querySelectorAll(".cell").forEach((cell) =>
    cell.addEventListener("click", function (event) {
      playerObj = cellObj.handleCellClick(event, gameActive);
      playGame();
    })
  );
  document
    .querySelector(".restart_game")
    .addEventListener("click", handleRestartGame);

  document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.addEventListener("mouseover", mouseOver));
  document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.addEventListener("mouseout", mouseOut));

  document.querySelector(".choose_dim").addEventListener("click", function () {
    handleNewDimension();
  });
}
