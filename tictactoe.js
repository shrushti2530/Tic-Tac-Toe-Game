let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#Resetbtn");
let newbtn = document.querySelector("#newbtn");

let turn0 = true; // Player X and O
let mesgConatiner = document.querySelector(".mesg-conatiner");
let mesg = document.querySelector("#mesg");

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

// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = turn0 ? "O" : "X";
            turn0 = !turn0;
            box.disabled = true;
            checkWinner();
        }
    });
});

// Enable all boxes and reset their content
const enabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Disable all boxes (used after someone wins)
const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Display the winner and disable further clicks
const showWinner = (winner) => {
    mesg.innerText = `Congratulations, Winner is ${winner}`;
    mesgConatiner.classList.remove("hide");
    disabledBoxes();
};

// Display a message for a draw game
const showDraw = () => {
    mesg.innerText = "It's a Draw! Try Again.";
    mesgConatiner.classList.remove("hide");
    disabledBoxes();
};

// Check for a winning pattern
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("Winner", pos1Val);
            showWinner(pos1Val);
            return;
        }
    }

    // Check for draw (if no empty boxes remain)
    const allBoxesFilled = Array.from(boxes).every((box) => box.innerText !== "");
    if (allBoxesFilled) {
        showDraw();
    }
};

// Reset the game state (used for restarting mid-game or after a draw)
const resetGame = () => {
    turn0 = true; // Reset turn to the initial player
    enabledBoxes(); // Re-enable and clear all boxes
    mesgConatiner.classList.add("hide"); // Hide the message container
    mesg.innerText = ""; // Clear any text in the message element
};

// Start a new game (used after a win)
const startNewGame = () => {
    resetGame();
    mesgConatiner.classList.add("hide");
    mesg.innerText = ""; // Clear any previous message
};

// Attach event listeners to the buttons
resetbtn.addEventListener("click", resetGame);
newbtn.addEventListener("click", startNewGame);
