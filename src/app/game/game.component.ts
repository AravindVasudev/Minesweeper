import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { States } from '../states';
import { Minesweeper } from '../minesweeper';
import { CellState } from '../cellstate';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  CellState: typeof CellState = CellState;
  @Output() updateState = new EventEmitter();

  game: Minesweeper = new Minesweeper();

  constructor() { }

  @HostListener('window:keydown.esc', ['$event'])
  emitPauseEvent() {
    this.updateState.emit(States.PAUSE);
  }

  emitBeginEvent() {
    this.updateState.emit(States.BEGIN);
  }

}
