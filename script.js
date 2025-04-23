// player
function createPlayer(name, marker) {
    return { 
        name,
        marker,
        occupiedCells: [],
    };
}


// board
const board = (function() {
    return {
        cells: [],
        winCells: [],
        initBoard: function(div) {
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                const markerTextBox = document.createElement('p');

                cell.classList.add('cell', `class${i + 1}`);
                markerTextBox.classList.add('marker-text');
                
                cell.appendChild(markerTextBox);
                div.appendChild(cell);
                this.cells.push(cell);
            }
        },
        placeMarker: function(cell, player) {
            const ps = Array.from(document.getElementsByClassName('marker-text'));
            ps[this.cells.indexOf(cell)].innerText = `${player.marker}`;
        },
        deconstruct: function(div) {
            div.innerHTML = "";
        }
    }
})();


// ref
function createRef(player1, player2, board) {
    return {
        player1,
        player2,
        board,
        turns: 1,
        wins: [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9]
        ],
        winBox: document.getElementById('win-box'),
        winDeclaration: document.getElementById('win-declaration'),
        refTalk: document.getElementById('ref-talk'),
        getInd: function(cell) {
            let str = cell.classList[1];
            
            return Number(str[5]);
        },
        checkWin: function(player) {
            let cells = player.occupiedCells;

            return this.wins.some(win => 
                win.every(cell => cells.includes(cell)));
        },
        declareWin: function(player) {
            // board highlights winning squares
            // referee text area congrats winner
            this.board.cells.forEach(cell => {
                cell.removeEventListener('click', this.boundtakeTurn);
            });
            
            
            this.winDeclaration.innerText = `${player.name} wins!`;
            this.winBox.showModal();

            this.refTalk.textContent = `${player.name} wins!`;
            // OR

            // modal appears & contains congrats
            // to winner & restart button
        },
        takeTurn: function(e) {
            let player;
            const cell = e.target;
            const ind = this.getInd(cell);
            
            // determine player
            if (this.turns % 2 !== 0) player = player1;
            else player = player2;

            player.occupiedCells.push(ind);
            this.board.placeMarker(cell, player);


            let win = this.checkWin(player);
            if (win === true) this.declareWin(player);
            else {
                this.turns++;
                // reassign player before reassigning 
                // text content
                if (this.turns % 2 !== 0) player = player1;
                else player = player2;
    
                this.refTalk.textContent = `${player.name}'s turn`;
                return 0;
            }
        }
    }
}


// execution
const newGame = document.getElementById('new-game');
newGame.addEventListener('click', playGame);


function playGame() {
    const player1 = createPlayer('anthony', 'x');
    const player2 = createPlayer('RJ', "o");
    const ref = createRef(player1, player2, board)
    const refTalk = document.getElementById('ref-talk');
    const htmlBoard = document.getElementById('board');

    ref.winBox.close();
    ref.board.initBoard(htmlBoard);
   
    // clear cells at start of new game
    const cells = Array.from(document.getElementsByClassName('marker-text'));
    cells.forEach(cell => {
        cell.innerText = '';
    });
    refTalk.textContent = `${player1.name}'s turn`;

    ref.boundtakeTurn = ref.takeTurn.bind(ref);
    ref.board.cells.forEach(cell => {
        cell.addEventListener('click', ref.boundtakeTurn, { once: true });
    });
}
playGame();
