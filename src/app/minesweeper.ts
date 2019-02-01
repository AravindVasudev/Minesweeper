export class Minesweeper {
    board: number[][];

    constructor() {
        this.board = new Array(24);
        for (let i = 0; i < 24; i++) {
            this.board[i] = new Array(24).fill(0);
        }
    }
}