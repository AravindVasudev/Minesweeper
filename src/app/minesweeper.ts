import { Cell } from './cell';
import { CellState } from './cellstate';
import { GameState } from './gamestate';

export class Minesweeper {
    readonly M: number = 24;
    readonly N: number = 30;
    readonly bombs: number = 99;

    gameState: GameState = GameState.PLAYING;

    board: Cell[][] = Minesweeper.getEmptyBoard(this.M, this.N); // M * N board
    remainingFlags = this.bombs;
    safeCells = (this.M * this.N) - this.bombs;

    timer: number;
    secondsPassed: number = 0;

    constructor() {
        this.initializeBoard();
    }

    initializeBoard() {
        this.placeBombs();
        this.fillValue();
    }

    startTimer() {
        this.timer = window.setInterval(() => this.secondsPassed++, 1000);
    }

    pauseTimer() {
        clearInterval(this.timer);
    }

    fillValue() {
        for (let i = 0; i < this.M; i++) {
            for (let j = 0; j < this.N; j++) {
                if (this.board[i][j].value === Cell.bomb) {
                    continue;
                }

                for (let offsetI = -1; offsetI <= 1; offsetI++) {
                    for (let offsetJ = -1; offsetJ <= 1; offsetJ++) {
                        let nextI = i + offsetI;
                        let nextJ = j + offsetJ;

                        if ((offsetI === 0 && offsetJ === 0) || nextI < 0 || nextI > this.M - 1 || nextJ < 0 || nextJ > this.N - 1 ||
                            this.board[nextI][nextJ].value !== Cell.bomb) {
                                continue;
                        }

                        this.board[i][j].value++;
                    }
                }                
            }
        }
    }

    placeBombs() {
        if (this.bombs > (this.M * this.N)) {
            throw new Error("Too much bombs");
        }

        let remainingBombs = this.bombs;
        while (remainingBombs > 0) {
            let randX = Math.floor(Math.random() * this.M);
            let randY = Math.floor(Math.random() * this.N);

            if (this.board[randX][randY].value === Cell.bomb) {
                continue;
            }

            this.board[randX][randY].value = Cell.bomb;
            remainingBombs--;
        }
    }

    static getEmptyBoard(M: number, N: number, value = Cell.empty): Cell[][] {
        let board: Cell[][] = new Array(M);
        for (let i = 0; i < M; i++) {
            board[i] = new Array(N);
            for (let j = 0; j < N; j++) {
                board[i][j] = new Cell(value);
            }
        }

        return board;
    }

    reveal(i: number, j: number) {
        if (this.gameState === GameState.PLAYING && this.board[i][j].state === CellState.CLOSED) {
            this.openCell(i, j);

            if (this.safeCells == 0) {
                this.gameState = GameState.WON;
                this.pauseTimer();
            }
        }
    }

    flag(i: number, j: number): boolean {
        if (this.gameState === GameState.PLAYING) {
            switch (this.board[i][j].state) {
                case CellState.CLOSED:
                    if (this.remainingFlags > 0) {
                        this.board[i][j].state = CellState.FLAGGED;
                        this.remainingFlags--;
                    }
    
                    break;
                case CellState.FLAGGED:
                    this.board[i][j].state = CellState.CLOSED;
                    this.remainingFlags++;
                    break;
            }
        }

        return false; // to hide context menu
    }

    openCell(x: number, y: number) {
        if (this.board[x][y].value !== Cell.empty) {
            this.board[x][y].state = CellState.OPENED;

            if (this.board[x][y].value === Cell.bomb) {
                this.gameState = GameState.LOST;
                this.revealAll();
                this.pauseTimer();
            }

            this.safeCells--;
            return;
        }

        let q: [number, number][] = [];
        q.push([x, y]);

        while (q.length > 0) {
            let cur: [number, number] = q.shift();
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let next: [number, number] = [cur[0] + i, cur[1] + j];
                    if (next[0] < 0 || next[0] > this.M - 1 || next[1] < 0 || next[1] > this.N - 1 ||
                        this.board[next[0]][next[1]].state !== CellState.CLOSED ) {
                             continue;
                    }

                    this.board[next[0]][next[1]].state = CellState.OPENED;
                    this.safeCells--;

                    if (!(i === 0 && j === 0) && this.board[next[0]][next[1]].value === 0) {
                        q.push(next);
                    }
                }
            }
        }
    }

    revealAll() {
        for (let i = 0; i < this.M; i++) {
            for (let j = 0; j < this.N; j++) {
                this.board[i][j].state = CellState.OPENED;
            }
        }
    }
}