// Get all necessary DOM elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

// Initialize game state
let turnO = true; // true for 'O', false for 'X'
let count = 0; // To track number of moves

// Winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset the game
const resetGame = () => {
  turnO = true; // Start with 'O'
  count = 0; // Reset move count
  boxes.forEach(box => {
    box.innerText = ""; // Clear box
    box.disabled = false; // Enable box
  });
  msgContainer.classList.add("hide"); // Hide message
};

// Check for a winner
const checkWinner = () => {
  for (const [a, b, c] of winPatterns) {
    const valA = boxes[a].innerText;
    const valB = boxes[b].innerText;
    const valC = boxes[c].innerText;

    if (valA && valA === valB && valA === valC) {
      msg.innerText = `Congratulations, Winner is ${valA}`;
      msgContainer.classList.remove("hide"); // Show message
      boxes.forEach(box => box.disabled = true); // Disable all boxes
      return true;
    }
  }
  return false;
};

// Handle box click
const handleBoxClick = (box) => {
  if (!box.innerText) { // Only if box is empty
    box.innerText = turnO ? "O" : "X"; // Set text based on turn
    box.disabled = true; // Disable clicked box
    count++; // Increment move count

    if (checkWinner()) return; // Check for winner

    if (count === 9) { // If all boxes are filled
      msg.innerText = "Game was a Draw.";
      msgContainer.classList.remove("hide"); // Show message
      boxes.forEach(box => box.disabled = true); // Disable all boxes
    }

    turnO = !turnO; // Switch turn
  }
};

// Add event listeners to boxes
boxes.forEach(box => box.addEventListener("click", () => handleBoxClick(box)));

// Add event listeners to buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Start a new game on page load
resetGame();
