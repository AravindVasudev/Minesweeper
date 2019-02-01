import { Component } from '@angular/core';
import { States } from '../states';
import { Global } from '../global';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  States: typeof States = States;
  Global: typeof Global = Global;

  constructor() { }

  playButton() {
    Global.curState = States.GAME;
  }
}
