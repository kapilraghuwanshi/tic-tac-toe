export default class GameView {
    constructor(root){
        this.root = root;
        this.root.innerHTML = `
            <div class="header">
            <div class="header_turn"></div>
            <div class="header_status"></div>
            <button type="button" class="header_restart">
                Refresh
            </button>
            </div>
            <div class="board">
                <div class="board_tile" data-index="0"></div>
                <div class="board_tile" data-index="1"></div>
                <div class="board_tile" data-index="2"></div>
                <div class="board_tile" data-index="3"></div>
                <div class="board_tile" data-index="4"></div>
                <div class="board_tile" data-index="5"></div>
                <div class="board_tile" data-index="6"></div>
                <div class="board_tile" data-index="7"></div>
                <div class="board_tile" data-index="8"></div>
            </div>
        `

        this.onTileClick = undefined;
        this.onRestartClick = undefined;

        this.root.querySelectorAll(".board_tile").forEach(tile => {
            tile.addEventListener("click", () => {
                if (this.onTileClick) {
                    this.onTileClick(tile.dataset.index);
                }
            });
        });

        this.root.querySelector(".header_restart").addEventListener("click", () => {
            if (this.onRestartClick) {
                this.onRestartClick();
            }
        });
    }

    update(game) {
        this.updateTurn(game);
        this.updateStatus(game);
        this.updateBoard(game);
    }

    updateTurn(game) {
        this.root.querySelector(".header_turn").textContent = `${game.turn}'s turn`;
    }

    updateStatus(game) {
        let status = "Game in Progress";

        if (game.findWinningCombinations()) {
            status = `${game.turn} is the Winner!`;
        } else if (!game.isInProgress()) {
            status = "Game is a tie!";
        }

        this.root.querySelector(".header_status").textContent = status;
    }

    updateBoard(game) {
        const winningCombination = game.findWinningCombinations();

        for (let i = 0; i < game.board.length; i++) {
            const tile = this.root.querySelector(`.board_tile[data-index="${i}"]`);

            tile.classList.remove("board_tile_winner");
            tile.textContent = game.board[i];

            if (winningCombination && winningCombination.includes(i)) {
                tile.classList.add("board_tile_winner");
            }
        }
    }


}