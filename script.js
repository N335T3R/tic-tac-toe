const board = (function() {
    return {
        board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    }
})();


function createPlayer(name, marker) {
    return { name, marker };
}

const player1 = createPlayer('anthony', 'x');
console.log(player1, board);