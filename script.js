// IIFEs
const board = (function() {
    return {
        board: [],
        occupiedCells: [],
        initBoard: function(div) {
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                const markerTextBox = document.createElement('p');
                cell.classList.add('cell');
                markerTextBox.classList.add('marker-text');
                cell.appendChild(markerTextBox);
                div.appendChild(cell);
                this.board.push(cell);
            }
        },
        selectCell: function(player) {
            this.board.forEach(cell => {
                cell.addEventListener('click', () => {
                    // return index of selected cell
                    // remove eventListeners
                    this.isCellEligible(cell, player);
                });
            });
        },
        isCellEligible: function (cell, player) {

            if (this.occupiedCells.includes(cell)) {
                console.log('Cell already captured. Choose again.');
                this.selectCell(player);
            }
            else this.placeMarker(cell, player);
        },
        // accepts return value of
        // this.isCellEligible() if return !== false
        placeMarker: function (cell, player) {
            // if cell === false, this.selectCell()
            const ps = Array.from(document.getElementsByClassName('marker-text'));
            ps[this.board.indexOf(cell)].innerText = `${player.marker}`;
            this.occupiedCells.push(cell);

            return cell;
            // Return value?
            // Add argument "player"?
            // push eligible cell to player.occupiedCells?
        }
    }
})();



// Functions & Factories
function createPlayer(name, marker) {
    return { name,
        marker,
        occupiedCells: []
    };
}

function createGame(board, player1, player2) {
    return {
        board,
        player1,
        player2,
        takeTurn: function(player) {
            // alert('Choose a cell');

            const cell = this.board.selectCell(player);
            console.log(cell);
        },
        checkWin: function(player) {
            // Check for a win after each turn
        }
    }
}




// Execution
const player1 = createPlayer('anthony', 'x');
const player2 = createPlayer('RJ', "O");
board.initBoard(document.getElementById('board'));
const game = createGame(board, player1, player2);

game.takeTurn(player1);

console.log(player1, board, game);




