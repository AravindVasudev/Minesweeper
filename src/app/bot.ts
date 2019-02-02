import { GameComponent } from './game/game.component';
import { CellState } from './cellstate';

export class Bot {
    active: boolean = false;
    speed: number = 0;
    botLoop: number;

    constructor(private gameComponent: GameComponent) { }

    play() {
        if (this.active) {
            this.active = false;
            window.clearInterval(this.botLoop);
        } else {
            this.active = true;
            this.botLoop = window.setInterval(() => this.move(), this.speed);
        }
    }

    stop() {
        if (this.active) {
            this.play();
        }
    }

    move() {
        let modified = 0;
        modified += this.flagCells();
        modified += this.openFreeNeighbours();

        if (modified === 0) {
            this.makeRandomMove();
        }
    }

    makeRandomMove() {
        let cells: [number, number][] = this.getClosedCells();
        if (cells.length === 0) {
            return;
        }

        let move = Math.floor(Math.random() * (cells.length - 1));
        this.gameComponent.game.reveal(cells[move][0], cells[move][1]);
    }

    getClosedCells(): [number, number][] {
        let cells: [number, number][] = [];
        for (let i = 0; i < this.gameComponent.game.M; i++) {
            for (let j = 0; j < this.gameComponent.game.N; j++) {
                if (this.gameComponent.game.board[i][j].state === CellState.CLOSED) {
                    cells.push([i, j]);
                }
            }
        }

        return cells;
    }

    flagCells(): number {
        let modified = 0;
        for (let i = 0; i < this.gameComponent.game.M; i++) {
            for (let j = 0; j < this.gameComponent.game.N; j++) {
                if (this.gameComponent.game.board[i][j].state !== CellState.OPENED) {
                    continue;
                }

                let curValue = this.gameComponent.game.board[i][j].value;
                let unopenedNeighbours: Set<[number, number]> = new Set<[number, number]>();
                for (let offsetI = -1; offsetI <= 1; offsetI++) {
                    for (let offsetJ = -1; offsetJ <= 1; offsetJ++) {
                        let nextI = i + offsetI;
                        let nextJ = j + offsetJ;

                        if ((i === 0 && j === 0) || nextI < 0 || nextI > this.gameComponent.game.M - 1 || nextJ < 0 ||
                        nextJ > this.gameComponent.game.N - 1 || this.gameComponent.game.board[nextI][nextJ].state === CellState.OPENED) {
                                continue;
                        }

                        unopenedNeighbours.add([nextI, nextJ]);
                    }
                }

                if (curValue === unopenedNeighbours.size) {
                    unopenedNeighbours.forEach(neighbour => {
                        if (this.gameComponent.game.board[neighbour[0]][neighbour[1]].state === CellState.CLOSED) {
                            this.gameComponent.game.flag(neighbour[0], neighbour[1]);
                        }
                    });

                    modified += curValue;
                }
            }
        }

        return modified;
    }

    openFreeNeighbours(): number {
        let modified = 0;
        for (let i = 0; i < this.gameComponent.game.M; i++) {
            for (let j = 0; j < this.gameComponent.game.N; j++) {
                if (this.gameComponent.game.board[i][j].state !== CellState.OPENED) {
                    continue;
                }

                let curValue = this.gameComponent.game.board[i][j].value;
                let flagged = 0;
                let closedNeighbours: Set<[number, number]> = new Set<[number, number]>();
                for (let offsetI = -1; offsetI <= 1; offsetI++) {
                    for (let offsetJ = -1; offsetJ <= 1; offsetJ++) {
                        let nextI = i + offsetI;
                        let nextJ = j + offsetJ;

                        if ((i === 0 && j === 0) || nextI < 0 || nextI > this.gameComponent.game.M - 1 || nextJ < 0 ||
                        nextJ > this.gameComponent.game.N - 1 || this.gameComponent.game.board[nextI][nextJ].state === CellState.OPENED) {
                                continue;
                        }

                        if (this.gameComponent.game.board[nextI][nextJ].state === CellState.FLAGGED) {
                            flagged++;
                        } else {
                            closedNeighbours.add([nextI, nextJ]);
                        }
                    }
                }

                if (curValue === flagged) {
                    closedNeighbours.forEach(neighbour => this.gameComponent.game.reveal(neighbour[0], neighbour[1]));
                    modified += closedNeighbours.size;
                }
            }
        }

        return modified;
    }
}