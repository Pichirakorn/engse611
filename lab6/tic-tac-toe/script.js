const grid = document.querySelector("#grid");
const cells = Array.from(grid.children);
const scoreX = document.querySelector("#scoreX");
const scoreO = document.querySelector("#scoreO");
const resetButton = document.querySelector("#reset");

let currentPlayer = "X"; 
let board = ["", "", "", "", "", "", "", "", ""]; 
let scores = { X: 0, O: 0 }; 
let gameActive = true; 

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6] 
];

function renderBoard() {
  board.forEach((mark, index) => {
    cells[index].textContent = mark;
    cells[index].classList.remove("x", "o"); 

    if (mark === "X") {
      cells[index].classList.add("x");
    } else if (mark === "O") {
      cells[index].classList.add("o");
    }
  });
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      alert(`Player ${board[a]} wins!`);
      scores[board[a]]++;
      updateScoreboard();
      return;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    alert("It's a draw!");
  }
}

function updateScoreboard() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

function handleCellClick(event) {
  const index = cells.indexOf(event.target);
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  renderBoard();
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  renderBoard();
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

renderBoard();
updateScoreboard();