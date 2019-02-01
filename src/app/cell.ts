import { CellState } from './cellstate';

export class Cell {
    static readonly bomb: number = -1;
    static readonly empty: number = 0;

    value: number;
    state: CellState;

    constructor(value = 0, state = CellState.CLOSED) {
        this.value = value;
        this.state = state;
    }
}