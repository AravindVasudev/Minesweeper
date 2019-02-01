import { Component, HostListener } from '@angular/core';
import { States } from '../states';
import { Minesweeper } from '../minesweeper';
import { CellState } from '../cellstate';

import { Global } from '../global';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  CellState: typeof CellState = CellState;

  game: Minesweeper = new Minesweeper();

  constructor() {}

  // @HostListener('window:keydown.esc', ['$event'])
  pauseState() {
    Global.curState = States.PAUSE;
  }

  beginState() {
    Global.curState = States.BEGIN;
  }

}
