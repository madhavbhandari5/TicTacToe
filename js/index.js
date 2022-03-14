import { handleResultValidation } from "./checkWinningConditions.js";
import { createGrid } from "./createGrid.js";

const statusDisplay = document.querySelector(".game_status");
document.querySelectorAll(".button").forEach((cell) =>
  cell.addEventListener("click", function () {
    findDimension(cell.value);
  })
);

let playerDisplay;
let dimension;
function findDimension(val) {
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

  dimension = parseInt(val);

  window.onload = setGameState(dimension);
  //window.onload = setNewWinningConditions(val);

  const cellParentList = document.getElementsByClassName("game_cell_box");
  playerDisplay = createGrid(dimension, cellParentList);
  assignListeners();
}

let gameActive = true;
let currentPlayer = "X";

let gameState = [];
function setGameState(dimension) {
  const size = dimension * dimension;
  for (let i = 0; i < size; i++) {
    gameState[i] = "";
  }
  return gameState;
}

const winningMessage = () => `Player ${currentPlayer} won the game...`;
const drawMessage = () => `Game Draw...`;

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn.`;
const mouseoverPlayer = () => `${currentPlayer}`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
  //   const r = document.querySelector(":root");
  //   r.style.setProperty("--cell-player-color", "white");
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  const roundwon = handleResultValidation(dimension, gameState, currentPlayer);

  if (roundwon) {
    const gameStatusStringDom =
      document.getElementsByClassName("game_status")[0];
    gameStatusStringDom.classList.add("animation-effects");
    console.log(gameStatusStringDom);
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }
  let drawround = !gameState.includes("");
  if (drawround) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  handlePlayerChange();
}

function handleRestartGame() {
  const gameStatusStringDom = document.getElementsByClassName("game_status")[0];
  gameStatusStringDom.classList.remove("animation-effects");

  gameActive = true;
  currentPlayer = "X";

  gameState = setGameState(dimension);
  console.log(gameState);
  statusDisplay.innerHTML = currentPlayerTurn();
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
    // const r = document.querySelector(":root");
    // r.style.setProperty("--cell-player-color", "#04c0b2");
  }
}
function mouseOut(mouseOvered) {
  const overCellIndex = findCurrentIndex(mouseOvered);
  if (gameActive && gameState[overCellIndex] === "") {
    playerDisplay[overCellIndex].innerHTML = "";
  }
}

function assignListeners() {
  document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.addEventListener("click", handleCellClick));
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
