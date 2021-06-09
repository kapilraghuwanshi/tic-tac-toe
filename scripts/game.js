export default class Game {
    constructor() {
        this.turn = 'X'; // can be 'O'
        this.board = new Array(9).fill(null);
    }

    nextTurn() {
        this.turn = this.turn  === "X" ? "O" : "X";
    }

    makeMove(i) {
        // if game is not in progress do nothing
        if(!this.isInProgress){
            return;
        }
        // if that block is already occupied
        if(this.board[i]){
            return;
        }
        // assign turn value to particular block in board
        this.board[i] = this.turn;
        if(!this.findWinningCombinations()) {
            this.nextTurn();
        }
    }

    findWinningCombinations() {
        const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ];

        for(const combo of winningCombinations) {
            const [a, b, c] = combo;
            // if all have same in the row
            if(this.board[a] && (this.board[a] === this.board[b] && this.board[a] === this.board[c])){
                return combo;
            }
        }
         // if not
         return null;
    }

    isInProgress() {
        return !this.findWinningCombinations() && this.board.includes(null);
    }


}