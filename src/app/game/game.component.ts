import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { States } from '../states';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  @Output() updateState = new EventEmitter();

  constructor() { }

  @HostListener('window:keydown.esc', ['$event'])
  emitPauseEvent() {
    this.updateState.emit(States.PAUSE);
  }

}
