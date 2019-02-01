import { Component } from '@angular/core';
import { States } from './states';
import { Global } from './global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  States: typeof States = States;
  Global: typeof Global = Global;
  
  curState: States = States.BEGIN;

  constructor() { }

  updateState(newState: States) {
    this.curState = newState;
  }
}
