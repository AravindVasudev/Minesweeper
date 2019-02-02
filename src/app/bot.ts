import { GameComponent } from './game/game.component';

export class Bot {
    active: boolean = false;
    speed: number = 0;
    botLoop: number;

    constructor(private gameComponent: GameComponent) { }

    play() {
        if (this.active) {
            this.active = false;
            window.clearInterval(this.botLoop);
        } else {
            this.active = true;
            this.botLoop = window.setInterval(() => this.move(), this.speed);
        }
    }

    move() {
        let randX = Math.floor(Math.random() * this.gameComponent.game.M);
        let randY = Math.floor(Math.random() * this.gameComponent.game.N);

        this.gameComponent.game.reveal(randX, randY);
    }
}