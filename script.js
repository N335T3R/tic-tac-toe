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
        selectCell: function(board) {
            this.board.forEach(cell => {
                cell.addEventListener('click', () => {
                    // return index of selected cell
                    // remove eventListeners
                    return cell;
                });
            });
        },
        isCellEligible: function (cell) {
            if (this.occupiedCells.includes(cell)) return false;
            else return cell;
        },
        // accepts return value of
        // this.isCellEligible() if return !== false
        placeMarker: function (cell, marker) {
            const ps = Array.from(document.getElementsByClassName('marker-text'));
            ps[this.board.indexOf(cell)].innerText = `${marker}`;
            this.occupiedCells.push(cell);
            console.log(this.occupiedCells);
        }
    }
})();

const game = (function(board,) {
    this.board = board;
})();



board.initBoard(document.getElementById('board'));
const player1 = createPlayer('anthony', 'x');
board.selectCell();
console.log(player1, board);


// Functions & Factories
function createPlayer(name, marker) {
    return { name, 
        marker,};
}

