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
                this.cells.forEach(cell => {
                    cell.style.backgroundColor = "white";
                    cell.style.color = "black";
                });
            }
        },
        placeMarker: function(cell, player) {
            const ps = Array.from(document.getElementsByClassName('marker-text'));
            ps[this.cells.indexOf(cell)].innerText = `${player.marker}`;
        },
        displayWin: function(win) {
            win.forEach(cell => {
                this.cells[cell - 1].style.backgroundColor = "black";
                this.cells[cell - 1].style.color = "white";
            });
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
        // formModal: document.getElementById('form-modal'),
        // form: document.getElementById('name-form'),
        winBox: document.getElementById('win-box'),
        winDeclaration: document.getElementById('win-declaration'),
        refTalk: document.getElementById('ref-talk'),
        getInd: function(cell) {
            const str = cell.classList[1];
            
            return Number(str[5]);
        },
        checkWin: function(player) {
            const cells = player.occupiedCells;

            return this.wins.some(win => 
                win.every(cell => cells.includes(cell)));
        },
        findWin: function(player) {
            const cells = player.occupiedCells;

            return this.wins.find(win => 
                win.every(cell => cells.includes(cell))
            );
        },
        declareWin: function(player) {
            // board highlights winning squares
            // referee text area congrats winner
            this.board.cells.forEach(cell => {
                cell.removeEventListener('click', this.boundtakeTurn);
            });
            
            
            this.refTalk.textContent = "";
            this.winDeclaration.innerText = `${player.name} wins!`;
            this.winBox.showModal();
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
            if (win === true) {
                this.board.displayWin(this.findWin(player));
                this.declareWin(player);
            }
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
function playGame(player1, player2) {
    const ref = createRef(player1, player2, board)
    const refTalk = document.getElementById('ref-talk');
    const htmlBoard = document.getElementById('board');
    const newGameBtn = document.getElementById('new-game');
    newGameBtn.addEventListener('click', newGame);

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

function newGame() {
    const formModal = document.getElementById('form-modal');
    const form = document.getElementById('name-form');
    
    formModal.showModal();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        let obj = {};

        formData.forEach((value, key) => {
            obj[key] = value;
        });

        const player1 = createPlayer(`${obj.player1}`, "X");
        const player2 = createPlayer(`${obj.player2}`, "O");

        formModal.close();
        playGame(player1, player2);
    });
}

newGame();