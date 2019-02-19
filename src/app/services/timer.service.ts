import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  controlBtnText = 'Start';
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  start = false;
  pause = false;
  x = 1;
  intervalId;
  constructor() { }

  reset() {
    this.start = false;
    this.pause = false;
    this.x = 1;
    this.controlBtnText = 'Start';
    this.hour = this.minute = this.second = this.millisecond = 0;
    clearInterval(this.intervalId);
  }

  onStart() {
      this.x = 1;
      this.start = true;
      this.intervalId = setInterval(() => {
        this.updateTime();
      }, 10);
  }

  onPause() {
    this.pause = true;
    this.controlBtnText = 'Resume';
    clearInterval(this.intervalId);
    console.log(this.pause);
    console.log(this.controlBtnText);
    console.log(this.intervalId);
  }
  onResume() {
    this.controlBtnText = 'Stop';
    this.pause = false;
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 10);
  }

  updateTime() {
    this.millisecond += this.x;

    if (this.millisecond > 99) {
      this.millisecond = 0;
      this.second++;
    }

    if (this.second > 59) {
      this.second = 0;
      this.minute++;
    }

    if (this.minute > 59) {
      this.minute = 0;
      this.hour++;
    }
  }
}
