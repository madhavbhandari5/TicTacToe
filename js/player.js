class Player {
  constructor(currentPlayer) {
    this.currentPlayer = currentPlayer;
  }

  handlePlayerChange() {
    const statusDisplay = document.querySelector(".game_status");
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = this.currentPlayerTurn();
  }
  getCurrentPlayer() {
    return this.currentPlayer;
  }

  currentPlayerTurn = () => `It's ${this.currentPlayer}'s turn.`;
}

export default Player;
