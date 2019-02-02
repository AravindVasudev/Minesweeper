import { Component } from '@angular/core';

import { States } from '../states';
import { CellState } from '../cellstate';
import { GameState } from '../gamestate';
import { Global } from '../global';

import { Minesweeper } from '../minesweeper';
import { Bot } from '../bot';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  CellState: typeof CellState = CellState;
  GameState: typeof GameState = GameState;

  game: Minesweeper = new Minesweeper();
  bot: Bot = new Bot(this);

  constructor() {
    this.timerInit();
  }

  timerInit() { // temporary dumb implementation
    let interval = window.setInterval(() => {
      if (Global.curState === States.GAME) {
        this.game.startTimer();
        window.clearInterval(interval);
      }
    }, 10);
  }

  // @HostListener('window:keydown.esc', ['$event'])
  pauseState() {
    if (this.game.gameState === GameState.PLAYING) {
      Global.curState = States.PAUSE;
      this.game.pauseTimer();
      this.timerInit();
    }
  }

  beginState() {
    this.game = new Minesweeper();
    Global.curState = States.BEGIN;
    this.timerInit();
  }

}
