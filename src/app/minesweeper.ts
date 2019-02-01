import { Cell } from './cell';
import { CellState } from './cellstate';

export class Minesweeper {
    readonly M: number = 24;
    readonly N: number = 30;
    readonly bombs: number = 99;

    board: Cell[][] = Minesweeper.getEmptyBoard(this.M, this.N); // M * N board
    remainingBombs = this.bombs;

    constructor() {
        this.initializeBoard();
    }

    initializeBoard() {
        this.placeBombs();
        this.fillValue();
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

                        if ((i === 0 && j === 0) || nextI < 0 || nextI > this.M - 1 || nextJ < 0 || nextJ > this.N - 1 ||
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
        if (this.board[i][j].state === CellState.CLOSED) {
            this.openCell(i, j);
        }
    }

    openCell(x: number, y: number) {
        if (this.board[x][y].value !== 0) {
            this.board[x][y].state = CellState.OPENED;
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
                        this.board[next[0]][next[1]].state !== CellState.CLOSED) {
                             continue;
                    }

                    this.board[next[0]][next[1]].state = CellState.OPENED;

                    if (!(i === 0 && j === 0) && this.board[next[0]][next[1]].value === 0) {
                        q.push(next);
                    }
                }
            }
        }
    }
}