import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { States } from '../states';
import { Minesweeper } from '../minesweeper';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  game: Minesweeper = new Minesweeper();
  
  @Output() updateState = new EventEmitter();

  constructor() { }

  @HostListener('window:keydown.esc', ['$event'])
  emitPauseEvent() {
    this.updateState.emit(States.PAUSE);
  }

  emitBeginEvent() {
    this.updateState.emit(States.BEGIN);
  }

}
