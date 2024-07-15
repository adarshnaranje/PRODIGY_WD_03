// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the board element and squares
    const board = document.getElementById('board');
    const squares = document.getElementsByClassName('square');
    const players = ['X', 'O']; // Define the players
    let currentPlayer = players[0]; // Set the initial player to 'X'
    
    // Create and style the end message element
    const endMessage = document.createElement('h2');
    endMessage.textContent = `X's turn!`;
    endMessage.style.marginTop = '30px';
    endMessage.style.textAlign = 'center';
    board.after(endMessage); // Insert the end message after the board

    // Define the winning combinations
    const winning_combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Add click event listeners to each square
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', () => {
            if (squares[i].textContent !== '') { // If square is already filled, do nothing
                return;
            }
            squares[i].textContent = currentPlayer; // Fill square with current player's symbol

            // Check if the current player wins
            if (checkWin(currentPlayer)) {
                endMessage.textContent = `Game over! ${currentPlayer} wins!`;
                return;
            }

            // Check if the game is tied
            if (checkTie()) {
                endMessage.textContent = `Game is tied!`;
                return;
            }

            // Switch to the other player
            currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
            endMessage.textContent = `${currentPlayer}'s turn!`; // Update the end message
        });
    }

    // Add click event listener to the restart button
    document.getElementById('restartButton').addEventListener('click', restartGame);

    // Function to check if the current player has won
    function checkWin(currentPlayer) {
        for (let i = 0; i < winning_combinations.length; i++) {
            const [a, b, c] = winning_combinations[i];
            // If all three squares in a winning combination are filled by the current player
            if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
                return true;
            }
        }
        return false;
    }

    // Function to check if the game is tied
    function checkTie() {
        for (let i = 0; i < squares.length; i++) {
            // If any square is empty, the game is not tied
            if (squares[i].textContent === '') {
                return false;
            }
        }
        return true;
    }

    // Function to restart the game
    function restartGame() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = ''; // Clear all squares
        }
        endMessage.textContent = `X's turn!`; // Reset the end message
        currentPlayer = players[0]; // Set the current player back to 'X'
    }
});