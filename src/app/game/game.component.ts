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

  game: Minesweeper;
  bot: Bot = new Bot(this);

  constructor() {
    this.timerInit();

    this.game = GameComponent.initGame();
  }

  static initGame(): Minesweeper {
    // Create a smaller board for mobile
    return window.innerWidth < 700 ? new Minesweeper(9, 9, 10) : new Minesweeper(24, 30, 99);
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
      this.bot.stop();
    }
  }

  beginState() {
    this.game = GameComponent.initGame();
    Global.curState = States.BEGIN;
    this.timerInit();
    this.bot.stop();
  }

}
