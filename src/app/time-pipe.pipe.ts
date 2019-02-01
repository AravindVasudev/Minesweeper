import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe'
})
export class TimePipePipe implements PipeTransform {

  transform(seconds: number): string {
    if (seconds < 60) {
      return `00:${this.padNumber(seconds)}`;
    }

    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    return `${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

  padNumber(num: number): string {
    if (num > 9) {
      return num.toString();
    }

    return '0' + num;
  }
}
