import { Component, EventEmitter, Output } from '@angular/core';
import { States } from '../states';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() updateState = new EventEmitter();

  constructor() { }

  playButton() {
    this.updateState.emit(States.GAME);
  }
}
