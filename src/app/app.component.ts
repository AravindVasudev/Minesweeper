import { Component } from '@angular/core';
import { States } from './states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  States: typeof States = States;
  curState: States = States.BEGIN;

  constructor() { }

  updateState(newState: States) {
    this.curState = newState;
  }
}
