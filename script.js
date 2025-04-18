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
        handleClick: function(event) {
            const cell = event.target;

            this.board.forEach(square => {
                square.removeEventListener('click', this.boundHandleClick);
            });

            this.isCellEligible(cell);
        },
        selectCell: function() {
            // must bind "this" to current object,
            // otherwise when eventListener is added,
            // "this" will become event object
            this.boundHandleClick = this.handleClick.bind(this);

            this.board.forEach(square => {
                square.addEventListener('click', this.boundHandleClick);
            });
        },
        isCellEligible: function (cell) {

            if (this.occupiedCells.includes(cell)) {
                console.log('Cell already captured. Choose again.');
                this.selectCell();
            }
            else this.placeMarker(cell);
        },
        // accepts return value of
        // this.isCellEligible() if return !== false
        placeMarker: function (cell) {
            // GET CURRENT PLAYER
            // const player = game.currentPlayer;
            const player = player1;

            // if cell === false, this.selectCell()
            const ps = Array.from(document.getElementsByClassName('marker-text'));
            ps[this.board.indexOf(cell)].innerText = `${player.marker}`;

            this.occupiedCells.push(cell);

            return cell;
            // Return value?
            // Add argument "player"?
            // push eligible cell to player.occupiedCells?
        },
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




