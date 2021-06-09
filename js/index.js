import Game from "./game.js";

let game = new Game();


game.makeMove(7);
game.makeMove(2);
game.makeMove(2);
game.makeMove(0);
game.makeMove(2);
game.makeMove(1);
console.log(game.board);
console.log(game.findWinningCombinations);